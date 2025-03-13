# CSlant Api Docs

This project is a documentation site for the CSlant API. It is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

All OpenAPI docs are generated using the OpenAPI Generator CLI. The generated files are then copied to the `api-docs` directory in the root of the project.

The OpenAPI docs are then rendered using the Docusaurus Plugin OpenAPI Docs and Docusaurus Theme OpenAPI Docs.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [OpenAPI Generator](https://openapi-generator.tech/docs/installation)
- Docusaurus Plugin OpenAPI Docs
- Docusaurus Theme OpenAPI Docs

### Installation

```
yarn
```

#### Plugin

```
yarn add docusaurus-plugin-openapi-docs
```

#### Theme
```
yarn add docusaurus-theme-openapi-docs
```

### Local Development

#### Generating OpenAPI Docs

To generate all OpenAPI docs, run the following command from the root directory of your project:

```
yarn docusaurus clean-api-docs all
yarn docusaurus gen-api-docs all
```

#### Start

```
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
USE_SSH=true yarn deploy
```

Not using SSH:

```
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
