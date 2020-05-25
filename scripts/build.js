const webpack = require('webpack');

const config = require('./webpack.config');

function callback(err, stats) {
  if (err) {
      console.log(err);
  } else {
      console.log(
          stats.toString({
              colors: true,
              chunks: false
          })
      );
  }
}

function webpackBuild(webpackConfig) {
  const compiler = webpack(webpackConfig);
  compiler.run(callback);
}

webpackBuild(config)