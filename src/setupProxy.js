import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/", {
      target: "https://watermelon-back-lmg.fly.dev",
      changeOrigin: true,
    })
  );
};
