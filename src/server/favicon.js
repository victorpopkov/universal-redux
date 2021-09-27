import favicon from 'serve-favicon';
import path from 'path';

export default (app) => {
  app.use(
    favicon(
      __DEVELOPMENT__
        ? path.resolve(__dirname, '../assets/favicon/favicon.ico')
        : path.resolve(__dirname, '../build/assets/favicon/favicon.ico'),
    ),
  );
};
