const fs = require('fs');
const path = require('path');

const copyDir = () => {

  fs.exists(path.join(__dirname, 'files-copy'), (isExist) => {
    if (isExist) {
      fs.readdir(path.join(__dirname, 'files-copy'), { withFileTypes: true }, (err, files) => {
        if (err) throw err;

        for (let file of files) {
          fs.unlink(path.join(__dirname, 'files-copy', file.name), function (err) {
            if (err) throw err;
            fs.readdir(path.join(__dirname, 'files-copy'), { withFileTypes: true }, (err, files) => {
              if (err) throw err;
              if (!files.length) {
                copyfile();
              }
            });
          });
        }
      });
    } else {
      fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
        if (err) throw err;
        copyfile();
      });
    }

  });

  function copyfile() {
    fs.readdir(path.join(__dirname, 'files'), { withFileTypes: true }, (err, files) => {
      if (err)
        console.log(err);
      else {
        for (let file of files) {

          fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), err => {
            if (err) throw err;
          });
        }
      }
    });
  }

};

copyDir();