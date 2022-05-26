const fs = require('fs');
const path = require('path');
const { mkdir, readFile, readdir, copyFile, writeFile, rm } = require('fs/promises');

async function buildIndexPage(pathFrom, pathTo) {

  let template = await readFile(path.join(pathFrom, 'template.html'), 'utf-8',
    (error, content) => {
      if (error) throw error;
      return content;
    }
  );

  let components = await readdir(path.join(pathFrom, 'components'), { withFileTypes: true });

  for (const component of components) {

    const content = await readFile(path.join(pathFrom, 'components', component.name), 'utf-8', (err, content) => {
      if (err) throw err;
      return content;
    });

    template = template.replace(`{{${path.parse(path.join(pathFrom, 'components', component.name)).name}}}`, content);
  }

  await rm(pathTo, { force: true, recursive: true });
  await mkdir(pathTo, { recursive: true });
  writeFile(path.join(pathTo, 'index.html'), template);

  buildStyles(path.join(pathFrom, 'styles'), path.join(pathTo, 'style.css'));
  copyAssetsFiles(path.join(pathFrom, 'assets'), path.join(pathTo, 'assets'));

}

async function buildStyles(pathFrom, pathTo) {

  const styleFiles = await readdir(pathFrom, { withFileTypes: true });
  const ws = fs.createWriteStream(pathTo);

  for (const file of styleFiles) {

    if (file.isFile() && path.extname(file.name) === '.css') {
      const rs = fs.createReadStream(
        path.join(pathFrom, file.name),
        'utf-8'
      );

      rs.on('data', (chunk) => {
        ws.write(`\n${chunk}`, (err) => {
          if (err) throw err;
        });
      });

    }
  }
}

async function copyAssetsFiles(pathFrom, pathTo) {

  const files = await readdir(pathFrom, { withFileTypes: true });
  await mkdir(pathTo, { recursive: true });

  for (const file of files) {
    if (file.isDirectory()) {
      copyAssetsFiles(path.join(pathFrom, file.name), path.join(pathTo, file.name));
    } else copyFile(path.join(pathFrom, file.name), path.join(pathTo, file.name));

  }
}

buildIndexPage(path.join(__dirname), path.join(__dirname, 'project-dist'));

