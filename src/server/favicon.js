import path from 'path';
import favicon from 'serve-favicon';

export default (app) => {
  app.use(
    favicon(
      __DEVELOPMENT__
        ? path.resolve(__dirname, '../assets/favicon/favicon.ico')
        : path.resolve(__dirname, '../build/assets/favicon/favicon.ico'),
    ),
  );
};
