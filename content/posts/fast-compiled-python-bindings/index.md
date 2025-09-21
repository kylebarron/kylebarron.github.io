---
title: How to make performant Python bindings to compiled code
tags:
    - Python
    - C
    - Rust
    - Performance
date: 2025-09-21
slug: /blog/fast-python-bindings
---

Python is among the most popular programming languages in the world. As a high-level, interpreted language, it's relatively easy to learn and fast to iterate on, but at the same time widely used in scientific computing, data science, and machine learning/AI.

Python's interpreted nature means that Python code can be slower to evaluate than similarly-implemented compiled code. But Python has a secret weapon here: Python can transparently integrate with compiled code and many high-performance Python libraries rely on compiled code for their speedups.

For example, [Numpy](https://numpy.org/), the fundamental Python library for scientific computing, _looks_ like a Python library to any end user, but silently its core implementation relies on compiled code. Indeed, more than a third of Numpy's source code is written in C or C++, and this is the essential reason why Numpy code executes so fast.

I believe the growth of AI will make Python even more in demand, making it more important than ever before to be able to create high-performance Python libraries that bind to compiled code underneath.

But writing performant Python bindings to compiled code can be tricky. There are some pitfalls that can easily make your code slow.

This post is relevant to any end user wondering why some Python libraries are so much faster than others, and to any library author wondering how to make their Python bindings as fast as possible. The techniques described here apply regardless of the underlying compiled language — C, C++, Rust, etc.

## What makes Python code fast?

At the end of the day it's pretty simple: there are **three core areas** to speed up a compiled Python library:

- Removing Python interpreter overhead: ...
- Removing serialization overhead: slowdowns from moving data between a Python representation and a compiled representation.
- Improving performance of the underlying compiled code. itself, outside of the Python integration.


I'm using Shapely as an example because, while, yes, `tg` is independent from GEOS, the lessons learned in the Shapely project matter a lot if you want to create a Python API that is performant _from Python_.




This post won't go into #3, the rest of this post will be split between the other two.


 of overhead: Python interpreter overhead and serialization overhead. To make really fast bindings, we need to remove them both.

The third part of making fast

## Python interpreter overhead

The tricky bit is that we need to have an idea of how the end Python user will be using our Python library. We want to present a clean, easy-to-use, modular interface that lets _as much execution time as possible_ happen in compiled code rather than Python code.


### Vectorization

One of the most common places of Python overhead is in a for loop.

This is called _vectorization_, or operating on _sequences_ of items at once.

It's true that there are _some_ use cases that only care about comparing two items. But many use cases — and many of the slowest ones — care about comparing two _sets_ of items.

And when you're only comparing one item with one other item, a relatively small amount of the total execution time is probably happening in this function. So it tends to make most sense to prioritize the optimization of cases where a whole bunch of operations are happening.

### Learning from _Shapely_ v2 transition

Shapely is a Python library that provides bindings to the [GEOS](https://libgeos.org/) geometry engine, itself written in C++. Shapely [version 2](https://shapely.readthedocs.io/en/latest/release/2.x.html#version-2-0-0-2022-12-12) heavily refactored the implementation to provide vectorized APIs.

Let's compare the

Here's an example with the related Shapely code to show what I mean in terms of performance. First, I'll load a moderately complex geometry from an example dataset provided by [`geodatasets`](https://geodatasets.readthedocs.io/en/latest/) package:

```py
import shapely
import numpy as np
import geodatasets
import geopandas as gpd

# Load a sample dataset with MultiPolygon geometries
gdf = gpd.read_file(geodatasets.get_path("ny.bb"))
multi_polygon = gdf.geometry[0]
```

`multi_polygon` is now a Shapely geometry representing [Staten Island](https://en.wikipedia.org/wiki/Staten_Island). (It's a [`MultiPolygon`] because there are small islands included off of the main island.)

[`MultiPolygon`]: https://shapely.readthedocs.io/en/latest/reference/shapely.MultiPolygon.html

![](https://github.com/user-attachments/assets/24694bc6-8d38-4122-89d1-3a92aa4292b3)

Now let's define two functions:

- One that uses the scalar-valued [`MultiPolygon.intersects`]. Every call  which compares this one `MultiPolygon` to one other geometry
- Another that uses Shapely's vectorized [`shapely.intersects`] — you can pass in an array of geometries and the single Python dispatch will operate on _all of them at once_.

[`MultiPolygon.intersects`]: https://shapely.readthedocs.io/en/2.1.1/reference/shapely.MultiPolygon.html#shapely.MultiPolygon.intersects
[`shapely.intersects`]: https://shapely.readthedocs.io/en/latest/reference/shapely.intersects.html#shapely.intersects

```py
def call_intersects_1000x(multi_polygon):
    # This function operates on a single scalar geometry with a Python for loop
    for _ in range(1000):
        multi_polygon.intersects(multi_polygon)


def vectorized_intersects_1000x(array_of_multi_polygons):
    # This function operates on all 1000 geometries at once
    shapely.intersects(array_of_multi_polygons, array_of_multi_polygons)
```

Now timing each of these shows that the vectorized implementation, where the for loop is compiled, is **1100x faster** than the scalar implementation.

```py
%timeit call_intersects_1000x(multi_polygon)
# 2.2 ms ± 109 μs per loop (mean ± std. dev. of 7 runs, 100 loops each)

# Create an array with 1000 copies of the geometry
array_of_multi_polygons = np.repeat(multi_polygon, 1000)

%timeit vectorized_intersects_1000x(multi_polygon)
# 1.94 μs ± 79.3 ns per loop (mean ± std. dev. of 7 runs, 1,000,000 loops each)
```

For scalar geometries, every `Geometry` is a separate Python object and separately garbage collected. That plus the Python `for` loop adds _so much_ overhead.


## Serialization overhead

The previous section assumed our compiled code _already had access to our data_. That is, it assumed that the `multi_polygon` object was already accessible by the compiled code, and therefore did not take into account the performance characteristics of the _creation_ of the `multi_polygon` variable. But in real-world use cases, making data accessible to the compiled code can be a critical slowdown.

Let's say you have

Your compiled code needs to be able to transform the Python input into a representation that your code knows how to operate on.



### Simple serialization

The simplest way of doing this is copying the input data

One common serialization method is JSON. But this is absolutely horrible for performance.


### Binary serialization

#### Lonboard performance

Lonboard is a library for

Lonboard binds to the _exact same_ library as pydeck did previously, but is 50x faster because of its focus on efficient serialization.

![](lonboard-serialization-perf.png)





In this case, we're profiling serialization generally, though not specifically serialization into compiled code (while Lonboard uses compiled code, the part that requires serialization is the part that moves data from Python into the browser).



### Serialization has two directions

Serialization overhead _in_ and serialization overhead _out_. You might care about both of these


### Removing serialization?

So far we've assumed that the input representation from Python is not something that the compiled library can operate on directly. But what if the input representation could be something that we can use directly? Then we wouldn't need to pay the time or memory cost of _any_ serialization.

This is possible, for a compiled library to _directly access_ the memory of another compiled library. It can be highly performant but comes with a number of pitfalls.
 But in order to do this safely, the two libraries must have total agreement over the exact shape and layout of how the data is stored at the binary level. This is called the [Application Binary Interface](https://en.wikipedia.org/wiki/Application_binary_interface) (ABI), where communication happens at the binary level instead of at the language interface level.

But ABI compatibility can be extremely difficult to achieve. All libraries exchanging memory must be kept fully in sync. Errors in ABI compatibility can lead to memory safety issues or a [segmentation fault](https://en.wikipedia.org/wiki/Segmentation_fault), which crashes the Python interpreter.


Ideally we'd want some sort of standard that all libraries could adhere to ... so that an ecosystem of libraries could all implement the same internal binary representation, and then our code could safely exchange data without any copies ...



### Scientific Python and the Buffer protocol

This is the reason for the Buffer protocol, a [Python standard][buffer-protocol-docs] for exchanging binary buffers and multi-dimensional arrays. By implementing the buffer protocol, you can safely read binary buffers from

(Historically the buffer protocol was only accessible through Python's C API, but. PEP 688  ).



[buffer-protocol-docs]: https://docs.python.org/3/c-api/buffer.html

> This cannot be emphasized enough: **it is fundamentally the Buffer Protocol and related NumPy functionality that make Python useful as a scientific computing platform.**


https://jakevdp.github.io/blog/2014/05/05/introduction-to-the-python-buffer-protocol/

The buffer protocol set the stage for a huge amount of innovation, because it meant libraries could specialize on a specific task while still freely integrating with the rest of the scientific Python ecosystem.



### How Arrow relates to this

Arrow is to structured tabular data as the buffer protocol is to arrays.

I've been working on Arrow because it _eliminates_ serialization overhead.

A future post will dive into how this actually works in Python, and how to use the Arrow PyCapsule Interface to make sure your library is compatible with a whole ecosystem of other libraries.


## Conclusion

In this post


Let me know, message me on linkedin.

Future posts will dig more into the Arrow side.




[^1]: https://github.com/tidwall/tg/issues/8#issuecomment-3290298687

