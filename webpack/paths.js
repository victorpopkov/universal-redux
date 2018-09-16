const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.resolve(root, 'src/');
const build = path.resolve(root, 'build/');

module.exports = {
  root,
  src,
  build,
};
