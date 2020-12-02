import Express from 'express';
import PrettyError from 'pretty-error';
import bodyParser from 'body-parser';
import config from '@Config'; // eslint-disable-line import/no-unresolved
import * as actions from './actions'; // eslint-disable-line sort-imports
import mapUrl from './utils/url';

const pretty = new PrettyError();
const app = new Express();

app.use(bodyParser.json()).use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const { action, params } = mapUrl(actions, splittedUrlPath);

  res.header('Access-Control-Allow-Origin', '*');

  if (action) {
    action(req, params).then(
      (result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      },
      (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.code || 500).json(reason);
        }
      },
    );
  } else {
    res.status(404).json({
      code: 404,
      message: 'Not found',
    });
  }
});

if (config.appApiPort) {
  app.listen(config.appApiPort, (err) => {
    if (err) {
      console.error(err);
    }

    console.info('---\n==> API is running on port %s', config.appApiPort);
    console.info('==> Send requests to %s', config.appApiTarget);
  });
} else {
  console.error(
    '==> ERROR: No APP_API_PORT environment variable has been specified',
  );
}
