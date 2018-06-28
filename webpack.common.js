const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
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
			title: 'Title by Webpack config',
		}),
    new webpack.HotModuleReplacementPlugin(),
    new ManifestPlugin({
      fileName: 'assert.json',
      basePath: '/'
    }),
		new ExtractTextPlugin({
			filename: '[name].[hash:8].css'
		})
	],
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
  	rules: [
      {
        test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
  	  // {
  	  // 	test: /\.(png|svg|jpg|gif)$/,
  	  // 	use: ['file-loader']
  	  // },
  	  // {
  	  // 	test: /\.(woff|woff2|eot|ttf|otf)$/,
  	  // 	use: ['file-loader']
  	  // },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          name: '[hash].[ext]',
          limit: 10000,
        }
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
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        }
      }
    }
  }
};
