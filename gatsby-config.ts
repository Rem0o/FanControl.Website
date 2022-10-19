import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Fan Control`,
    siteUrl: `https://www.getfancontrol.com`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [{
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      "trackingId": "xxxxxxxx"
    }
  }, "gatsby-plugin-image", "gatsby-plugin-sitemap", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, `gatsby-plugin-mdx`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `contents`,
      path: `${__dirname}/src/contents`,
    },
  },
  {
    resolve: `gatsby-omni-font-loader`,
    options: {
      enableListener: true,
      preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
      web: [
        {
          name: `Roboto`,
          file: `https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap`,
        },
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      host: 'https://www.getfancontrol.com',
      sitemap: 'https://www.getfancontrol.com/sitemap.xml',
      policy: [{userAgent: '*', allow: '/'}]
    }
  }]
};

export default config;
