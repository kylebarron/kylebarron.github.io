(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"A2+M":function(t,e,n){var r=n("X8hv");t.exports={MDXRenderer:r}},X8hv:function(t,e,n){function r(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function c(t,e,n){return(c=r()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var c=new(Function.bind.apply(t,r));return n&&o(c,n.prototype),c}).apply(null,arguments)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n("xtjI"),n("Dq+y"),n("Ggvi"),n("YbXK"),n("cFtU"),n("m210"),n("4DPX"),n("rzGZ"),n("LagC"),n("q8oJ"),n("8npG"),n("nWfQ"),n("nWfQ"),n("LagC"),n("YbXK"),n("cFtU"),n("q8oJ"),n("m210"),n("xtjI"),n("4DPX"),n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi");var p=n("q1tI"),l=n("7ljp"),s=l.useMDXComponents,b=l.mdx,y=n("BfwJ").useMDXScope;t.exports=function(t){var e=t.scope,n=t.components,r=t.children,o=function(t,e){if(null==t)return{};var n,r,c={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(c[n]=t[n]);return c}(t,["scope","components","children"]),i=s(n),f=y(e),l=p.useMemo((function(){if(!r)return null;var t=a({React:p,mdx:b},f),e=Object.keys(t),n=e.map((function(e){return t[e]}));return c(Function,["_fn"].concat(u(e),[""+r])).apply(void 0,[{}].concat(u(n)))}),[r,e]);return p.createElement(l,a({components:i},o))}},kT7v:function(t,e,n){"use strict";n.r(e);n("xtjI"),n("4DPX"),n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi");var r=n("q1tI"),c=n.n(r),o=n("2A+t"),u=n("izhR"),i=n("A2+M"),a=n("Q3iF"),f=n("GIzu"),p=function(t){var e=t.data.page;return Object(o.c)(a.a,null,Object(o.c)(f.a,{title:e.title,description:e.excerpt}),Object(o.c)(u.d,{variant:"styles.h2"},e.title),Object(o.c)("section",{sx:{my:5}},Object(o.c)(i.MDXRenderer,null,e.body)))};function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){b(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function b(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"query",(function(){return y}));e.default=function(t){var e=t.data,n=e.page;return c.a.createElement(p,{data:s(s({},e),{},{page:n})})};var y="582377825"},nWfQ:function(t,e,n){var r=n("P8UN"),c=n("nsRs"),o=n("nONw"),u=n("1a8y"),i=n("BjK0"),a=n("96qb"),f=n("16Xr"),p=(n("emib").Reflect||{}).construct,l=a((function(){function t(){}return!(p((function(){}),[],t)instanceof t)})),s=!a((function(){p((function(){}))}));r(r.S+r.F*(l||s),"Reflect",{construct:function(t,e){o(t),u(e);var n=arguments.length<3?t:o(arguments[2]);if(s&&!l)return p(t,e,n);if(t==n){switch(e.length){case 0:return new t;case 1:return new t(e[0]);case 2:return new t(e[0],e[1]);case 3:return new t(e[0],e[1],e[2]);case 4:return new t(e[0],e[1],e[2],e[3])}var r=[null];return r.push.apply(r,e),new(f.apply(t,r))}var a=n.prototype,b=c(i(a)?a:Object.prototype),y=Function.apply.call(t,b,e);return i(y)?y:b}})}}]);
//# sourceMappingURL=component---node-modules-lekoarts-gatsby-theme-minimal-blog-core-src-templates-page-query-tsx-30dbdf81b4f9cbbb3886.js.map