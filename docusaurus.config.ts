import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import Navbar from "./src/configs/navbar";
import { RepoDocsStatic } from "./src/configs/staticDirectories";
import PrismConfig from "./src/configs/prism";
import AlgoliaConfig from "./src/configs/algolia";
require('dotenv').config();

const config: Config = {
  title: process.env.BASE_NAME || 'API Docs',
  tagline: 'CSlant Documentation offers detailed guidelines and resources to help developers seamlessly utilize CSlant\'s convenient tools and features within your projects.',
  favicon: 'img/favicon.ico',

  trailingSlash: false, // This is to remove trailing slash from the URL

  url: process.env.DOCS_URL || 'https://docs.cslant.com',

  baseUrl: process.env.BASE_URL || '/',
  organizationName: process.env.ORGANIZATION_NAME,
  projectName: process.env.PROJECT_NAME,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    mermaid: true,
  },

  staticDirectories: [...RepoDocsStatic, 'static'] as Config['staticDirectories'],

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
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/cslant-logo-horizontal.png',
    // navbar: Navbar as Preset.ThemeConfig['navbar'],

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },

    footer: {
      style: 'dark',
      copyright: `Copyright &#169; ${new Date().getFullYear()} <a href="https://cslant.com" target="_blank" rel="noopener noreferrer">CSlant</a>`,
    },

    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    liveCodeBlock: {
      playgroundPosition: 'bottom',
    },
    prism: PrismConfig,

  } satisfies Preset.ThemeConfig,

  baseUrlIssueBanner: false,

  scripts: [
    {
      src: 'https://static.cloudflareinsights.com/beacon.min.js',
      async: true,
      'data-cf-beacon': `{"token": "${process.env.CLOUDFLARE_ANALYTICS_TOKEN}"}`,
    },
  ],

  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
