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
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-transform-react-jsx"]
        }
      }
    ]
  }
}
