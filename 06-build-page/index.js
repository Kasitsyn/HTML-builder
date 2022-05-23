const fs = require('fs');
const path = require('path');

let template = '';
let re = /{{+[a-w]+}}/gi;

const rs = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');

rs.on('data', chunk => template += chunk);
rs.on('end', () => {
  let header = '';
  let articles = '';
  let footer = '';
  fs.readFile(path.join(__dirname, 'components', 'header.html'), (err, file) => {
    header += file;
    fs.readFile(path.join(__dirname, 'components', 'articles.html'), (err, file) => {
      articles += file;
      fs.readFile(path.join(__dirname, 'components', 'footer.html'), (err, file) => {
        footer += file;
        let newTemplate = template.replace(re, (text) => {
          if (text === '{{header}}') {
            return header;
          } else if (text === '{{articles}}') {
            return articles;
          } else if (text === '{{footer}}') {
            return footer;
          }
        });
        fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
          if (err) throw err;
        });
        fs.writeFile(
          path.join(__dirname, 'project-dist', 'index.html'),
          `${newTemplate}`,
          (err) => {
            if (err) throw err;

          }
        );

        fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
          if (err)
            console.log(err);
          else {
            for (let file of files) {
              if (file.isFile() && path.extname(file.name) === '.css') {
                const rs = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
                rs.on('data', chunk => {
                  fs.appendFile(
                    path.join(__dirname, 'project-dist', 'style.css'),
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
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
          if (err) throw err;
        });

        fs.readdir(path.join(__dirname, 'assets', 'fonts'), { withFileTypes: true }, (err, files) => {
          if (err)
            console.log(err);
          else {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), { recursive: true }, (err) => {
              if (err) throw err;
            });
            for (let file of files) {

              fs.copyFile(path.join(__dirname, 'assets', 'fonts', file.name), path.join(__dirname, 'project-dist', 'assets', 'fonts', file.name), err => {
                if (err) throw err;
              });
            }
          }
        });

        fs.readdir(path.join(__dirname, 'assets', 'img'), { withFileTypes: true }, (err, files) => {
          if (err)
            console.log(err);
          else {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), { recursive: true }, (err) => {
              if (err) throw err;
            });
            for (let file of files) {

              fs.copyFile(path.join(__dirname, 'assets', 'img', file.name), path.join(__dirname, 'project-dist', 'assets', 'img', file.name), err => {
                if (err) throw err;
              });
            }
          }
        });

        fs.readdir(path.join(__dirname, 'assets', 'svg'), { withFileTypes: true }, (err, files) => {
          if (err)
            console.log(err);
          else {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), { recursive: true }, (err) => {
              if (err) throw err;
            });
            for (let file of files) {

              fs.copyFile(path.join(__dirname, 'assets', 'svg', file.name), path.join(__dirname, 'project-dist', 'assets', 'svg', file.name), err => {
                if (err) throw err;
              });
            }
          }
        });
      });
    });
  });


});










