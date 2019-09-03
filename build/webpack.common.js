const path = require('path');
// 显示进程的完成进度
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = require('./config');

module.exports = {
	mode: 'production',
	entry: {
		app: ['./src/index.js']
	},
	output: {
		// cwd是指当前node命令执行时所在的文件夹目录；
		// __dirname是指被执行js文件所在的文件夹目录
		path: path.resolve(process.cwd(), './lib'),
		publicPath: '/dist/',
		filename: 'w-ui.common.js',
		chunkFilename: '[id].js',

	}
}