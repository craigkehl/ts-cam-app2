const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://35.217.93.153:8080',
      changeOrigin: true,
    })
  );
};
