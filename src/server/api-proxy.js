import httpProxy from 'http-proxy';
import config from '../../config';

export default (app) => {
  if (!config.appApiProxyDisabled) {
    const proxy = httpProxy.createProxyServer({
      changeOrigin: true,
      target: config.appApiProxyTarget,
      ws: false,
    });

    app.use(config.appApiProxyPath, (req, res) => {
      proxy.web(req, res);
    });
  }
};
