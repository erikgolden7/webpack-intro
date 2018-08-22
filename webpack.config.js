// We are using node's native package 'path'. For more info check out https://nodejs.org/api/path.html
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

// Production mode enables all sorts of optimizations out of the box. Including minification, scope hoisting, tree-shaking and more.
// Development mode on the other hand is optimized for speed and does nothing more than providing an un-minified bundle.

// Webpack v4 no longer requires an entry or output, and can even be run without a webpack.config file!
// It will look in ./src/index.js as the default entry point. Moreover, it will spit out the bundle in ./dist/main.js.
module.exports = {
  // Tell the dev server which port to run on, where to look for files, and to compress files.
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3005,
    compress: true,
    hot: true
  },

  // Maps your compiled code back to your original source code.
  devtool: 'source-map',

  // Plugins
  plugins: [
    // A webpack plugin to remove/clean your build folder(s) before building
    new CleanWebpackPlugin(['dist']),
    // Simplifies creation of HTML files to serve your webpack bundles
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: './index.html'
    }),
    // This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    // Hot module replacement allows your application to only update changed files. The page will no longer hard refresh.
    new webpack.HotModuleReplacementPlugin()
  ],

  // webpack enables use of loaders to preprocess files. This allows you to bundle any static resource.
  module: {
    rules: [
      // HTML
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      // JAVASCRIPT
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // CSS
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      // IMAGES
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader'
      }
    ]
  }
};
