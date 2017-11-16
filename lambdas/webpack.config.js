const serverlessWebpack = require('serverless-webpack')

module.exports = {
  entry: serverlessWebpack.lib.entries,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }],
  },
  target: 'node'
}
