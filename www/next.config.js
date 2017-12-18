module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      aggregateTimeout: 300,
      poll: true
    }
    return config
  }
}
