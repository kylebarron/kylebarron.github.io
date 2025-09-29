---
title: Making performant Python bindings to compiled code
tags:
    - Python
    - C
    - Rust
    - Performance
date: 2025-09-21
slug: /blog/fast-python-bindings
---

## "Hybrid" Python libraries

Python is among the most popular programming languages in the world. As a high-level, interpreted language, it's relatively easy to learn and fast to iterate on. But at the same time it's widely used in scientific computing, data science, and machine learning/AI.

Python's interpreted nature means that pure Python code can be slower to evaluate than similarly-implemented compiled code. But Python has a secret weapon here: Python can transparently integrate with compiled code. Many high-performance Python libraries are _hybrid_ in this way. They present a Python interface but rely heavily on compiled code for performance.

For example, [Numpy](https://numpy.org/), the fundamental Python library for scientific computing, _looks and functions_ like a Python library to any end user. But, quietly, its core functionality is provided from compiled C code. Indeed, more than a third of Numpy's source code is written in C or C++, and this is the essential reason why Numpy code executes so fast.

I believe Python will continue growing in demand, driven by the continued growth of AI and data science, making the value of high-performance, hybrid Python libraries greater than ever.

But writing performant Python bindings can be tricky. It's easy to run into pitfalls that slow down your code to a relative crawl, even if the underlying compiled code is fast.

In this post I'll cover what makes hybrid Python-compiled code fast and how you can avoid the most common pitfalls. This post should appeal to any end user wondering why some Python libraries are so much faster than others and to any library author wondering how to make their Python bindings as fast as possible. The techniques described here apply regardless of the underlying compiled language — C, C++, Rust, etc.

## What makes a hybrid Python library fast?

There are **three core areas** to speed up a compiled Python library:

- **Removing Python interpreter overhead**: ensuring that as much functionality as possible is provided by compiled code.
- **Removing serialization overhead**: reducing slowdowns from copying data into a representation accessible by the compiled code.
- **Improving performance of the underlying compiled code**.

These areas are independent, and striving to tackle all three is what makes a library lightning-fast.

As this post is focused on Python integration, we'll focus just on the first two.

## Python interpreter overhead

Perhaps ironically, because Python interpreter overhead can be significant, fast Python libraries need to remove as much Python as possible from their runtime. Python should be considered only a convenient interface by which users can access native code, and Python calls should be limited to thin wrappers around native code.


The tricky bit is that we need to have an idea of how the end Python user will be using our library so that we can adapt the Python API to what they need to perform. Because end users will likely be writing code in pure Python, the more end users must implement themselves, the worse their overall performance will be.

That doesn't mean that function calls should be monolithic. Quite the opposite; we still want a composable API. It's ok for the user to make several consecutive Python calls, as long as each call is maximally native. We want to present a clean, Pythonic, easy-to-use, modular interface that lets _as much execution time as possible_ happen in compiled code rather than Python code.

### Vectorization

One of the most common places of Python overhead is in a for loop. It follows, then, that one of the easiest places to find speedups is by removing Python-level for loops.

This is called _vectorization_: moving the Python for loop into native code by presenting a Python API that operates on _sequences_ of items at once, not scalars.

There do exist use cases that only care about comparing two scalar items, but in these situations a relatively small amount of the total execution time is likely happening in this function. So providing vectorized APIs tends to provide an easy performance win.

### Learning from _Shapely_ v2 transition

Shapely is a Python library that provides bindings to the [GEOS](https://libgeos.org/) geometry engine, itself written in C++. Shapely [version 2](https://shapely.readthedocs.io/en/latest/release/2.x.html#version-2-0-0-2022-12-12) heavily refactored the implementation to provide vectorized APIs.

Let's compare the performance of its old scalar API with its new vectorized API.

First, we'll load in a moderately complex polygonal geometry from an example dataset of New York City boroughs provided by the [`geodatasets`](https://geodatasets.readthedocs.io/en/latest/) package:

```py
import shapely
import numpy as np
import geodatasets
import geopandas as gpd

# Load a sample dataset with MultiPolygon geometries
gdf = gpd.read_file(geodatasets.get_path("ny.bb"))
multi_polygon = gdf.geometry[0]
```

`multi_polygon` is now a Shapely geometry representing [Staten Island](https://en.wikipedia.org/wiki/Staten_Island). (It's a [`MultiPolygon`] because there are small islands off of the main island that are also considered part of Staten Island.)

[`MultiPolygon`]: https://shapely.readthedocs.io/en/latest/reference/shapely.MultiPolygon.html

![](https://github.com/user-attachments/assets/24694bc6-8d38-4122-89d1-3a92aa4292b3)

Now let's define two functions:

1. One that uses the scalar-valued [`MultiPolygon.intersects`], where every Python call compares this _one_ `MultiPolygon` to _one_ other geometry
2. Another that uses Shapely's vectorized [`shapely.intersects`] — you can pass in an array of geometries and the single Python dispatch will operate on _all of them at once_.

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

Now timing each of these (in IPython) shows that the vectorized implementation, where the for loop is compiled, is **1100x faster** than the scalar implementation.

```py
%timeit call_intersects_1000x(multi_polygon)
# 2.2 ms ± 109 μs per loop (mean ± std. dev. of 7 runs, 100 loops each)

# Create an array with 1000 copies of the geometry
array_of_multi_polygons = np.repeat(multi_polygon, 1000)

%timeit vectorized_intersects_1000x(multi_polygon)
# 1.94 μs ± 79.3 ns per loop (mean ± std. dev. of 7 runs, 1,000,000 loops each)
```

## Serialization overhead

The previous section assumed our compiled code _already had access to our data_. The `multi_polygon` object was already directly accessible by the compiled code, and the timings did not take into account the performance characteristics of the _creation_ of the `multi_polygon` variable.

But in real-world use cases, making data accessible to the compiled code can be a critical slowdown.

Any time a native function is called from Python, the native code needs to be able to transform the Python input into a representation that the native code knows how to operate on.

### Simple serialization

The _simplest_ way of doing this is copying and parsing the input data

For structured data,

One common serialization method is JSON. But this is absolutely horrible for performance.

Additionally, this requires a full memory copy of the Python input.


### Binary serialization

Binary serialization.

#### Lonboard performance

As an example of how much faster binary serialization can be, we can look to Lonboard.

Lonboard is a Python library for interactive geospatial visualization that offers improved performance because the internals focus on efficient serialization.

Lonboard binds to the _exact same_ library as pydeck did previously, but is 30-40x faster because of its focus on efficient serialization.

![](lonboard-serialization-perf.png)





In this case, we're profiling serialization generally, though not specifically serialization into compiled code (while Lonboard uses compiled code, the part that requires serialization is the part that moves data from Python into the browser).



### Serialization has two directions

Serialization overhead _in_ and serialization overhead _out_. You might care about both of these


### Removing serialization?

So far we've assumed that the input representation from Python is opaque and not something that the compiled library can operate on at a binary level directly. But what if the input could be used directly? Then we wouldn't need to pay the time or memory cost of _any_ serialization.

It is possible for a compiled library to _directly access_ the memory of another compiled library. It can be highly performant but comes with a number of potential pitfalls.

For one, in order to do this safely, the two libraries must have total agreement over the exact shape and layout of how the data is stored at the binary level. This is called the [Application Binary Interface](https://en.wikipedia.org/wiki/Application_binary_interface) (ABI), where communication happens at the binary level instead of at the language interface level.

But ABI compatibility can be extremely difficult to achieve. All libraries exchanging memory must be kept fully in sync. Errors in ABI compatibility can lead to memory safety issues or a [segmentation fault](https://en.wikipedia.org/wiki/Segmentation_fault), which crashes the Python interpreter without a chance to recover.

Ideally we'd want some sort of standard that all libraries could adhere to ... so that an ecosystem of libraries could all implement the same internal binary representation, and then our code could safely exchange data without any copies ...

### The Python Buffer Protocol

The need to reduce copies and overhead across compiled libraries working on binary buffers was so great that the Buffer Protocol was established.

The Buffer Protocol is a [Python standard][buffer-protocol-docs] for exchanging binary buffers and multi-dimensional arrays. By implementing the buffer protocol, you can safely read raw binary buffers from any other library that provides the interface without any copying. Or, similarly, you can provide your own buffers to other libraries so that they can have native access your buffers.

The buffer protocol set the stage for a huge amount of innovation in the scientific Python ecosystem, because it meant libraries could specialize on a specific, narrow task while still freely integrating with the rest of the scientific Python ecosystem.

[pep-688]: https://peps.python.org/pep-0688/
[buffer-protocol-docs]: https://docs.python.org/3/c-api/buffer.html

> This cannot be emphasized enough: **it is fundamentally the Buffer Protocol and related NumPy functionality that make Python useful as a scientific computing platform.**


https://jakevdp.github.io/blog/2014/05/05/introduction-to-the-python-buffer-protocol/




### How Arrow relates to this

Arrow is to structured tabular data as the buffer protocol is to arrays.

I've been working on Arrow because it _eliminates_ serialization overhead.

A future post will dive into how this actually works in Python, and how to use the Arrow PyCapsule Interface to make sure your library is compatible with a whole ecosystem of other libraries.


## Conclusion

In this post


Let me know, message me on linkedin.

Future posts will dig more into the Arrow side.





