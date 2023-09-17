"use strict";(self.webpackChunkkylebarron_github_io=self.webpackChunkkylebarron_github_io||[]).push([[833],{4765:function(e,t,a){a.d(t,{F:function(){return u},Z:function(){return m}});var n=a(7294),r=a(7642),o=a(795),l=a(5040),i=a(6799),c=a(8871);var s=e=>{let{post:t}=e;return null};const h=["16px","8px","4px"].map((e=>"rgba(0, 0, 0, 0.1) 0px "+e+" "+e+" 0px"));var d=e=>{let{data:{post:t},children:a}=e;return(0,r.tZ)(l.Z,null,(0,r.tZ)(o.X6,{as:"h1",variant:"styles.h1"},t.title),(0,r.tZ)("p",{sx:{color:"secondary",mt:3,a:{color:"secondary"},fontSize:[1,1,2]}},(0,r.tZ)("time",null,t.date),t.tags&&(0,r.tZ)(n.Fragment,null," — ",(0,r.tZ)(i.Z,{tags:t.tags})),t.timeToRead&&" — ",t.timeToRead&&(0,r.tZ)("span",null,t.timeToRead," min read")),(0,r.tZ)("section",{sx:{my:5,".gatsby-resp-image-wrapper":{my:[4,4,5],borderRadius:"4px",boxShadow:h.join(", "),".gatsby-resp-image-image":{borderRadius:"4px"}},variant:"layout.content"}},a),(0,r.tZ)(s,{post:t}))};const u=e=>{var t,a,n;let{data:{post:o}}=e;return(0,r.tZ)(c.Z,{title:o.title,description:o.description?o.description:o.excerpt,image:o.banner?null===(t=o.banner)||void 0===t||null===(a=t.childImageSharp)||void 0===a||null===(n=a.resize)||void 0===n?void 0:n.src:void 0,pathname:o.slug,canonicalUrl:o.canonicalUrl})};function m(e){let{...t}=e;return n.createElement(d,t)}},6799:function(e,t,a){var n=a(7642),r=a(7294),o=a(4160),l=a(3494),i=a(9706);t.Z=e=>{let{tags:t}=e;const{tagsPath:a,basePath:c}=(0,l.Z)();return(0,n.tZ)(r.Fragment,null,t.map(((e,t)=>(0,n.tZ)(r.Fragment,{key:e.slug},!!t&&", ",(0,n.tZ)(o.rU,{sx:e=>{var t;return{...null===(t=e.styles)||void 0===t?void 0:t.a}},to:(0,i.Z)("/"+c+"/"+a+"/"+e.slug)},e.name)))))}},8871:function(e,t,a){var n=a(7294),r=a(4160),o=a(4232);t.Z=e=>{let{title:t="",description:a="",pathname:l="",image:i="",children:c=null,canonicalUrl:s=""}=e;const h=(0,o.Z)(),{siteTitle:d,siteTitleAlt:u,siteUrl:m,siteDescription:p,siteImage:f,author:g,siteLanguage:y}=h,v={title:t?t+" | "+d:u,description:a||p,url:""+m+(l||""),image:""+m+(i||f)};return n.createElement(n.Fragment,null,n.createElement("html",{lang:y}),n.createElement("title",null,v.title),n.createElement("meta",{name:"description",content:v.description}),n.createElement("meta",{name:"image",content:v.image}),n.createElement("meta",{property:"og:title",content:v.title}),n.createElement("meta",{property:"og:url",content:v.url}),n.createElement("meta",{property:"og:description",content:v.description}),n.createElement("meta",{property:"og:image",content:v.image}),n.createElement("meta",{property:"og:type",content:"website"}),n.createElement("meta",{property:"og:image:alt",content:v.description}),n.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),n.createElement("meta",{name:"twitter:title",content:v.title}),n.createElement("meta",{name:"twitter:url",content:v.url}),n.createElement("meta",{name:"twitter:description",content:v.description}),n.createElement("meta",{name:"twitter:image",content:v.image}),n.createElement("meta",{name:"twitter:image:alt",content:v.description}),n.createElement("meta",{name:"twitter:creator",content:g}),n.createElement("meta",{name:"gatsby-theme",content:"@lekoarts/gatsby-theme-minimal-blog"}),n.createElement("link",{rel:"icon",type:"image/png",sizes:"32x32",href:(0,r.dq)("/favicon-32x32.png")}),n.createElement("link",{rel:"icon",type:"image/png",sizes:"16x16",href:(0,r.dq)("/favicon-16x16.png")}),n.createElement("link",{rel:"apple-touch-icon",sizes:"180x180",href:(0,r.dq)("/apple-touch-icon.png")}),s?n.createElement("link",{rel:"canonical",href:s}):null,c)}},2027:function(e,t,a){a.r(t),a.d(t,{Head:function(){return i.F},default:function(){return c}});var n=a(7294),r=a(1151);function o(e){const t=Object.assign({p:"p",a:"a",em:"em",h3:"h3",span:"span",h4:"h4",code:"code",strong:"strong"},(0,r.ah)(),e.components);return n.createElement(n.Fragment,null,n.createElement(t.p,null,n.createElement(t.a,{href:"https://www.cloudflare.com/"},"Cloudflare")," is a Content Delivery Network (CDN), a global network\nof servers that cache responses from websites so that those responses can load\nmore quickly for future website visitors. A CDN has dual benefits: your website\nbecomes faster for your visitors, but ",n.createElement(t.em,null,"also")," fewer traffic reaches your origin\nweb server, reducing load. For Cloudflare specifically, they have a generous\nfree tier, so for most personal projects, it's more than enough for my needs."),"\n",n.createElement(t.p,null,"I'm building some projects around AWS Lambda, a powerful serverless platform\nthat allows you to respond to network requests in a completely scalable way.\nWhen your traffic is zero, your costs are zero, but if your website goes viral,\nyou'll be able to scale to a huge number of requests quickly."),"\n",n.createElement(t.p,null,"Cloudflare is especially helpful alongside AWS Lambda because pricing is done\nper request, so the fewer requests that reach your Lambda function, the cheaper\nit'll be to run."),"\n",n.createElement(t.p,null,"This post is a high-level overview of how to connect Lambda and Cloudflare."),"\n",n.createElement(t.h3,{id:"overview",style:{position:"relative"}},n.createElement(t.a,{href:"#overview","aria-label":"overview permalink",className:"anchor before"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Overview"),"\n",n.createElement(t.p,null,n.createElement(t.a,{href:"https://stackoverflow.com/a/45849093"},"This StackOverflow answer")," on connecting API Gateway\nto Cloudflare is extremely helpful, so much of this post is essentially\nrehashing that answer for my future reference."),"\n",n.createElement(t.h4,{id:"set-up-cloudflare",style:{position:"relative"}},n.createElement(t.a,{href:"#set-up-cloudflare","aria-label":"set up cloudflare permalink",className:"anchor before"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Set up Cloudflare"),"\n",n.createElement(t.p,null,"First you need to set up a Cloudflare account and attach a domain you own. This\nis relatively self-explanatory. Go to https://cloudflare.com, sign up, and\nfollow their instructions for attaching your domain name and pointing your DNS\ntowards Cloudflare's nameservers."),"\n",n.createElement(t.h4,{id:"create-certificate",style:{position:"relative"}},n.createElement(t.a,{href:"#create-certificate","aria-label":"create certificate permalink",className:"anchor before"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Create certificate"),"\n",n.createElement(t.p,null,"Since API Gateway requires all outbound traffic to be encrypted, you need to\ncreate an SSL certificate to upload to AWS to tell how to encrypt your data. The\nsimplest way to create this certificate is through the Cloudflare dashboard.\nCloudflare will helpfully also renew the certificate as needed."),"\n",n.createElement(t.p,null,'Go to your website in Cloudflare\'s UI and then choose "SSL/TLS" > "Origin\nServer". Then click "Create Certificate".'),"\n",n.createElement(t.p,null,"The only thing you need to change is the hostnames field. Since I'll put my\nendpoints at ",n.createElement(t.code,null,"lambda.kylebarron.dev/*"),", I enter the following hostnames:"),"\n",n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 960px; "\n    >\n      <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 23.333333333333332%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAABYlAAAWJQFJUiTwAAAA3ElEQVR42nVOyW6DUBDj/78r4ZCoKOz7GrFEpCkECEd3PF3USw+W/TwezzOSNEUQhgijCHGSwPN91X4Q6JtIBFEc/2Y4o44E3KVXNw3eHw8YjuvC9TwdMEhN1jfLhXnElZxt23izLIXtOFpqXS7gp7q+x3i/wzgcjzBNE6fzWUMs4hEtkXIyrzfXK8qqQlXXKMpSQZ0XxZcvmds4wmCQC7UMqYdhQNu2aL5LiF68ZVmw7zter135ryYT8/MJI80yZHmOnJBrbddp+Y9PFOJ/TBO2bcO6rv9gwzTP+ASKTmnI85UNDQAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="certificate_hostnames.png"\n        title=""\n        src="/static/3448422cb543469b810dc33a870e9093/7d769/certificate_hostnames.png"\n        srcset="/static/3448422cb543469b810dc33a870e9093/5243c/certificate_hostnames.png 240w,\n/static/3448422cb543469b810dc33a870e9093/ab158/certificate_hostnames.png 480w,\n/static/3448422cb543469b810dc33a870e9093/7d769/certificate_hostnames.png 960w,\n/static/3448422cb543469b810dc33a870e9093/87339/certificate_hostnames.png 1440w,\n/static/3448422cb543469b810dc33a870e9093/3557b/certificate_hostnames.png 1692w"\n        sizes="(max-width: 960px) 100vw, 960px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n    </span>'}}),"\n",n.createElement(t.p,null,"Upon continuing, you see the generated certificate. It's crypto gibberish, but\nyou should keep a record of this, but for the next few steps, and possibly\nlonger term in your password manager."),"\n",n.createElement(t.h4,{id:"import-certificate",style:{position:"relative"}},n.createElement(t.a,{href:"#import-certificate","aria-label":"import certificate permalink",className:"anchor before"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Import Certificate"),"\n",n.createElement(t.p,null,"Navigate to the AWS Certificate Manager (ACM) console. This should be easily\nfound through the AWS web UI."),"\n",n.createElement(t.p,null,n.createElement(t.strong,null,"Note"),": In general, you should upload to ",n.createElement(t.code,null,"us-east-1"),". However, I'm using the\nnewer, cheaper HTTP API Gateway endpoint instead of the older REST API Gateway\nendpoint. For the HTTP API Gateway endpoints, ",n.createElement(t.strong,null,"the certificate needs to be\nuploaded to ACM in the same region as the lambda functions"),". I also don't\nthink there's a downside to uploading your certificate to multiple regions."),"\n",n.createElement(t.p,null,'Click "Import Certificate". Then where it says "Certificate body", paste your\n',n.createElement(t.strong,null,"Origin Certificate"),' from the previous step. Where it says "Certificate\nprivate key", paste your ',n.createElement(t.strong,null,"Private key"),' from the previous step. For the\n"Certificate chain", that\'s a special public key from Cloudflare. To retrieve\nit, go to ',n.createElement(t.a,{href:"https://support.cloudflare.com/hc/en-us/articles/115000479507"},"this Cloudflare help page"),', scroll down to "Step 4 -\nAdd Cloudflare Origin CA root certificates", and expand "Cloudflare Origin CA —\nRSA Root". Then paste that value into the AWS ACM box. Click "Next". Add a tag\nif you\'d like, then click "Import".'),"\n",n.createElement(t.h4,{id:"add-custom-domain-to-api-gateway",style:{position:"relative"}},n.createElement(t.a,{href:"#add-custom-domain-to-api-gateway","aria-label":"add custom domain to api gateway permalink",className:"anchor before"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Add custom domain to API Gateway"),"\n",n.createElement(t.p,null,'Go to the API Gateway console. Then choose "Custom Domain Names" on the left.\nThen click "Create". Enter your domain name, which must match the one provided\nwhen you created the certificate. Since I use this for personal projects, I\'m\ncontent with "Regional", which likely has lower availability than\n"Edge-optimized", but is still very high. Then choose the ACM certificate you\njust uploaded that also matches the same domain name. Then click "Create".'),"\n",n.createElement(t.h4,{id:"configure-domain-mappings",style:{position:"relative"}},n.createElement(t.a,{href:"#configure-domain-mappings","aria-label":"configure domain mappings permalink",className:"anchor before"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Configure domain mappings"),"\n",n.createElement(t.p,null,'Now you\'ve created a certificate, imported it to Amazon, and connected it with a\ncustom API gateway domain. But you need to tell API Gateway which API to call\nwhen that domain is requested. On the same page as the last step, click\n"Configure API mappings", then "Add new mapping". Use the boxes to associate\npaths to APIs and then click "Save". Note that if the path is ',n.createElement(t.code,null,"/endpoint"),",\nyou'll reach that API by calling ",n.createElement(t.code,null,"your_domain/endpoint"),"."),"\n",n.createElement(t.h4,{id:"connect-cloudflare-to-that-api-gateway-domain",style:{position:"relative"}},n.createElement(t.a,{href:"#connect-cloudflare-to-that-api-gateway-domain","aria-label":"connect cloudflare to that api gateway domain permalink",className:"anchor before"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Connect Cloudflare to that API Gateway domain"),"\n",n.createElement(t.p,null,'Now you need to tell Cloudflare to route traffic from your custom domain name to\nAPI Gateway. Make note of the "API Gateway domain name" on the API Gateway page\nwhere you just added a custom domain. Then go back to the Cloudflare dashboard\nand click the "DNS" tab. Then add a ',n.createElement(t.strong,null,n.createElement(t.code,null,"CNAME")),' record, where "Name" is the\nsubdomain name, and "Target" is that "API Gateway domain name". Click "Save".'),"\n",n.createElement(t.h4,{id:"set-ssl-to-full-strict",style:{position:"relative"}},n.createElement(t.a,{href:"#set-ssl-to-full-strict","aria-label":"set ssl to full strict permalink",className:"anchor before"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Set SSL to Full (Strict)"),"\n",n.createElement(t.p,null,'Last, you need to set your SSL mode to "Full (Strict)". If you\'re ok with the\n',n.createElement(t.em,null,"entire domain"),' being "Full (Strict)", you can go to "SSL/TLS" and switch the\nencryption mode to "Full (Strict)".'),"\n",n.createElement(t.p,null,"I use the same base domain for traffic served directly from S3. Since S3 doesn't\nsupport HTTPS traffic, I need to have Cloudflare's SSL setting set to Flexible,\nwhich means that traffic is encrypted between the user and Cloudflare, but not\nbetween Cloudflare and S3. However I need to serve traffic to AWS API Gateway\nwith HTTPS."),"\n",n.createElement(t.p,null,'To get around this, I add a Cloudflare page rule, so that just this API Gateway\ntraffic is set to "Full (Strict)". Click the "Page Rules" tab, click "Create\nPage Rule", add a string matching your domain name(s). Then choose "SSL" as the\nsetting, and set the setting to "Full (Strict)". Then click "Save and Deploy".'),"\n",n.createElement(t.h3,{id:"conclusion",style:{position:"relative"}},n.createElement(t.a,{href:"#conclusion","aria-label":"conclusion permalink",className:"anchor before"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Conclusion"),"\n",n.createElement(t.p,null,"You should now be able to access your API endpoint through your custom domain!\nIn order for Cloudflare to cache your content, you need to set applicable\n",n.createElement(t.code,null,"Cache-Control")," headers, such as ",n.createElement(t.code,null,"public,max-age=3600"),", to cache on both a\nuser's browser and on Cloudflare's server for a period of 1 hour. If the file\nextension is not one ",n.createElement(t.a,{href:"https://support.cloudflare.com/hc/en-us/articles/200172516-Understanding-Cloudflare-s-CDN#h_a01982d4-d5b6-4744-bb9b-a71da62c160a"},"cached by default"),', you\'ll need to set\na "Cache Everything" page rule.'),"\n",n.createElement(t.p,null,"In order to find out if any given request was served from Cloudflare's cache,\nyou can inspect the ",n.createElement(t.code,null,"cf-cache-status")," header on the response. If the value is\n",n.createElement(t.code,null,"HIT"),", the asset was served from Cloudflare's cache."),"\n",n.createElement(t.p,null,n.createElement(t.strong,null,"Footnotes"),":"),"\n",n.createElement(t.p,null,"If you use the HTTP API endpoints, you need the certificate to be in ",n.createElement(t.em,null,"the same\nregion")," as the API. However that also means that if you have HTTP API's in two\nseparate regions, you can't use one domain for both. You'll have to create a\nseparate domain for each region. For the Cloudflare page rule, set an asterisk\nlike ",n.createElement(t.code,null,"*lambda.domain"),", so that you can use one page rule for all subdomains."))}var l=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,r.ah)(),e.components);return t?n.createElement(t,e,n.createElement(o,e)):o(e)},i=a(4765);function c(e){return n.createElement(i.Z,e,n.createElement(l,e))}i.Z}}]);
//# sourceMappingURL=component---node-modules-lekoarts-gatsby-theme-minimal-blog-core-src-templates-post-query-tsx-content-file-path-content-posts-caching-lambda-functions-cloudflare-index-mdx-e3db7af8e99f727e386a.js.map