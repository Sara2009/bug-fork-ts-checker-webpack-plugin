const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: {
    index: './src/js/index.tsx'
  },
  bail: true,
  mode: 'production',
  devtool: 'sourcemap',
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                  {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                          // you can specify a publicPath here
                          // by default it use publicPath in webpackOptions.output
                          // This is not work when setting the cacheGroups. Only webpackOptions.output affects the publisPath.
                      }
                  },
                  {
                      loader: 'css-loader',
                      options: {
                          importLoaders: 1, //
                          sourceMap: true
                      }
                  }
              ]
          },
          {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              use: [
                  {
                      loader: 'url-loader',
                      options: {
                          limit: 300,
                          name: '[name].[contenthash:9].[ext]',
                          publicPath: `//test.domain.com/img/pic`,
                          outputPath: `./img/pic`
                      }
                  }
              ]
          },
          {
              test: /\.(html|tpl)$/,
              exclude: /node_modules/,
              loader: 'html-loader',
              options: {
                  attributes: {
                      list: [
                          {
                              tag: 'script',
                              attribute: 'inline',
                              type: 'src',
                              filter: (tag, attribute, attributes, resourcePath) => {
                                  return false;
                              }
                          }
                      ]
                  }
              }
          },
          {
              test: /\.(ts|tsx)$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {}
          }
      ]
  },
  resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      
  },
  plugins: [
      new ForkTsCheckerWebpackPlugin({
          async: false
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: `${path.join(__dirname, '../', `./src/index.html`)}`,
        chunks: ['index', 'common']
      }),
      new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].[contenthash:9].css?max_age=604800',
          chunkFilename: `[name].[id].[contenthash:9].css?max_age=604800`
      }),
      new webpack.HashedModuleIdsPlugin({
          context: __dirname,
          hashFunction: 'md5',
          hashDigest: 'hex',
          hashDigestLength: 9
      }),
      new webpack.ProgressPlugin()
  ],
  optimization: {
      moduleIds: 'hashed',
      chunkIds: "named",
      usedExports: true, // this!
      splitChunks: {
          cacheGroups: {
              common: {
                // 引用次数多的模块
                name: "common",
                chunks: "all",
                minChunks: 2,
                priority: 10,
                reuseExistingChunk: true
              }
          }
      },
      minimizer: [new TerserJSPlugin({
          extractComments: false,
      }), new OptimizeCSSAssetsPlugin({})]
  }
}