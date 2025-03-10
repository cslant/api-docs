module.exports = {
  apps: [
    {
      name: "CSlant API Docs",
      script: "npx docusaurus serve",
      env: {
        PORT: 3002,
        HOST: "127.0.0.1",
      },
    },
  ],
};
