var
  path = require('path'),
  WebpackNotifierPlugin = require('webpack-notifier'),
  BUILD_DIR = path.resolve(__dirname, 'build'),
  APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: [
    'babel-polyfill',
    APP_DIR + '/index.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: APP_DIR,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin({alwaysNotify: true}),
  ],
  resolve: {
    alias: {
      app: APP_DIR
    },
    enforceExtension: false,
    extensions: ['.js', '.jsx', '.scss', '.json']
  },
  devtool: 'source-map'
};
