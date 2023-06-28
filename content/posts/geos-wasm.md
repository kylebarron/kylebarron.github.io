---
title: Thoughts on GEOS in WebAssembly
date: 2023-06-28
slug: /blog/geos-wasm
description: ...
---

JavaScript is missing a battle-tested geometry engine that's performant at scale.

Six months ago, Tom MacWright started a stub repository [`tmcw/geos-wasm`](https://github.com/tmcw/geos-wasm) on compiling GEOS to WebAssembly and exposing it as a library for JavaScript. Yesterday, Christoph Pahmeyer [created an issue](https://github.com/tmcw/geos-wasm/issues/2) (enticingly titled "_geos-wasm - Is it worth the effort?_") and mentioned that he created a new repo [`chrispahm/geos-wasm`](https://github.com/chrispahm/geos-wasm) with a [full working demo](https://chrispahm.github.io/geos-wasm/) of GEOS' buffer function.

That [nerdsniped](https://xkcd.com/356/) me, and here we are with a blog post! I'll start with why
I'm a proponent of WebAssembly and then consider what bringing efficient, stable computational
primitives to the Wasm would look like.

# Why not Turf? JSTS?

In Tom's repo he [wrote down some thoughts](https://github.com/tmcw/geos-wasm/blob/07e6858a00d83b2ee78daaf5467c6e1e376aa966/README.md):

> I don't think WebAssembly will constitute a big performance advantage for geographical operations. However, what I do want is battle-tested geometry operations. I love Turf, and continue to contribute to Turf, but a lot of Turf's geometry algorithms are implemented from scratch and aren't nearly as robust as GEOS.
>
> Then Turf uses JSTS for a few of its operations. JSTS - JavaScript port of JTS, which is a port of GEOS - has gotten a lot better. Maybe JSTS is the real best option: it gives roughly the code of GEOS, albeit removed two steps from the original, but doesn't have the full serialization cost of a WASM library.
>
> That said, JSTS is large - we've been trying to remove it from Turf for years and years, and it's not exactly the same set of bugs as GEOS. If I have bugs, I want all of the GEOS things to have bugs! And the roaring success of, say, Shapely, indicates that GEOS's level of bugs is pretty tolerable.

## _Ports of complex libraries are really hard!_

This is something I learned from the [Apache Parquet](https://parquet.apache.org/) ecosystem.
Parquet is an incredibly complex format with scores of various encodings, compressions, and a large
type system including nested types. Pure-JavaScript implementations have been attempted over the
years ([1](https://github.com/ironSource/parquetjs), [2](https://github.com/kbajalc/parquets)), but
endless subtle bugs that require a deep understanding of the underlying data format surely make the
work brutal, and project burnout is unsurprising.

It's my belief that for any project beyond a certain complexity, there should only be three core implementations:

- One in C/C++ because C/C++ is today's de-facto performance-critical language, and it can bind to almost any other language.
- One in Rust because removing memory errors brings so much potential and development speed to low-level code. I believe it's _tomorrow's_ performance-critical language.
- One in Java because the Java Virtual Machine makes it hard to interface with external C libraries (and it's _yesterday's_ performance-critical language? :joy:).

## From high-level languages, prefer bindings

To me the core of Tom's reasoning above is

> [JSTS is] not exactly the same set of bugs as GEOS. If I have bugs, I want all of the GEOS things to have bugs! And the roaring success of, say, Shapely, indicates that GEOS's level of bugs is pretty tolerable.

If we can
When you reimplement

---


For every other language and environment, the code should be a _binding_ to a core library because
it takes such a huge investment to get to the stability of a core library. These other
implementations should choose one of the above and _link_ to it for the core algorithms rather than
reimplement the entire source in the target language.

Keeping with the Parquet analogy above, there's a [core implementation in C++](https://github.com/apache/arrow/tree/main/cpp/src/parquet), [one in Java](https://github.com/apache/parquet-mr), and [another in Rust](https://github.com/apache/arrow-rs/tree/master/parquet). [^2] But virtually every other stable Parquet library is a binding to one of those. The Python and R Parquet implementations are bindings to the C++ one; my [WebAssembly Parquet implementation](https://github.com/kylebarron/parquet-wasm) uses the Rust one. [^1] A [Scala Parquet library](https://github.com/mjakubowski84/parquet4s) appears [to use](https://github.com/mjakubowski84/parquet4s/blob/f41ff6d4203e039a0e52c7d0d5648e24ece37706/build.sbt#L91-L93) the Java implementation.

[^1]: Apparently, if you're using the _Arrow_ Java library, it actually [links to the C++ Parquet implementation](https://github.com/apache/arrow/blob/0344a2cdf6219708a25f39e580406e0ce692b61e/java/pom.xml#L1011-L1030) via the Java Native Interface (JNI) instead of using `parquet-mr`.

[^2]: Well, actually there are [_two_ Rust implementations](https://github.com/jorgecarleitao/parquet2) for technical reasons, but they plan to [converge eventually](https://github.com/jorgecarleitao/arrow2/issues/1429).

## WebAssembly Performance

Up until now I've focused on stability, but performance is crucial (TODO: change wording) as well. I think there are two main ways that WebAssembly can speed up code:

- If the WASM library is faster. If you're using a C or Rust library in WebAssembly and that's seen a lot more performance focus than your JS code, the WASM might be faster out of the box.
- If you can use a binary data representation with [`ArrayBuffer`s](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) instead of small JS objects, getting data into and out of WebAssembly will be virtually free and you'll avoid tons of time in the garbage collector.

As an anecdotal example, last year I found that my WebAssembly Parquet reader was [_480x faster_](https://github.com/visgl/loaders.gl/issues/2144#issue-1198790864) than a pure-JavaScript Parquet reader. It was _so fast_ because I benefited from both of the reasons above. The Rust library I used had seen a focus on performance optimization and it loaded data into [Apache Arrow](https://arrow.apache.org/), a columnar, binary data format. In contrary, the JS library was newer and did a costly transpose from Parquet's native columnar layout to a row-based layout of pure-JS objects. But my point is that by binding to Rust I got these performance optimizations for free! I didn't have to put in a year of work; I got to such fast performance over a few weeks of hacking nights and weekends.

Keep in mind that WebAssembly is not guaranteed to magically improve performance! A good case story here is Zaplib's post-mortem, which found [meager performance improvements](https://zaplib.com/docs/blog_post_mortem.html#js-vs-rust) in their case. And if your WebAssembly code is interacting with the DOM, you likely won't get any speedup at all.

My intuition is that code that's computationally-constrained and can take [`ArrayBuffer`s](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) as input and output has potential to be sped up in WebAssembly. Especially if you can vectorize the code by moving a loop out of JavaScript and into Wasm.

## So... Turf? JSTS?

Geometry algorithms are incredibly complex. Without diving into a computational geometry textbook I'd have no idea how to implement a [buffering algorithm](https://en.wikipedia.org/wiki/Buffer_analysis) from scratch. So I think the Parquet analogy applies well.

Similar to Parquet, we have three core libraries: JTS in Java, GEOS in C++, and GeoRust in Rust. (GeoRust is the youngest project and is missing some operations [like buffering](https://github.com/georust/geo/issues/641), but [many algorithms](https://docs.rs/geo/latest/geo/#algorithms) have been implemented, and it's my hope that the project will grow steadily).

Turf is an amazing library but doesn't appear to have a dedicated contributor base right now

[Screenshot of turf activity]

I don't know much about JSTS and I've never used it... Apparently it's automatically generated from the JTS source via AST translation. First, that sounds impressive in its own right, so credit where credit is due to Björn Harrtell.

On the performance front, I would _suspect_ that a WebAssembly geometry binding has potential for vast performance improvements over a pure-JS implementation:

- sd
- Geometries could be represented

, especially when operating on arrays of geometries and if represented in a binary format instead of as GeoJSON-like, which requires tons of small heap-allocated JS objects.

There's also a ton of performance potential in using a binary geometry representation.

Performance also has a ton of

For the point of discussion, let's consider for now that we've decided to write GEOS bindings for WebAssembly. We'll come back to GeoRust at the end.

# Implementation

# Data Serialization is costly

In many environmentrs you have to consider the cost of moving objects across a boundary.

- In Java you have the JVM
- In Python you have Python objects and the GIL. Here Python objects can read outside memory not defined by Python, and non-Python code can read Python objects (as long as it acquires the GIL).
- In the browser is worse than Python. It is possible (though it can be complex) for JavaScript to read in the WASM memory space. But WASM is sandboxed: the wasm context can't read anything from outside of its own memory buffer. This means that all data in JS needs to be copied into the WASM buffer before any wasm operations can take place.
  - additionally, wasm doesn't come with its own allocator. This means that


## Moving data across the WASM boundary

Moving data between JS and Wasm in effect acts the same as moving data between JS and a Web Worker. There are two options:

- A Structured Clone. This is a costly operation that is akin to a JSON serialization of objects.
- However some objects are _transferables_. This means that they can be shared _freely_ either between the main thread and a web worker or, in this case, across the Wasm boundary. Transfering an object is free because it's essentially just changing the ownership of a pointer between threads. This also means that few objects meet this criteria: mainly just `ArrayBuffer`s.

This is why having a binary geometry encoding is so valuable. It's free to move across thread boundaries.

In JS,

For example, in Christoph's prototype, it:

- Uses a JS library to serialize every GeoJSON to WKT <https://github.com/chrispahm/geos-wasm/blob/8c2679536bd33205377b6359a2e7bdc03d69db14/src/allJsFunctions/Buffer.mjs#L182>
- Passes the WKT string to `GEOSGeomFromWKT`. This first copies the string to WASM memory using a structured clone. Then GEOS parses the WKT into a GEOS object and returns to JS the pointer in WASM memory to the GEOS object.

 it serializes every GeoJSON object to WKT, then passes the WKT to GEOS

## Licensing

GEOS is licensed under the LGPL 2.1. This effectively means that any code that is statically linked to GEOS must also be licensed as LGPL.

# GeoRust?

I want to come back to GeoRust before closing my thoughts.

A GeoArrow implementation could read geometries from WASM at [literally zero cost](https://observablehq.com/@kylebarron/zero-copy-apache-arrow-with-webassembly) possibly without even making a copy of the data back to JS.

# Where to go from here

- I'd love to have

This even relates to


x


- Getting
- Boundaries are costly
  - JS-wasm
  - JS can read into a wasm buffer but wasm can't read into JS space.
