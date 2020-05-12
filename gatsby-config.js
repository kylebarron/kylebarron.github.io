require(`dotenv`).config({
  path: `.env`,
});

module.exports = {
  // siteMetadata is generally used for SEO; see
  // https://github.com/LekoArts/gatsby-themes/blob/master/themes/gatsby-theme-minimal-blog/src/components/seo.tsx
  siteMetadata: {
    siteTitle: "Kyle Barron",
    siteTitleAlt: "Kyle Barron",
    siteHeadline: "Kyle Barron",
    siteUrl: "https://kylebarron.dev",
    siteDescription: "Kyle Barron",
    siteLanguage: "en",
    author: "@kylebarron2",
    siteImage: "",
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        feedTitle: "Kyle Barron's blog",
        // Custom date display format
        // I believe this uses Moment.js's format strings
        // https://momentjs.com/docs/#/displaying/format/
        formatString: "MMMM Do YYYY",
        showLineNumbers: false,
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
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: "Github",
            url: "https://github.com/kylebarron",
          },
          {
            name: "Twitter",
            url: "https://twitter.com/kylebarron2"
          },
          {
            name: "RSS",
            url: "https://kylebarron.dev/rss.xml"
          }
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
        ],
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
          // This is necessary both in gatsbyRemarkPlugins and in plugins
          // When missing from plugins, loading url with hash from outside the
          // page doesn't work. It only works if you already loaded the page
          "gatsby-remark-autolink-headers",
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: process.env.GOOGLE_ANALYTICS_ID,
    //   },
    // },
    `gatsby-plugin-sitemap`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `minimal-blog - @lekoarts/gatsby-theme-minimal-blog`,
    //     short_name: `minimal-blog`,
    //     description: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and code highlighting.`,
    //     start_url: `/`,
    //     background_color: `#fff`,
    //     theme_color: `#6B46C1`,
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
    // `gatsby-plugin-offline`,
    // `gatsby-plugin-netlify`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
};
