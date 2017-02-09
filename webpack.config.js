module.exports = {
  entry: {
    'popup': './app/index.js',
    'content': './app/chrome/content.js'
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
