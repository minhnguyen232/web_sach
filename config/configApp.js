const config = (app) => {
  const node_env = process.env.NODE_ENV;
  const app_url = process.env.APP_URL;
  const port = process.env.PORT;
  if (node_env != "dev") {
    app_url = process.env.APP_URL_PROD;
  }
  return {
    node_env: node_env,
    app_url: app_url,
    port: port,
  };
};

module.exports = {
  config: config,
};
