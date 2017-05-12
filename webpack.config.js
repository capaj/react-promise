const webpack = require('webpack')
const env = process.env.NODE_ENV

const config = {
  entry: './src/async',
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel-loader' ], exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'Async',
    libraryTarget: 'umd'
  },
  plugins: []
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  )
}

module.exports = config
