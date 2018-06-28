const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
  	// polyfills: './src/polyfills.js',
  	// app: './src/index.js'
		app: ['./src/polyfills.js', './src/index.js']
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Title by Webpack config'
		}),
    new webpack.HotModuleReplacementPlugin()
	],
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
  	rules: [
  	  {
  	  	test: /\.css$/,
  	  	use: ['style-loader','css-loader']
  	  }, 
  	  {
  	  	test: /\.(png|svg|jpg|gif)$/,
  	  	use: ['file-loader']
  	  },
  	  {
  	  	test: /\.(woff|woff2|eot|ttf|otf)$/,
  	  	use: ['file-loader']
  	  },
			{
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
					// .babelrc instead of below
          // options: {
          //   presets: ['env']
          // }
        }]
			}
  	]
  }
};
