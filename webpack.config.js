// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

// Webpack configuration
module.exports = {
	entry: path.resolve(__dirname, "src/index.js"),
	// Tells the dev server where to look for files
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true
	},
	// Maps your compiled code back to your original source code.
	devtool: "source-map",
	// Tell webpack to use html plugin
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public/index.html")
		}),
		new UglifyJSPlugin()
	],
	// Loaders configuration -> ADDED IN THIS STEP
	// We are telling webpack to use "babel-loader" for .js and .jsx files
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
				test: /\.(png|svg|jpg|gif)$/,
				use: ["file-loader"]
			}
		]
	},
	// Enable importing JS files without specifying their's extenstion -> ADDED IN THIS STEP
	//
	// So we can write:
	// import MyComponent from './my-component';
	//
	// Instead of:
	// import MyComponent from './my-component.jsx';
	resolve: {
		extensions: [".js", ".jsx", "png"]
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: "/"
	}
};
