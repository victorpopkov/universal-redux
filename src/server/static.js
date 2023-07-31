import path from 'path';
import Express from 'express';

export default (app) => {
  app.use(Express.static(path.resolve(__dirname, '../build/')));
};
