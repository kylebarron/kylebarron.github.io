"use strict";(self.webpackChunkkylebarron_github_io=self.webpackChunkkylebarron_github_io||[]).push([[926],{4765:function(e,t,n){n.d(t,{F:function(){return u},Z:function(){return g}});var a=n(7294),r=n(7642),i=n(795),l=n(5040),o=n(6799),c=n(8871);var s=e=>{let{post:t}=e;return null};const m=["16px","8px","4px"].map((e=>"rgba(0, 0, 0, 0.1) 0px "+e+" "+e+" 0px"));var p=e=>{let{data:{post:t},children:n}=e;return(0,r.tZ)(l.Z,null,(0,r.tZ)(i.X6,{as:"h1",variant:"styles.h1"},t.title),(0,r.tZ)("p",{sx:{color:"secondary",mt:3,a:{color:"secondary"},fontSize:[1,1,2]}},(0,r.tZ)("time",null,t.date),t.tags&&(0,r.tZ)(a.Fragment,null," — ",(0,r.tZ)(o.Z,{tags:t.tags})),t.timeToRead&&" — ",t.timeToRead&&(0,r.tZ)("span",null,t.timeToRead," min read")),(0,r.tZ)("section",{sx:{my:5,".gatsby-resp-image-wrapper":{my:[4,4,5],borderRadius:"4px",boxShadow:m.join(", "),".gatsby-resp-image-image":{borderRadius:"4px"}},variant:"layout.content"}},n),(0,r.tZ)(s,{post:t}))};const u=e=>{var t,n,a;let{data:{post:i}}=e;return(0,r.tZ)(c.Z,{title:i.title,description:i.description?i.description:i.excerpt,image:i.banner?null===(t=i.banner)||void 0===t||null===(n=t.childImageSharp)||void 0===n||null===(a=n.resize)||void 0===a?void 0:a.src:void 0,pathname:i.slug,canonicalUrl:i.canonicalUrl})};function g(e){let{...t}=e;return a.createElement(p,t)}},6799:function(e,t,n){var a=n(7642),r=n(7294),i=n(4160),l=n(3494),o=n(9706);t.Z=e=>{let{tags:t}=e;const{tagsPath:n,basePath:c}=(0,l.Z)();return(0,a.tZ)(r.Fragment,null,t.map(((e,t)=>(0,a.tZ)(r.Fragment,{key:e.slug},!!t&&", ",(0,a.tZ)(i.rU,{sx:e=>{var t;return{...null===(t=e.styles)||void 0===t?void 0:t.a}},to:(0,o.Z)("/"+c+"/"+n+"/"+e.slug)},e.name)))))}},8871:function(e,t,n){var a=n(7294),r=n(4160),i=n(4232);t.Z=e=>{let{title:t="",description:n="",pathname:l="",image:o="",children:c=null,canonicalUrl:s=""}=e;const m=(0,i.Z)(),{siteTitle:p,siteTitleAlt:u,siteUrl:g,siteDescription:h,siteImage:d,author:b,siteLanguage:y}=m,E={title:t?t+" | "+p:u,description:n||h,url:""+g+(l||""),image:""+g+(o||d)};return a.createElement(a.Fragment,null,a.createElement("html",{lang:y}),a.createElement("title",null,E.title),a.createElement("meta",{name:"description",content:E.description}),a.createElement("meta",{name:"image",content:E.image}),a.createElement("meta",{property:"og:title",content:E.title}),a.createElement("meta",{property:"og:url",content:E.url}),a.createElement("meta",{property:"og:description",content:E.description}),a.createElement("meta",{property:"og:image",content:E.image}),a.createElement("meta",{property:"og:type",content:"website"}),a.createElement("meta",{property:"og:image:alt",content:E.description}),a.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),a.createElement("meta",{name:"twitter:title",content:E.title}),a.createElement("meta",{name:"twitter:url",content:E.url}),a.createElement("meta",{name:"twitter:description",content:E.description}),a.createElement("meta",{name:"twitter:image",content:E.image}),a.createElement("meta",{name:"twitter:image:alt",content:E.description}),a.createElement("meta",{name:"twitter:creator",content:b}),a.createElement("meta",{name:"gatsby-theme",content:"@lekoarts/gatsby-theme-minimal-blog"}),a.createElement("link",{rel:"icon",type:"image/png",sizes:"32x32",href:(0,r.dq)("/favicon-32x32.png")}),a.createElement("link",{rel:"icon",type:"image/png",sizes:"16x16",href:(0,r.dq)("/favicon-16x16.png")}),a.createElement("link",{rel:"apple-touch-icon",sizes:"180x180",href:(0,r.dq)("/apple-touch-icon.png")}),s?a.createElement("link",{rel:"canonical",href:s}):null,c)}},9280:function(e,t,n){n.r(t),n.d(t,{Head:function(){return o.F},default:function(){return c}});var a=n(7294),r=n(1151);function i(e){const t=Object.assign({p:"p",a:"a",em:"em",pre:"pre",code:"code"},(0,r.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(t.p,null,"After a few years of having a semi-dead ",a.createElement(t.a,{href:"https://jekyllrb.com/"},"Jekyll"),"-based website, I'm happy to transition to a new website based on ",a.createElement(t.a,{href:"https://www.gatsbyjs.org/"},"GatsbyJS"),"."),"\n",a.createElement(t.p,null,"I'm excited for this switch because I can incorporate some cool new technologies\ninto the site. For example, ",a.createElement(t.a,{href:"https://github.com/kylebarron/kylebarron.github.io/blob/source/content/posts/new-website/index.mdx"},"this post")," is written in ",a.createElement(t.a,{href:"https://mdxjs.com/"},a.createElement(t.em,null,"MDX")),",\nwhich allows you to combine the simplicity of Markdown with the flexibility of\nReact."),"\n",a.createElement(t.p,null,"For example, I can have editable code snippets that accept updates from the user, like this:"),"\n",a.createElement(t.pre,null,a.createElement(t.code,{className:"language-js"},'const onClick = () => {\n  alert("Change this text");\n};\nrender(<button onClick={onClick}>Click me!</button>);\n')),"\n",a.createElement(t.p,null,"Update ",a.createElement(t.code,null,"Change this text"),", click the button, and you can see the text you just\nput in!"),"\n",a.createElement(t.p,null,"I'm using ",a.createElement(t.a,{href:"https://www.gatsbyjs.org/starters/lekoarts/gatsby-starter-minimal-blog/"},"this starter"),", which helped to get everything set up.\nThe website is hosted on Github Pages, and builds and deploys automatically on\nevery new commit using Travis CI, so I can just write and commit! Everything is\nopen source at ",a.createElement(t.a,{href:"https://github.com/kylebarron/kylebarron.github.io"},"https://github.com/kylebarron/kylebarron.github.io"),"."))}var l=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,r.ah)(),e.components);return t?a.createElement(t,e,a.createElement(i,e)):i(e)},o=n(4765);function c(e){return a.createElement(o.Z,e,a.createElement(l,e))}o.Z}}]);
//# sourceMappingURL=component---node-modules-lekoarts-gatsby-theme-minimal-blog-core-src-templates-post-query-tsx-content-file-path-content-posts-new-website-index-mdx-9fa79a483344692a4042.js.map