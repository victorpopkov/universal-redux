const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.resolve(root, 'src/');
const app = path.resolve(src, 'app/');
const assets = path.resolve(src, 'assets/');
const build = path.resolve(root, 'build/');
const config = path.resolve(root, 'config/');

module.exports = {
  app,
  assets,
  build,
  config,
  root,
  src,
};
