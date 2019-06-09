const path = require('path')

module.exports = {
  entry: {
    'popup': './src/index.js',
    'content': './src/chrome/content.js',
    'options': './src/chrome/options.js'
  },
  output: {
    path: path.resolve(__dirname, 'chrome-extension'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
