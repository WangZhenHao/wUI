const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebapckPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = require('./config');

const isProd = process.env.NODE_ENV === 'production';

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: isProd ? {
  	docs: './examples/entry.js'
  } : './examples/entry.js',
  output: {
  	path: path.resolve(process.cwd(), './examples/element-ui/'),
  	publicPath: '',
  	filename: '[name].[hash:7].js',
  	chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js'
  },
  resolve: {
  	extensions: ['.js', '.vue', '.json'],
  	alias: config.alias,
  	modules: ['node_modules']
  },
  devServer: {
  	host: '0.0.0.0',
  	port: 8085,
  	publicPath: '/',
  	hot: true
  },
//   performance.hints 
// false | "error" | "warning"

// 打开/关闭提示。此外，当找到提示时，告诉 webpack 抛出一个错误或警告。此属性默认设置为 "warning"。
  performance: {
  	hints: false
  },
  // 如果你不希望使用 quiet 或 noInfo 这样的不显示信息，而是又不想得到全部的信息，只是想要获取某部分 bundle 的信息，使用 stats 选项是比较好的折衷方式。
  stats: {
  	children: false
  },
  module: {
   rules: [
   	// {
   	// 	enforce: 'pre',
   	// 	test: /\.(vue|jsx?)$/,
   	// 	exclude: '/node_modules/',
   	// 	loader: 'eslint-loader'
   	// },
   	{
   		test: /\.(jsx?|babel|es6)$/,
   		include: process.cwd(),
   		exclude: config.jsexclude,
   		loader: 'babel-loader'
   	},
   	{
   		test: /\.vue$/,
   		loader: 'vue-loader',
   		options: {
   			compilerOptions: {
   				preserveWhitespace: false
   			}
   		}
   	},
   	{
   		test: /\.(scss|css)$/,
   		use: [
   			isProd ? MiniCssExtractPlugin.loader : 'style-loader',
   			'css-loader',
   			'sass-loader'
   		]
   	},
   	{
   		test: /\.md$/,
   		use: [
   			{
   				loader: 'vue-loader',
   				options: {
   					compilerOptions: {
   						preserveWhitespace: false
   					}
   				}
   			},
   			{
   				loader: path.resolve(__dirname, './md-loader/index.js')
   			}
   		]
   	},
   	{
   		test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
   		loader: 'url-loader',
   		query: {
   			limit: 10000,
   			name: path.posix.join('status', '[name].[hash:7].[ext]')
   		}
   	}
   ]
  },
  plugins: [
  	new webpack.HotModuleReplacementPlugin(),
  	new HtmlWebapckPlugin({
  		template: './examples/index.tpl',
  	}),
  	new CopyWebpackPlugin(),
  	new VueLoaderPlugin(),
  	new webpack.LoaderOptionsPlugin({
  		vue: {
  			compilerOptions: {
  				preserveWhitespace: false
  			}
  		}
  	}),
  	
  ],
  optimization: {
    minimizer: []
  },
  devtool: '#eval-source-map'
}

module.exports = webpackConfig;

