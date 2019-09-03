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

const wepackConfig = {
  mode: process.env.NODE_ENV,
  entry: isProd ? {
  	docs: './examples/entry.js'
  } : './examples/entry.js',
  output: {
  	path: path.resolve(process.cwd(), './examples/element-ui/'),
  	publicPath: '',
  	filename: '[name].[hash:7].js',
  	chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js'
  }
}

module.exports = webpackConfig;