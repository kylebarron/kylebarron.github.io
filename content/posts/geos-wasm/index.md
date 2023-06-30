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
- **Data can be serialized as binary.** If you can use a binary data representation with [`ArrayBuffer`s](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) instead of small JS objects, getting data into and out of WebAssembly will be virtually free and you'll avoid tons of time in the garbage collector.
- **Vectorization.** If you're operating on arrays of values, just moving the for loop from JS to Wasm might be significantly faster. In Python I know making a hot loop compiled can be a >10x improvement; I'm not sure exactly what speedup is likely in JS.
- **Computationally constrained.** Algorithms are good candidates for perf improvement; if your code touches the DOM or is reliant on network requests, it won't get any faster in Wasm.

As an anecdotal example, a quick test last year found that my Wasm Parquet reader was [**_480x faster_**](https://github.com/visgl/loaders.gl/issues/2144#issue-1198790864) than a pure-JavaScript Parquet reader. This speedup was so high because I benefited from all of the reasons above. The Rust library I used in Wasm had seen an investment on performance and it loaded data into [Apache Arrow](https://arrow.apache.org/), an efficient in-memory representation. In contrary, the JS library was newer and performed a costly transpose from Parquet's native columnar layout to an inefficient row-based layout of pure-JS objects.

But my point is that by binding to Rust I got these performance optimizations for free! I didn't have to put in a year of work; I got to such fast performance over a few weeks of hacking nights and weekends.

Keep in mind that WebAssembly will not magically improve performance in all cases! A good case story here is Zaplib's post-mortem, which found [meager performance improvements](https://zaplib.com/docs/blog_post_mortem.html#js-vs-rust) in their specific use case.

### So.. Should we bring GEOS to Wasm?

I brought up the Parquet analogy above because I think it applies well to the geospatial context. Geo algorithms are complex; without diving into a computational geometry textbook I'd have no idea how to implement a [buffering algorithm](https://en.wikipedia.org/wiki/Buffer_analysis) from scratch.

Similar to Parquet, in geospatial we have core, low-level libraries that have done the hard work for us, and made it stable. [JTS](https://github.com/locationtech/jts) in Java and [GEOS](https://github.com/libgeos/geos) in C++ have existed for around two decades and are very stable! Essentially every geometry library in a higher level language is a binding to GEOS. E.g. Shapely in Python and `sf` in R. Rust has a burgeoning project, [GeoRust](https://georust.org/), that will get more stable over time.

Turf and JSTS absolutely have their use cases. For one, they exist today! They're relatively widely used already! But it's also true that it's hard to maintain the core algorithms! Turf is an amazing library but its activity [seems to have waned over the years](https://github.com/Turfjs/turf/graphs/contributors).

But looking down the road, I think there's absolutely a case to bring GEOS or GeoRust to Wasm. GEOS is and GeoRust has the potential to be rock-solid stable libraries. I would _suspect_ they both have potential for performance gains in Wasm over a JS library.

<!-- that a WebAssembly geometry binding has potential for vast performance improvements over a pure-JS implementation. GEOS has seen a ton of performance tuning over the years. And a binary geometry representation that obviates the need for tons of small heap-allocated JS objects would help too. -->

For the point of discussion, let's consider for now that we've decided to write GEOS bindings for WebAssembly. We'll come back to GeoRust at the end.

## Implementing GEOS in WebAssembly

### Ease of binding

GEOS is written in C++, which means that the usual way to compile it to WebAssembly is to use [Emscripten](https://emscripten.org/).

In terms of implementation, Christoph's prototype looks like the way to go. You have to tell emscripten to [expose the underlying C functions](https://github.com/chrispahm/geos-wasm/blob/71366852768c105f701e351d17ca90ea4809409f/GEOS_EMCC_FLAGS.mk#L25-L35) publicly from the Wasm module. Then [register those functions](https://github.com/chrispahm/geos-wasm/blob/71366852768c105f701e351d17ca90ea4809409f/src/allCFunctions.mjs#L11-L24) from JS.

But at that point you're stuck dealing with low level C functions and managing raw pointers. E.g. to buffer a geometry you have to [instantiate the GEOS Geometry object](https://github.com/chrispahm/geos-wasm/blob/71366852768c105f701e351d17ca90ea4809409f/src/allJsFunctions/Buffer.mjs#L182), [call the GEOS buffer operation](https://github.com/chrispahm/geos-wasm/blob/71366852768c105f701e351d17ca90ea4809409f/src/allJsFunctions/Buffer.mjs#L185-L189), and then remember to free the memory later. It's a very manual process and, indeed, quite error prone.

As Christoph [notes](https://github.com/chrispahm/geos-wasm#background):

> What I naïvely expected was that once you'd get GEOS to compile to WASM, you'd automatically be able to use its functions from within JS. But that's not the case. You still need to manually expose each function you'd want to use, define the parameters and return types, allocate memory and clean up after yourself. This is a lot of work and it's far too easy to mess up and produce code that is much slower than necessary when you're not skilled enough in C. Plus, it misses the original idea of having code which is close to the source. Since we're writing the wrapper functions, there's now another layer that potentially introduces bugs, and most importantly, that needs to be maintained.

Yep, that's very on the nose! The difficulty of writing bindings depends on whether you want to make it easy for yourself, the developer, or easy for the user! You could expose a very low level API that forces the user to manage pointers, or put effort into writing user-friendly high-level functions.

This is akin to the [GDAL Python bindings](https://gdal.org/api/python_bindings.html) vs the [Fiona library](https://github.com/Toblerity/Fiona). They both bind to GDAL's vector IO, but the latter is much higher level than the former because Fiona's developers put in the work to abstract away the C interface, and so Fiona is much easier to use.

### Performance

Christoph further [notes](https://github.com/chrispahm/geos-wasm#background):

> And the buffer function is not faster than turf's, at least not in the tests I ran. I guess this is mostly due to the fact that I'm currently serialzing the GeoJSON geometry to WKT, then passing it to the WASM context, running the buffer op and then doing the same thing backwards. This is a lot of overhead, and I haven't come up with a way to avoid it.

#### Serialization is costly!

In any binding you have to consider the cost of moving objects across the C boundary and ideally figure out ways to reduce it.

In Python, Python objects can read outside memory not defined by Python, and non-Python code can read Python objects (as long as it acquires the Global Interpreter Lock).

But WebAssembly is _more constrained_ than Python. While it's possible (though complex) for JavaScript to read objects from the Wasm memory space directly, the Wasm memory is sandboxed! This means that Wasm can't read _JavaScript's_ memory directly; rather any data required by the Wasm program must be copied from JS.

Moving data between JS and Wasm is in effect the same as moving data between JS and a Web Worker. There are two options:

- A ["structured clone"](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone). This is able to copy virtually any JS object, but it's expensive; akin to `JSON.stringify`.
- However some objects are [_transferable_](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects). This means that they can be shared _freely_ either between the main thread and a web worker or, in this case, across the Wasm boundary. Transfering an object is free because it's essentially just changing the ownership of a pointer. This also means that [few objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects#supported_objects) meet this criteria: mainly just `ArrayBuffer`s.

In Christoph's prototype, it:

- Uses a JS library to [serialize every input GeoJSON to WKT](https://github.com/chrispahm/geos-wasm/blob/8c2679536bd33205377b6359a2e7bdc03d69db14/src/allJsFunctions/Buffer.mjs#L182).
- Then [passes the WKT string to `GEOSGeomFromWKT`](https://github.com/chrispahm/geos-wasm/blob/8c2679536bd33205377b6359a2e7bdc03d69db14/src/allJsFunctions/Buffer.mjs#L182). This first copies the string to Wasm memory using a structured clone. Then GEOS parses the WKT into a GEOS object and returns to JS the pointer in Wasm memory to the GEOS object.
- Then after the GEOS operation, it [passes the pointer of the new GEOS object](https://github.com/chrispahm/geos-wasm/blob/8c2679536bd33205377b6359a2e7bdc03d69db14/src/allJsFunctions/Buffer.mjs#L195) to `GEOSGeomToWKT`. This does the reverse of the last point: it encodes into a WKT string, then copies that string out of Wasm memory back to JS.
- Then [decodes the WKT back to a GeoJSON](https://github.com/chrispahm/geos-wasm/blob/8c2679536bd33205377b6359a2e7bdc03d69db14/src/allJsFunctions/Buffer.mjs#L195).

This is _hugely inefficient_. That's not to say there's an easy way around it! Using WKB instead of WKT would probably provide a small speedup, but when every part of the process needs a different memory representation, the interchange between each is going to have overhead!

#### Vectorization

Pretty much any binding that operates on _individual_ items at a time will be slow. Shapely version 2 is _much, much_ faster than Shapely version 1 because it's vectorized. That is, it operates on arrays of objects at a time instead of one at a time.

I doubt GEOS would ever be faster than JSTS or Turf for single geometries because the constant portion of overhead can't be amortized across a bunch of computations.

To make GEOS vectorized in Wasm would mean you'd have an array of heap allocated pointers in Wasm memory space. It could definitely be done but it would require extra binding code on the C side to provide vectorized functions.

### Licensing

GEOS is licensed under the LGPL 2.1. This effectively means that any code that is statically linked
to GEOS must also be licensed as LGPL. I am not a lawyer, and the legal definition of "linking"
feels murky at times. But enforcing dynamic linking in WebAssembly sounds like a black hole. If that
were necessary to prevent having to open source all an application's frontend code, that would
significantly decrease the potential audience of the project.

## GeoRust?

I want to come back to GeoRust before closing my thoughts, because I'm really excited about its potential. Let's look at each of the points above and consider how using GeoRust might impact them.

### Ease of binding

WebAssembly was one of the original use cases for Rust at Mozilla, so unsurprisingly Rust is extremely well suited for Wasm. If your dependencies are pure-Rust, all it takes is a `wasm-pack build` and you have your bundle! C dependencies from Rust can get hairy, but since GeoRust is pure Rust, this is not an issue.

And since the compiler verifies the safety of your code at compile time, if it compiled, it's very likely to work out of the box in JS!

### Performance

#### Serialization

[Above I said](#serialization-is-costly):

> when every part of the process needs a different memory representation, the interchange between each is going to have overhead

To get around this, we need to have every step of the process use the same memory representation! This why I believe so strongly in [GeoArrow](https://github.com/geoarrow/geoarrow). It defines a single memory layout that is usable _across languages_. Because Arrow has the _exact same memory layout_ in every implementation, it enables JavaScript to [correctly interpret memory from the WebAssembly memory space](https://observablehq.com/@kylebarron/zero-copy-apache-arrow-with-webassembly) _without any serialization_, even avoiding a copy in some cases. Then in turn we can [visualize the GeoArrow arrays in deck.gl](https://observablehq.com/@kylebarron/geoarrow-and-geoparquet-in-deck-gl) with only a copy to the GPU.

Rust has a feature called [_traits_](https://doc.rust-lang.org/book/ch10-02-traits.html). Essentially a way to define that any object out there — even one a library author has never seen before — that supplies a set of pre-defined methods can be used with the same algorithms. What this means is that if we define a common trait for how GeoRust accesses coordinate data from geometries, then GeoRust's algorithms could operate on GeoArrow memory without any serialization!

I've been [slowly pushing this along](https://github.com/georust/geo/pull/1011) in GeoRust. It'll take a while to figure out how to adapt GeoRust's algorithms for the trait model, but if it works out it'll make things really fast and memory efficient.


<!-- A GeoArrow implementation could read geometries from Wasm memory at [virtually zero cost](https://observablehq.com/@kylebarron/zero-copy-apache-arrow-with-webassembly), possibly without even making a copy of the data back to JS.


This is why having a binary geometry encoding is so valuable. It's free to move across thread boundaries.


Here GeoArrow makes moving data into Wasm extremely cheap and reading it out of WASM virtually free.  -->

### Licensing

GeoRust is licensed as MIT, so there are no license concerns.

### But it's incomplete?

Yes, this is true, it is incomplete! For example, GeoRust [doesn't currently have an implementation of buffering](https://github.com/georust/geo/issues/641) (as of June 2023). And surely other algorithms in GEOS haven't yet been ported. (Though [the algorithms that do exist](https://docs.rs/geo/latest/geo/#algorithms) are very high quality.)

To be clear, the time horizon to maturity is certainly longer for GeoRust because it's newer.
It will take GeoRust some time to catch up to the full suite of operations in JTS/GEOS, but I have faith in the project and the community that it will happen.

Ideally if more downstream projects pop up that use GeoRust, it will create a symbiotic relationship that's great for the whole ecosystem. Just as GEOS sees development interest resulting from the huge number of downstream users in e.g. Shapely, so would GeoRust hopefully see more contributors if there were a larger transitive user base.

## Where to go from here?

So in conclusion... will I be spending my time writing GEOS bindings to Wasm? No, that's unlikely. (Also I don't know C!) But if I find time in the future, I'd jump on the chance to bring GeoRust to the browser.

The truth is,
**I'm more bullish about the unrealized potential of GeoRust + GeoArrow applied to WebAssembly and Python than any other technology combination on the horizon today.**

If you need something in the next 6 months, invest in geos-wasm. If you're looking a couple years down the road, maybe consider GeoRust.
