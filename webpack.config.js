var webpack = require('webpack')
var env = process.env.NODE_ENV

var config = {
  entry: './src/async',
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel' ], exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'Async',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ]
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
