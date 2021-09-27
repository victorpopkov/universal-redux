import Express from 'express';
import path from 'path';

export default (app) => {
  app.use(Express.static(path.resolve(__dirname, '../build/')));
};
