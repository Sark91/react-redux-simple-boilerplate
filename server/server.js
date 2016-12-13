import express from 'express';
import path from 'path';
const app = express();

const indexFile = path.resolve(__dirname, '../dist/index.html');

app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('/*', (req, res) => {
  res.sendFile(indexFile, (err) => {
    if (err) res.status(err.status).end();
  });
});


// app.get('/*', function (req, res) {
//   Router.run(routes, req.url, Handler => {
//     res.send(React.renderToString(<Handler />));
//     // let content = React.renderToString(<Handler />);
//     // res.render('index', { content: content });
//   });
// });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});