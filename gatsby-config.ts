import type { GatsbyConfig, PluginRef } from "gatsby";
import "dotenv/config";

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

const config: GatsbyConfig = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-minimal-blog/gatsby-config.mjs
    siteTitle: `Kyle Barron`,
    siteTitleAlt: `Kyle Barron`,
    siteHeadline: `Kyle Barron`,
    siteUrl: `https://kylebarron.dev`,
    siteDescription: `Kyle Barron's blog`,
    // siteImage: `/banner.jpg`,
    siteLanguage: `en`,
    author: `@kylebarron2`,
  },
  // TODO: change to never?
  trailingSlash: `never`,
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        // Custom date display format
        // I believe this uses Moment.js's format strings
        // https://momentjs.com/docs/#/displaying/format/
        formatString: "MMMM Do, YYYY",
        // Set to false so that I can use my own custom config below to support
        // page links
        mdx: false,
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `Projects`,
            slug: `/projects`,
          },
          {
            title: `Media`,
            slug: `/media`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: "GitHub",
            url: "https://github.com/kylebarron",
          },
          {
            name: `X`,
            url: `https://twitter.com/kylebarron2`,
          },
          {
            name: "Mastodon",
            url: "https://mapstodon.space/@kylebarron",
          },
          {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/kylebarrongeo/",
          },
          {
            name: `RSS`,
            url: `https://kylebarron.dev/rss.xml`,
          },
        ],
      },
    },
    // MDX config
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
          // Support linking to headers
          "gatsby-remark-autolink-headers",
          // Make iframes full width
          "gatsby-remark-responsive-iframe",
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Kyle Barron's blog`,
    //     short_name: `Kyle Barron's blog`,
    //     description: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and code highlighting.`,
    //     start_url: `/`,
    //     background_color: `#fff`,
    //     // This will impact how browsers show your PWA/website
    //     // https://css-tricks.com/meta-theme-color-and-trickery/
    //     // theme_color: `#6B46C1`,
    //     display: `standalone`,
    //     icons: [
    //       {
    //         src: `/android-chrome-192x192.png`,
    //         sizes: `192x192`,
    //         type: `image/png`,
    //       },
    //       {
    //         src: `/android-chrome-512x512.png`,
    //         sizes: `512x512`,
    //         type: `image/png`,
    //       },
    //     ],
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allPost },
            }: {
              query: {
                allPost: IAllPost;
                site: { siteMetadata: ISiteMetadata };
              };
            }) =>
              allPost.nodes.map((post) => {
                const url = site.siteMetadata.siteUrl + post.slug;
                const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`;

                return {
                  title: post.title,
                  date: post.date,
                  excerpt: post.excerpt,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": content }],
                };
              }),
            query: `{
  allPost(sort: {date: DESC}) {
    nodes {
      title
      date(formatString: "MMMM D, YYYY")
      excerpt
      slug
    }
  }
}`,
            output: `rss.xml`,
            title: `Kyle Barron's blog`,
          },
        ],
      },
    },
  ].filter(Boolean) as Array<PluginRef>,
};

export default config;

interface IPostTag {
  name: string;
  slug: string;
}

interface IPost {
  slug: string;
  title: string;
  defer: boolean;
  date: string;
  excerpt: string;
  contentFilePath: string;
  html: string;
  timeToRead: number;
  wordCount: number;
  tags: Array<IPostTag>;
  banner: any;
  description: string;
  canonicalUrl: string;
}

interface IAllPost {
  nodes: Array<IPost>;
}

interface ISiteMetadata {
  siteTitle: string;
  siteTitleAlt: string;
  siteHeadline: string;
  siteUrl: string;
  siteDescription: string;
  siteImage: string;
  author: string;
}
