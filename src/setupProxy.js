const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    ['/authoring', '/delivery'],
    proxy({
      target: process.env.REACT_APP_API_BASE_URL,
      changeOrigin: true,
      // pathRewrite(path) {
      //   return path.replace('/api', '/');
      // },
    }),
  );
};
