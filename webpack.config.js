const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const fs = require('fs');

function getFiles (dir, files_){
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files){
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()){
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    ...getFiles('./client/views/'),
    './client/index.js',
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
  ],
  output: {
    filename: 'bundle.js',
    path: './dist',
    publicPath: 'http://localhost:3000/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/client\/views\/.*\.jsx?$/),
    // new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './client/index.html'}),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.coffee', '.js', '.json', '.jade', '.html', '.less', '.css'],
    modulesDirectories: ['node_modules'],
    root: [path.join(__dirname)],
  }
};
