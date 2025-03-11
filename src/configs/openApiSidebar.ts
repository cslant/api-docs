import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

export const OpenApiSidebar: SidebarsConfig = {
  openApiSidebar: [
    {
      type: 'category',
      label: 'Blog',
      link: {
        type: 'generated-index',
        title: 'Blog API',
        description:
          'CSlant API Documentation uses the OpenAPI Specification to provide a detailed reference for all available endpoints, request and response examples, and more.',
        slug: '/category/blog-api'
      },
      items: require('../../docs/blog/sidebar.js')
    }
  ]
};
