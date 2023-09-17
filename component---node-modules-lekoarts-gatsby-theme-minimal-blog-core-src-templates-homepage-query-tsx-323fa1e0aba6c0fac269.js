"use strict";(self.webpackChunkkylebarron_github_io=self.webpackChunkkylebarron_github_io||[]).push([[366],{4:function(e,t,r){r.r(t),r.d(t,{Head:function(){return $},default:function(){return N}});var n=r(7294),o=r(7642),i=r(4160),a=r(5040),s=r(5221),l=r(4372);var c=e=>{let{children:t}=e;return(0,o.tZ)("section",{sx:{mb:[5,5,6],ul:{margin:0,padding:0},li:{listStyle:"none",mb:3,a:{variant:"links.listItem"}},variant:"section_bottom"}},t)},d=r(3494),g=r(4232),m=r(9706),p=r(8170),b=r(8871),u=r(1151),h=r(5260);const f="__default",y=e=>"object"==typeof e&&null!==e&&f in e;function S(e,t,r,n,o){const i=t&&"string"==typeof t?t.split("."):[t];for(n=0;n<i.length;n++)e=e?e[i[n]]:o;return e===o?r:y(e)?e[f]:e}const E=(e,t)=>{if(e&&e.variant){let r={};for(const n in e){const o=e[n];if("variant"===n){const e="function"==typeof o?o(t):o,n=E(S(t,e),t);r={...r,...n}}else r[n]=o}return r}return e},k=[40,52,64].map((e=>e+"em")),B={space:[0,4,8,16,32,64,128,256,512],fontSizes:[12,14,16,20,24,32,48,64,72]},x={bg:"backgroundColor",m:"margin",mt:"marginTop",mr:"marginRight",mb:"marginBottom",ml:"marginLeft",mx:"marginX",my:"marginY",p:"padding",pt:"paddingTop",pr:"paddingRight",pb:"paddingBottom",pl:"paddingLeft",px:"paddingX",py:"paddingY"},w={marginX:["marginLeft","marginRight"],marginY:["marginTop","marginBottom"],paddingX:["paddingLeft","paddingRight"],paddingY:["paddingTop","paddingBottom"],scrollMarginX:["scrollMarginLeft","scrollMarginRight"],scrollMarginY:["scrollMarginTop","scrollMarginBottom"],scrollPaddingX:["scrollPaddingLeft","scrollPaddingRight"],scrollPaddingY:["scrollPaddingTop","scrollPaddingBottom"],size:["width","height"]},v={color:"colors",background:"colors",backgroundColor:"colors",borderColor:"colors",caretColor:"colors",columnRuleColor:"colors",outlineColor:"colors",textDecorationColor:"colors",opacity:"opacities",transition:"transitions",margin:"space",marginTop:"space",marginRight:"space",marginBottom:"space",marginLeft:"space",marginX:"space",marginY:"space",marginBlock:"space",marginBlockEnd:"space",marginBlockStart:"space",marginInline:"space",marginInlineEnd:"space",marginInlineStart:"space",padding:"space",paddingTop:"space",paddingRight:"space",paddingBottom:"space",paddingLeft:"space",paddingX:"space",paddingY:"space",paddingBlock:"space",paddingBlockEnd:"space",paddingBlockStart:"space",paddingInline:"space",paddingInlineEnd:"space",paddingInlineStart:"space",scrollMargin:"space",scrollMarginTop:"space",scrollMarginRight:"space",scrollMarginBottom:"space",scrollMarginLeft:"space",scrollMarginX:"space",scrollMarginY:"space",scrollPadding:"space",scrollPaddingTop:"space",scrollPaddingRight:"space",scrollPaddingBottom:"space",scrollPaddingLeft:"space",scrollPaddingX:"space",scrollPaddingY:"space",inset:"space",insetBlock:"space",insetBlockEnd:"space",insetBlockStart:"space",insetInline:"space",insetInlineEnd:"space",insetInlineStart:"space",top:"space",right:"space",bottom:"space",left:"space",gridGap:"space",gridColumnGap:"space",gridRowGap:"space",gap:"space",columnGap:"space",rowGap:"space",fontFamily:"fonts",fontSize:"fontSizes",fontWeight:"fontWeights",lineHeight:"lineHeights",letterSpacing:"letterSpacings",border:"borders",borderTop:"borders",borderRight:"borders",borderBottom:"borders",borderLeft:"borders",borderWidth:"borderWidths",borderStyle:"borderStyles",borderRadius:"radii",borderTopRightRadius:"radii",borderTopLeftRadius:"radii",borderBottomRightRadius:"radii",borderBottomLeftRadius:"radii",borderTopWidth:"borderWidths",borderTopColor:"colors",borderTopStyle:"borderStyles",borderBottomWidth:"borderWidths",borderBottomColor:"colors",borderBottomStyle:"borderStyles",borderLeftWidth:"borderWidths",borderLeftColor:"colors",borderLeftStyle:"borderStyles",borderRightWidth:"borderWidths",borderRightColor:"colors",borderRightStyle:"borderStyles",borderBlock:"borders",borderBlockColor:"colors",borderBlockEnd:"borders",borderBlockEndColor:"colors",borderBlockEndStyle:"borderStyles",borderBlockEndWidth:"borderWidths",borderBlockStart:"borders",borderBlockStartColor:"colors",borderBlockStartStyle:"borderStyles",borderBlockStartWidth:"borderWidths",borderBlockStyle:"borderStyles",borderBlockWidth:"borderWidths",borderEndEndRadius:"radii",borderEndStartRadius:"radii",borderInline:"borders",borderInlineColor:"colors",borderInlineEnd:"borders",borderInlineEndColor:"colors",borderInlineEndStyle:"borderStyles",borderInlineEndWidth:"borderWidths",borderInlineStart:"borders",borderInlineStartColor:"colors",borderInlineStartStyle:"borderStyles",borderInlineStartWidth:"borderWidths",borderInlineStyle:"borderStyles",borderInlineWidth:"borderWidths",borderStartEndRadius:"radii",borderStartStartRadius:"radii",columnRuleWidth:"borderWidths",boxShadow:"shadows",textShadow:"shadows",zIndex:"zIndices",width:"sizes",minWidth:"sizes",maxWidth:"sizes",height:"sizes",minHeight:"sizes",maxHeight:"sizes",flexBasis:"sizes",size:"sizes",blockSize:"sizes",inlineSize:"sizes",maxBlockSize:"sizes",maxInlineSize:"sizes",minBlockSize:"sizes",minInlineSize:"sizes",columnWidth:"sizes",fill:"colors",stroke:"colors"},z=(e,t)=>{if("number"!=typeof t||t>=0){if("string"==typeof t&&t.startsWith("-")){const r=t.substring(1),n=S(e,r,r);return"number"==typeof n?-1*n:`-${n}`}return S(e,t,t)}const r=Math.abs(t),n=S(e,r,r);return"string"==typeof n?"-"+n:-1*Number(n)},Z=["margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginBlock","marginBlockEnd","marginBlockStart","marginInline","marginInlineEnd","marginInlineStart","top","bottom","left","right"].reduce(((e,t)=>({...e,[t]:z})),{}),R=(e={})=>(t={})=>{const r={...B,..."theme"in t?t.theme:t},n=(e=>t=>{const r={},n=[null,...(t&&t.breakpoints||k).map((e=>e.includes("@media")?e:`@media screen and (min-width: ${e})`))];for(const o in e){const i=o;let a=e[i];if("function"==typeof a&&(a=a(t||{})),!1!==a&&null!=a)if(Array.isArray(a))for(let e=0;e<a.slice(0,n.length).length;e++){const t=n[e];t?(r[t]=r[t]||{},null!=a[e]&&(r[t][i]=a[e])):r[i]=a[e]}else r[i]=a}return r})(E("function"==typeof e?e(r):e,r))(r);let o={};for(const e in n){const t=n[e],i="function"==typeof t?t(r):t;if(i&&"object"==typeof i){if(y(i)){o[e]=i[f];continue}o[e]=R(i)(r);continue}const a=e in x?x[e]:e,s=a in v?v[a]:void 0,l=s?null==r?void 0:r[s]:S(r,a,{}),c=S(Z,a,S)(l,i,i);if(a in w){const e=w[a];for(let t=0;t<e.length;t++)o[e[t]]=c}else o[a]=c}return o};var I=r(5893);r(6751),r(434),r(8679),r(8947),r(7278),I.Fragment;function W(e){if(!e||!e.sx&&!e.css)return e;const t={};for(let r in e)"sx"!==r&&(t[r]=e[r]);return t.css=(e=>t=>[R(e.sx)(t),"function"==typeof e.css?e.css(t):e.css])(e),t}const T=(e,t,r)=>function(e,t,r){return h.h.call(t,"css")?I.jsx(h.E,(0,h.c)(e,t),r):I.jsx(e,t,r)}(e,W(t),r),C=["margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","m","mt","mr","mb","ml","mx","my","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","p","pt","pr","pb","pl","px","py","color","backgroundColor","bg","opacity"],L=e=>C.includes(e),P=(0,n.forwardRef)((function(e,t){const r=(0,h.u)(),{__themeKey:n="variants",__css:o,variant:i,css:a,sx:s,as:l="div",...c}=e,d=R(o)(r),g=S(r,`${n}.${i}`)||S(r,i),m=g&&R(g)(r),p=R(s)(r),b=R((e=>{const t={};for(const r of C)t[r]=e[r];return t})(c))(r),u=[{boxSizing:"border-box",margin:0,minWidth:0},d,m,p,b,a];return C.forEach((e=>{delete c[e]})),T(l,{ref:t,css:u,...c})})),_=e=>t=>{const r={};for(const n in t)e(n||"")&&(r[n]=t[n]);return r},M=/^m[trblxy]?$/;_((e=>M.test(e))),_((e=>!M.test(e)));const X=n.forwardRef((function(e,t){return T(P,{as:"span",ref:t,variant:"default",...e,__themeKey:"text"})})),Y=n.forwardRef((function({size:e=24,...t},r){const n={xmlns:"http://www.w3.org/2000/svg",width:e,height:e,viewBox:"0 0 24 24",fill:"currentcolor",...t};return T(P,{ref:r,as:"svg",...n})}));Y.displayName="SVG";T("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"currentColor",viewBox:"0 0 24 24",children:T("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})}),_(L),_((e=>!L(e)));function j(e){const t=Object.assign({p:"p"},(0,u.ah)(),e.components);return n.createElement(n.Fragment,null,n.createElement(X,{sx:{fontSize:[4,5,6],fontWeight:"bold",color:"heading"}},n.createElement(t.p,null,"Hi! I'm Kyle Barron")),"\n",n.createElement(t.p,null,"I'm a software engineer figuring out how to make geospatial fast."),"\n",n.createElement(t.p,null,"Check out my ",n.createElement(i.rU,{to:"/blog"},"blog")," or my ",n.createElement(i.rU,{to:"/projects"},"latest projects"),"."))}var F=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,u.ah)(),e.components);return t?n.createElement(t,e,n.createElement(j,e)):j(e)};function U(e){return n.createElement(n.Fragment)}var G=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,u.ah)(),e.components);return t?n.createElement(t,e,n.createElement(U,e)):U()};var H=e=>{let{posts:t}=e;const{basePath:r,blogPath:n}=(0,d.Z)(),{siteTitle:b}=(0,g.Z)();return(0,o.tZ)(a.Z,null,(0,o.tZ)("h1",{sx:p.j},b),(0,o.tZ)("section",{sx:{mb:[5,6,7],p:{fontSize:[1,2,3],mt:2},variant:"section_hero"}},(0,o.tZ)(F,null)),(0,o.tZ)(s.Z,{text:"Latest Posts"},(0,o.tZ)(i.rU,{to:(0,m.Z)("/"+r+"/"+n)},"Read all posts")),(0,o.tZ)(l.Z,{posts:t,showTags:!1}),(0,o.tZ)(c,null,(0,o.tZ)(G,null)))};const $=()=>(0,o.tZ)(b.Z,null);var N=function(e){let{...t}=e;const{data:{allPost:r}}=t;return n.createElement(H,Object.assign({posts:r.nodes},t))}},6799:function(e,t,r){var n=r(7642),o=r(7294),i=r(4160),a=r(3494),s=r(9706);t.Z=e=>{let{tags:t}=e;const{tagsPath:r,basePath:l}=(0,a.Z)();return(0,n.tZ)(o.Fragment,null,t.map(((e,t)=>(0,n.tZ)(o.Fragment,{key:e.slug},!!t&&", ",(0,n.tZ)(i.rU,{sx:e=>{var t;return{...null===(t=e.styles)||void 0===t?void 0:t.a}},to:(0,s.Z)("/"+l+"/"+r+"/"+e.slug)},e.name)))))}},4372:function(e,t,r){r.d(t,{Z:function(){return c}});var n=r(7642),o=r(7294),i=r(795),a=r(4160),s=r(6799);var l=e=>{let{post:t,showTags:r=!0}=e;return(0,n.tZ)(i.xu,{mb:4},(0,n.tZ)(a.rU,{to:t.slug,sx:e=>{var t;return{...null===(t=e.styles)||void 0===t?void 0:t.a,fontSize:[1,2,3],color:"text"}}},t.title),(0,n.tZ)("p",{sx:{color:"secondary",mt:1,a:{color:"secondary"},fontSize:[1,1,2]}},(0,n.tZ)("time",null,t.date),t.tags&&r&&(0,n.tZ)(o.Fragment,null," — ",(0,n.tZ)(s.Z,{tags:t.tags}))))};var c=e=>{let{posts:t,className:r="",showTags:o=!0}=e;return(0,n.tZ)("section",{sx:{mb:[5,6,7]},className:r},t.map((e=>(0,n.tZ)(l,{key:e.slug,post:e,showTags:o}))))}},8871:function(e,t,r){var n=r(7294),o=r(4160),i=r(4232);t.Z=e=>{let{title:t="",description:r="",pathname:a="",image:s="",children:l=null,canonicalUrl:c=""}=e;const d=(0,i.Z)(),{siteTitle:g,siteTitleAlt:m,siteUrl:p,siteDescription:b,siteImage:u,author:h,siteLanguage:f}=d,y={title:t?t+" | "+g:m,description:r||b,url:""+p+(a||""),image:""+p+(s||u)};return n.createElement(n.Fragment,null,n.createElement("html",{lang:f}),n.createElement("title",null,y.title),n.createElement("meta",{name:"description",content:y.description}),n.createElement("meta",{name:"image",content:y.image}),n.createElement("meta",{property:"og:title",content:y.title}),n.createElement("meta",{property:"og:url",content:y.url}),n.createElement("meta",{property:"og:description",content:y.description}),n.createElement("meta",{property:"og:image",content:y.image}),n.createElement("meta",{property:"og:type",content:"website"}),n.createElement("meta",{property:"og:image:alt",content:y.description}),n.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),n.createElement("meta",{name:"twitter:title",content:y.title}),n.createElement("meta",{name:"twitter:url",content:y.url}),n.createElement("meta",{name:"twitter:description",content:y.description}),n.createElement("meta",{name:"twitter:image",content:y.image}),n.createElement("meta",{name:"twitter:image:alt",content:y.description}),n.createElement("meta",{name:"twitter:creator",content:h}),n.createElement("meta",{name:"gatsby-theme",content:"@lekoarts/gatsby-theme-minimal-blog"}),n.createElement("link",{rel:"icon",type:"image/png",sizes:"32x32",href:(0,o.dq)("/favicon-32x32.png")}),n.createElement("link",{rel:"icon",type:"image/png",sizes:"16x16",href:(0,o.dq)("/favicon-16x16.png")}),n.createElement("link",{rel:"apple-touch-icon",sizes:"180x180",href:(0,o.dq)("/apple-touch-icon.png")}),c?n.createElement("link",{rel:"canonical",href:c}):null,l)}}}]);
//# sourceMappingURL=component---node-modules-lekoarts-gatsby-theme-minimal-blog-core-src-templates-homepage-query-tsx-323fa1e0aba6c0fac269.js.map