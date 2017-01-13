module.exports = {
  entry: {
    'popup': './entry.jsx',
    'content': './app/content.jsx'
  },
  output: {
    path: './chrome-extension',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
