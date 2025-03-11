import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import Navbar from "./src/configs/navbar";
import PrismConfig from "./src/configs/prism";
require('dotenv').config();
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: process.env.BASE_NAME || 'CSlant API Docs',
  tagline: 'CSlant API Documentation uses the OpenAPI Specification to provide a detailed reference for all available endpoints, request and response examples, and more.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: process.env.DOCS_URL || 'https://api-docs.cslant.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.BASE_URL || '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: process.env.ORGANIZATION_NAME, // Usually your GitHub org/user name.
  projectName: process.env.PROJECT_NAME, // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  
  markdown: {
    mermaid: true,
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './src/configs/sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: Navbar as Preset.ThemeConfig['navbar'],

    footer: {
      style: 'dark',
      copyright: `Copyright &#169; ${new Date().getFullYear()} <a href="https://cslant.com" target="_blank" rel="noopener noreferrer">CSlant</a>`,
    },
    
    prism: PrismConfig,
  } satisfies Preset.ThemeConfig,
  
  baseUrlIssueBanner: false,
  
  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi",
        docsPluginId: "classic",
        config: {
          blog: {
            outputDir: "docs/blog",
            specPath: `${process.env.OPENAPI_DOCS_BLOG_URL}`,
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
        },
      },
    ],
  ],
  
  scripts: [
    {
      src: 'https://static.cloudflareinsights.com/beacon.min.js',
      async: true,
      'data-cf-beacon': `{"token": "${process.env.CLOUDFLARE_ANALYTICS_TOKEN}"}`,
    },
  ],
  
  themes: ["docusaurus-theme-openapi-docs", "@docusaurus/theme-mermaid"],
};

export default config;
