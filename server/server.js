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

const server = app.listen(process.env.SERVER_PORT, () => {
  const { address, port } = server.address();

  // eslint-disable-next-line no-console
  console.log(`App listening at http://${address}:${port}`);
});
