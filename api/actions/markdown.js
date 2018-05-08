import fs from 'fs';
import path from 'path';

export default () => new Promise((resolve, reject) => {
  const readmePath = path.resolve(__dirname, '../../README.md');
  fs.readFile(readmePath, (err, data) => {
    if (!err) {
      resolve({
        content: data.toString(),
      });
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    reject({
      code: 404,
      message: 'File README.md not found',
    });
  });
});
