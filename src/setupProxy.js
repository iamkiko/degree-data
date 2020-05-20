const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/stanford",
    createProxyMiddleware({
      target: "stanfordurl",
      changeOrigin: true,
    })
  );
  app.use(
    "/cornell",
    createProxyMiddleware({
      target: "cornellurl",
      changeOrigin: true,
    })
  );
};
