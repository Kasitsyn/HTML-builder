const fs = require('fs');
const path = require('path');


fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  else {
    console.log('\nCurrent directory filenames:');
    files.forEach(file => {
      if (file.isFile()) {
        fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
          const name = path.basename(file.name, path.extname(file.name));
          console.log(`${name} - ${path.extname(file.name).slice(1)} - ${Math.ceil(stats.size / 1024)}kb`);
        });
      }
    });
  }
});
