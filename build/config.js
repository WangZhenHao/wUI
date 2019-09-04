const path = require('path');
// Easily exclude node modules in Webpack
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');

var externals = {};

Object.keys(Components).forEach(function(key) {
	externals[`element-ui/packages/${key}`] = `element-ui/lib/${key}`;
}) 

externals = [Object.assign({
	vue: 'vue'
}, externals), nodeExternals()]

exports.externals = externals;

exports.vue = {
	root: 'Vue',
	commonjs: 'vue',
	commonjs: 'vue',
	amd: 'vue'
}

exports.alias = {
	main: path.resolve(__dirname, '../src'),
	packages: path.resolve(__dirname, '../packages'),
	examples: path.resolve(__dirname, '../examples'),
	'element-ui': path.resolve(__dirname, '../')
}

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;