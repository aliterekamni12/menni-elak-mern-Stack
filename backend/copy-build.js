const path = require('path');
const fs = require('fs-extra');
const source = path.join(__dirname, '../frontend/build');
const destination = path.join(__dirname, './build');
fs.copy(source, destination)
  .then(() => {
    console.log('Frontend build folder copied successfully to backend!');
  })
  .catch(err => {
    console.error('Error copying build folder:', err);
  });