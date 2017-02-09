module.exports = {
  entry: {
    'popup': './src/index.js',
    'content': './src/chrome/content.js'
  },
  output: {
    path: './chrome-extension',
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
