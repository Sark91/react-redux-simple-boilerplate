import env from 'node-env-file';
import express from 'express';
import path from 'path';

const app = express();
const indexFile = path.resolve(__dirname, '../dist/index.html');

env(path.resolve(__dirname, '../.env'));

app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('/*', (req, res) => {
  res.sendFile(indexFile, (err) => {
    if (err) res.status(err.status).end();
  });
});

const server = app.listen(process.env.SERVER_PORT, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});