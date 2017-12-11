// We are using node's native package 'path'. For more info check out https://nodejs.org/api/path.html
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
  // represents our entry javascript file for the project.
  entry: path.resolve(__dirname, "src/index.js"),
  // Tells the dev server which port to run on, where to look for files, and compresses the files.
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 3001,
    compress: true
  },
  // Maps your compiled code back to your original source code.
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    // Tell webpack to use html plugin.
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html")
    }),
    // Minifies the bundle.js file.
    new UglifyJSPlugin()
  ],
  // Loaders configurations tell webpack to use loaders for specific file types.
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader"
      }
    ]
  },
  // Enable importing JS files without specifying their's extenstion.
  //
  // So we can write:
  // import MyComponent from './my-component';
  //
  // Instead of:
  // import MyComponent from './my-component.jsx';
  resolve: {
    extensions: [".js", ".jsx"]
  },
  //  the output bundled file, which we have to include in our main HTML file called bundle.js
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  }
}
