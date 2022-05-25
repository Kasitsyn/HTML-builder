const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {

  if (err)
    console.log(err);
  else {

    for (let file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const rs = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
        rs.on('data', chunk => {
          fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'),
            '',
            (err) => {
              if (err) throw err;

            });
          fs.appendFile(
            path.join(__dirname, 'project-dist', 'bundle.css'),
            `${chunk}\n`,
            (err) => {
              if (err) throw err;

            }
          );
        });

      }
    }

  }
});
