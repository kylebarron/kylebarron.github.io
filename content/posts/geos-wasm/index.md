---
title: Thoughts on GEOS in WebAssembly
date: 2023-06-28
slug: /blog/geos-wasm
description: ...
---

JavaScript is missing a battle-tested geometry engine that's performant at scale.

Six months ago, Tom MacWright started a stub repository [`tmcw/geos-wasm`](https://github.com/tmcw/geos-wasm) on compiling GEOS to WebAssembly (Wasm) and exposing it as a library for JavaScript. On Tuesday, Christoph Pahmeyer [created an issue](https://github.com/tmcw/geos-wasm/issues/2) (enticingly titled "_`geos-wasm` - Is it worth the effort?_") and mentioned that he created a new repo [`chrispahm/geos-wasm`](https://github.com/chrispahm/geos-wasm) with a [full working demo](https://chrispahm.github.io/geos-wasm/) of GEOS' buffer function.

That [nerdsniped](https://xkcd.com/356/) me, and here we are with a blog post! I'll start with why
I'm a proponent of WebAssembly and then consider what bringing GEOS or something like it to the web
would look like.

## Why not Turf? JSTS?

In Tom's repo he [wrote down some thoughts](https://github.com/tmcw/geos-wasm/blob/07e6858a00d83b2ee78daaf5467c6e1e376aa966/README.md):

> I don't think WebAssembly will constitute a big performance advantage for geographical operations. However, what I do want is battle-tested geometry operations. I love Turf, and continue to contribute to Turf, but a lot of Turf's geometry algorithms are implemented from scratch and aren't nearly as robust as GEOS.
>
> Then Turf uses JSTS for a few of its operations. JSTS - JavaScript port of JTS, which is a port of GEOS - has gotten a lot better. Maybe JSTS is the real best option: it gives roughly the code of GEOS, albeit removed two steps from the original, but doesn't have the full serialization cost of a WASM library.
>
> That said, JSTS is large - we've been trying to remove it from Turf for years and years, and it's not exactly the same set of bugs as GEOS. If I have bugs, I want all of the GEOS things to have bugs! And the roaring success of, say, Shapely, indicates that GEOS's level of bugs is pretty tolerable.

### _Porting a complex library is really hard!_

This is something I learned from the [Apache Parquet](https://parquet.apache.org/) ecosystem.
Parquet is an incredibly complex format with scores of encodings, compressions, and types, including
nested types. Pure-JavaScript implementations have been attempted over the years
([1](https://github.com/ironSource/parquetjs), [2](https://github.com/kbajalc/parquets)), but all
that I know of have been abandoned. It's no surprise either that endless subtle bugs requiring a
deep understanding of the underlying data format would make the work brutal and lead to project
burnout. Writing a stable JS implementation would be a massive investment.

It's my belief that for any project beyond a certain complexity, there should only be three core implementations:

- One in C/C++ because C/C++ is today's de-facto performance-critical language, and it can bind to almost any other language.
- One in Rust because removing memory errors brings so much potential and Rust's ergonomics bring impressive development velocity to low-level code. I believe it's _tomorrow's_ performance-critical language.
- One in Java because the Java Virtual Machine makes it hard to interface with external C libraries (and it's _yesterday's_ performance-critical language?).

### From high-level languages, prefer bindings

<!-- To me the core of Tom's reasoning above is

> [JSTS is] not exactly the same set of bugs as GEOS. If I have bugs, I want all of the GEOS things to have bugs! And the roaring success of, say, Shapely, indicates that GEOS's level of bugs is pretty tolerable. -->

For every other language and environment, the code should be a _binding_ to a core library because
it takes such a huge investment to get to the stability of a core library. These other
implementations should choose one of the above and _link_ to it for the core algorithms rather than
reimplement the entire source in the target language.

Keeping with the Parquet analogy above, there's a [core implementation in C++](https://github.com/apache/arrow/tree/main/cpp/src/parquet), [one in Java](https://github.com/apache/parquet-mr), and [another in Rust](https://github.com/apache/arrow-rs/tree/master/parquet). [^2] But virtually every other stable Parquet library is a binding to one of those. The Python and R Parquet implementations are bindings to the C++ one; my [WebAssembly Parquet implementation](https://github.com/kylebarron/parquet-wasm) uses the Rust one. [^1] A [Scala Parquet library](https://github.com/mjakubowski84/parquet4s) appears [to use](https://github.com/mjakubowski84/parquet4s/blob/f41ff6d4203e039a0e52c7d0d5648e24ece37706/build.sbt#L91-L93) the Java implementation.


Additionally, by having fewer core implementations, it's possible to focus energy on solving bugs in those implementations where previously efforts might have been spread more thin.


[^1]: Apparently, if you're using the _Arrow_ Java library, it actually [links to the C++ Parquet implementation](https://github.com/apache/arrow/blob/0344a2cdf6219708a25f39e580406e0ce692b61e/java/pom.xml#L1011-L1030) via the Java Native Interface (JNI) instead of using `parquet-mr`.

[^2]: Well, actually there are [_two_ Rust implementations](https://github.com/jorgecarleitao/parquet2) for technical reasons, but they plan to [converge eventually](https://github.com/jorgecarleitao/arrow2/issues/1429).

### WebAssembly Performance

Up until now I've focused on stability, but I believe that WebAssembly can bring a significant performance improvement, especially in specific cases:

- **A faster underlying library.** If you're using a C library that already sees very wide usage, it's probably seen a significant investment in performance compared to your plain-JS option.
- **Avoiding the Garbage Collector.** If you can use a binary data representation with [`ArrayBuffer`s](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) instead of small JS objects, getting data into and out of WebAssembly will be virtually free and you'll avoid tons of time in the garbage collector.
- **Vectorization.** If you're operating on arrays of values, just moving the for loop from JS to Wasm might be significantly faster. In Python I know making a hot loop compiled can be a >10x improvement; I'm not sure exactly what speedup is likely in JS.
- **Computationally constrained.** Algorithms are good candidates for perf improvement; if your code touches the DOM or is reliant on network requests, it won't get any faster in Wasm.

As an anecdotal example, a quick test last year found that my Wasm Parquet reader was [**_480x faster_**](https://github.com/visgl/loaders.gl/issues/2144#issue-1198790864) than a pure-JavaScript Parquet reader. This speedup was so high because I benefited from all of the reasons above. The Rust library I used in Wasm had seen an investment on performance and it loaded data into [Apache Arrow](https://arrow.apache.org/), an efficient in-memory representation. In contrary, the JS library was newer and performed a costly transpose from Parquet's native columnar layout to an inefficient row-based layout of pure-JS objects.

But my point is that by binding to Rust I got these performance optimizations for free! I didn't have to put in a year of work; I got to such fast performance over a few weeks of hacking nights and weekends.

Keep in mind that WebAssembly will not magically improve performance in all cases! A good case story here is Zaplib's post-mortem, which found [meager performance improvements](https://zaplib.com/docs/blog_post_mortem.html#js-vs-rust) in their specific use case.

### So... Turf? JSTS?

<!-- Turf and JSTS absolutely have their use cases, but  -->

I brought up the Parquet analogy above because I think it applies well to the geospatial context. Without diving into a computational geometry textbook I'd have no idea how to implement a [buffering algorithm](https://en.wikipedia.org/wiki/Buffer_analysis) from scratch.

In geospatial we really have two core libraries for geometry operations: [JTS](https://github.com/locationtech/jts) in Java and [GEOS](https://github.com/libgeos/geos) in C++.

Similar to Parquet, we have three core libraries:  and GeoRust in Rust. (GeoRust is the youngest project and is missing some operations [like buffering](https://github.com/georust/geo/issues/641), but [many algorithms](https://docs.rs/geo/latest/geo/#algorithms) have been implemented, and it's my hope that the project will grow steadily).

Turf is an amazing library but doesn't appear to have a dedicated contributor base right now:

![Screenshot of contributor activity on Turf.js](turf_contributor_graph.png)

I don't know much about JSTS and I've never used it... Apparently it's automatically generated from the JTS source via AST translation. First, that sounds impressive in its own right, so credit where credit is due.


On the performance front, I would _suspect_ that a WebAssembly geometry binding has potential for vast performance improvements over a pure-JS implementation:

- GEOS has seen a ton of performance tuning over the years.
-
- sd
- Geometries could be represented

, especially when operating on arrays of geometries and if represented in a binary format instead of as GeoJSON-like, which requires tons of small heap-allocated JS objects.

There's also a ton of performance potential in using a binary geometry representation.

Performance also has a ton of

For the point of discussion, let's consider for now that we've decided to write GEOS bindings for WebAssembly. We'll come back to GeoRust at the end.

## Implementation

## Ease of binding

## Data Serialization is costly

In many environmentrs you have to consider the cost of moving objects across a boundary.

- In Java you have the JVM
- In Python you have Python objects and the GIL. Here Python objects can read outside memory not defined by Python, and non-Python code can read Python objects (as long as it acquires the GIL).
- In the browser is worse than Python. It is possible (though it can be complex) for JavaScript to read in the WASM memory space. But WASM is sandboxed: the wasm context can't read anything from outside of its own memory buffer. This means that all data in JS needs to be copied into the WASM buffer before any wasm operations can take place.
  - additionally, wasm doesn't come with its own allocator. This means that


### Moving data across the WASM boundary

Moving data between JS and Wasm in effect acts the same as moving data between JS and a Web Worker. There are two options:

- A Structured Clone. This is a costly operation that is akin to a JSON serialization of objects.
- However some objects are _transferables_. This means that they can be shared _freely_ either between the main thread and a web worker or, in this case, across the Wasm boundary. Transfering an object is free because it's essentially just changing the ownership of a pointer between threads. This also means that few objects meet this criteria: mainly just `ArrayBuffer`s.

This is why having a binary geometry encoding is so valuable. It's free to move across thread boundaries.

In JS,

For example, in Christoph's prototype, it:

- Uses a JS library to serialize every GeoJSON to WKT <https://github.com/chrispahm/geos-wasm/blob/8c2679536bd33205377b6359a2e7bdc03d69db14/src/allJsFunctions/Buffer.mjs#L182>
- Passes the WKT string to `GEOSGeomFromWKT`. This first copies the string to WASM memory using a structured clone. Then GEOS parses the WKT into a GEOS object and returns to JS the pointer in WASM memory to the GEOS object.

 it serializes every GeoJSON object to WKT, then passes the WKT to GEOS

### Licensing

GEOS is licensed under the LGPL 2.1. This effectively means that any code that is statically linked
to GEOS must also be licensed as LGPL. I am not a lawyer, and the legal definition of "linking"
feels murky at times. But enforcing dynamic linking in WebAssembly sounds like a black hole. If that
were necessary to prevent having to open source all an application's frontend code, that would
significantly decrease the potential audience of the project.

## GeoRust?

I want to come back to GeoRust before closing my thoughts.

A GeoArrow implementation could read geometries from WASM at [literally zero cost](https://observablehq.com/@kylebarron/zero-copy-apache-arrow-with-webassembly) possibly without even making a copy of the data back to JS.

### Moving data across the WASM boundary

I said above "if only there was some standardized binary format for arrays of geometries".

Here GeoArrow makes moving data into Wasm extremely cheap and reading it out of WASM virtually free. Because Arrow has the _exact same memory layout_ in every implementation, it enables JavaScript to [correctly interpret memory from the WebAssembly memory space](https://observablehq.com/@kylebarron/zero-copy-apache-arrow-with-webassembly) _without any serialization_, even avoiding a copy in some cases. Then in turn we can [visualize the GeoArrow arrays in deck.gl](https://observablehq.com/@kylebarron/geoarrow-and-geoparquet-in-deck-gl) with only a copy to the GPU.


### Licensing

GeoRust is licensed as MIT, so there are no license concerns.

### But it's incomplete?

Yes, this is true, it is incomplete! For example, GeoRust [doesn't currently have an implementation of buffering](https://github.com/georust/geo/issues/641) (as of June 2023). And surely other algorithms in GEOS haven't yet been ported. (Though [the algorithms that do exist](https://docs.rs/geo/latest/geo/#algorithms) are very high quality.)

To be clear, the time horizon to maturity is certainly longer for GeoRust because it's newer.
It will take GeoRust some time to catch up to the full suite of operations in JTS/GEOS, but I have faith in the project and the community that it will happen.

Ideally if more downstream projects pop up that use GeoRust, it will create a symbiotic relationship that's great for the whole ecosystem. Just as GEOS sees development interest resulting from the huge number of downstream users in e.g. Shapely, so would GeoRust hopefully see more contributors if there were a larger transitive user base.

## Where to go from here?

So in conclusion... will I be spending my time writing GEOS bindings to Wasm? No, that's unlikely. But if I find time in the future, I'd jump on the chance to bring GeoRust to the browser.

**I'm more bullish about the unrealized potential of GeoRust + GeoArrow applied to WebAssembly and Python than any other technology combination on the horizon today.**

If you need something in the next 6 months, invest in geos-wasm. If you're looking a couple years down the road, maybe consider GeoRust.
