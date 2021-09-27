import morgan from 'morgan';
import config from '../../config';

morgan.token('cf-connecting-ip', (req) => req.headers['cf-connecting-ip']);
morgan.token('cf-ipcountry', (req) => req.headers['cf-ipcountry']);
morgan.token('x-forwarded-for', (req) => req.headers['x-forwarded-for']);
morgan.format(
  'cloudflare',
  ':cf-connecting-ip :cf-ipcountry - :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":x-forwarded-for"',
);

export default (app) => {
  app.use(morgan(config.appMorganFormat, { stream: process.stdout }));
};
