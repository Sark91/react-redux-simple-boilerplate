const env = require('node-env-file');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // installed via npm
const webpack = require('webpack'); // to access built-in plugins
const path = require('path');
const fs = require('fs');

const includeFileExtension = /\.jsx?$/;
const excludeFile = /node_modules/;

env(path.resolve(__dirname, '.env'));


function getFiles(dir, files_) {
  files_ = files_ || [];
  const files = fs.readdirSync(dir);
  // eslint-disable-next-line guard-for-in
  for (const i in files) {
    const name = `${dir}/${files[i]}`;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

const moduleExport = {
  devtool: 'inline-source-map',
  entry: [
    ...getFiles('./client/views/'),
    './client/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: './dist',
    publicPath: `http://localhost:${process.env.SERVER_PORT}/`,
  },
  module: {
    loaders: [
      {
        test: includeFileExtension,
        loaders: ['react-hot', 'babel-loader'],
        exclude: excludeFile,
      },
    ],
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.coffee', '.js', '.json', '.jade', '.html', '.less', '.css'],
    modulesDirectories: ['node_modules'],
    root: [path.join(__dirname)],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/client\/views\/.*\.jsx?$/),
    new HtmlWebpackPlugin({ template: './client/index.html' }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};

if (process.env.NODE_ENV === 'production') {
  delete moduleExport.devtool;

  moduleExport.module.loaders = [
    {
      test: includeFileExtension,
      exclude: excludeFile,
      loader: 'babel',
      // query: require('.babelrc')
      query: JSON.parse(fs.readFileSync('.babelrc', { encoding: 'utf-8' })),
    },
  ];

  moduleExport.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify('production'),
        PROD_ENV: JSON.stringify('1'),
      },
    }),
    new webpack.ContextReplacementPlugin(/client\/views\/.*\.jsx?$/),
    // new ExtractTextPlugin("bundle.css", {allChunks: false}),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
      },
      output: {
        comments: false,
      },
    }),
    new HtmlWebpackPlugin({ template: './client/index.html' }),
  ];
}

module.exports = moduleExport;
