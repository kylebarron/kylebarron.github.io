---
title: How to make performant Python bindings to compiled code
tags:
    - Python
    - C
    - Rust
date: 2025-09-21
slug: /blog/fast-python-bindings
---

Python is among the most popular programming languages in the world. As a high-level, interpreted language, it's relatively easy to learn and fast to iterate on, but at the same time widely used in scientific computing, data science, and machine learning/AI.

Python's interpreted nature means that Python code can be slower to evaluate than similarly-implemented compiled code. But Python has a secret weapon here: Python can transparently integrate with compiled code and many high-performance Python libraries rely on compiled code for their speedups.

For example, [Numpy](https://numpy.org/), the fundamental Python library for scientific computing, _looks_ like a Python library to any end user, but silently its core implementation relies on compiled code. Indeed, more than a third of Numpy's source code is written in C or C++.

I believe the growth of AI will make Python even more in demand, making it more important than ever before to be able to create high-performance Python libraries that bind to compiled code underneath.

But writing performant Python bindings to compiled code can be tricky. There are some pitfalls that can easily make



I believe that Python's growth will continue, making it an even more valuable skill



With the rise of machine learning

I believe that


Recently I commented on a GitHub issue proposing a new Python binding to a compiled geospatial library called [tg] [^1], and I realized it would make a great blog post --- I should write down some of my thoughts on how to make fast Python bindings to compiled code.

Often, the developers of compiled libraries aren't Python experts, or the developers of the Python bindings aren't skilled in compiled code. It's tricky here because you need to draw on both sides.




This post is relevant to any end user wondering why some Python libraries are so much faster than others, and to any library author wondering how to make their Python bindings as fast as possible. The techniques described here apply regardless of the underlying compiled language — C, C++, Rust, etc.

The tl'dr here is pretty simple: there are **three core places** to speed up a compiled Python library:

- Python interpreter overhead: ...
- Serialization overhead: slowdowns from moving data between a Python representation and a compiled representation.
- Performance of compiled code itself, outside of the Python integration.

This post won't go into #3, the rest of this post will be split between the other two.


 of overhead: Python interpreter overhead and serialization overhead. To make really fast bindings, we need to remove them both.

The third part of making fast

## Python interpreter overhead

## Learning from _Shapely_ v2 transition

### Python for-loop overhead

I'm using Shapely as an example because, while, yes, `tg` is independent from GEOS, the lessons learned in the Shapely project matter a lot if you want to create a Python API that is performant _from Python_.

Taking your example:

```py
>>> g1 = Geometry(poly1, fmt='geojson')
>>> g2 = Geometry(poly2, fmt='geojson')
>>> g1.intersects(g2)
True
```

Here's an example with the related Shapely code to show what I mean in terms of performance. First, I'll just load a moderately complex MultiPolygon:

```py
import shapely
import numpy as np
import geodatasets
import geopandas as gpd

# Load a sample dataset with MultiPolygon geometries
gdf = gpd.read_file(geodatasets.get_path("ny.bb"))
multi_polygon = gdf.geometry[0]
```

<img width="300" height="300" alt="Image" src="https://github.com/user-attachments/assets/24694bc6-8d38-4122-89d1-3a92aa4292b3" />

Now let's define two functions. One which uses `Geometry.intersects`, just as you have it here in your proposed `tg` API. And another that uses Shapely's [`shapely.intersects`](https://shapely.readthedocs.io/en/latest/reference/shapely.intersects.html#shapely.intersects) API which is **vectorized** — you can pass in an array of geometries and the single Python dispatch will operate on all of them.

```py
def call_intersects_1000x(multi_polygon):
    # This function operates on a single scalar geometry with a Python for loop
    for _ in range(1000):
        multi_polygon.intersects(multi_polygon)


def vectorized_intersects_1000x(array_of_multi_polygons):
    # This function operates on all 1000 geometries at once
    shapely.intersects(array_of_multi_polygons, array_of_multi_polygons)


%timeit call_intersects_1000x(multi_polygon)
# 2.2 ms ± 109 μs per loop (mean ± std. dev. of 7 runs, 100 loops each)

# Create an array with 1000 copies of the geometry
array_of_multi_polygons = np.repeat(multi_polygon, 1000)

%timeit vectorized_intersects_1000x(multi_polygon)
# 1.94 μs ± 79.3 ns per loop (mean ± std. dev. of 7 runs, 1,000,000 loops each)
```

The vectorized implementation is **1100x faster** than the scalar implementation. To make a fast Python API that binds to compiled code, you need to work to remove as much overhead as possible. That overhead comes in two forms: Python interpreter overhead and serialization overhead.

For scalar geometries, every `Geometry` is a separate Python object and separately garbage collected. That plus the Python `for` loop adds _so much_ overhead.


### Speedup from vectorization


## Serialization overhead


### Scientific Python and the Buffer protocol

### How Arrow relates to this

I've been working on Arrow because it _eliminates_ serialization overhead.


## Examples from my projects





[^1]: https://github.com/tidwall/tg/issues/8#issuecomment-3290298687


--------







So in sum, my argument is that your proposed API would have so much overhead and have such poor performance that few people would choose it over Shapely, its most natural competitor. Which would be a shame because `tg` is _such_ an impressive library. On the flip side, I'm saying that to create Python bindings _faster than Shapely_ would require a certain amount of work and thought and planning.
