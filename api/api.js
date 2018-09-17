import Express from 'express';
import PrettyError from 'pretty-error';
import bodyParser from 'body-parser';
import * as actions from './actions'; // eslint-disable-line sort-imports
import config from '@Config';
import mapUrl from './utils/url';

const pretty = new PrettyError();
const app = new Express();

app.use(bodyParser.json());
app.use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const { action, params } = mapUrl(actions, splittedUrlPath);

  if (action) {
    console.log('API REQUEST:', req.url, req.params, req.body);

    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.code || 500).json(reason);
        }
      });
  } else {
    res.status(404).json({
      code: 404,
      message: 'Not found',
    });
  }
});

if (config.apiPort) {
  app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }

    console.info('----\n==> API is running on port %s', config.apiPort);
    console.info('==> Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });
} else {
  console.error('==> ERROR: No PORT environment variable has been specified');
}
