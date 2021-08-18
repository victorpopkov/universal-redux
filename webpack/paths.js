const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.resolve(root, 'src/');
const assets = path.resolve(src, 'assets/');

module.exports = {
  config: path.resolve(root, 'config/'),
  build: path.resolve(root, 'build/'),
  scss: path.resolve(assets, 'scss/'),
  app: path.resolve(src, 'app/'),
  assets,
  root,
  src,
};
