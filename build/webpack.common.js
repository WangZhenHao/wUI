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
    libraryExport: 'default',
    library: 'WANG',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    // 自动解析确定的扩展。默认值为：
    extensions: ['.js', '.vue', '.json'],
    // 告诉 webpack 解析模块时应该搜索的目录。
    alias: config.alias,
    // 告诉 webpack 解析模块时应该搜索的目录。
    modules: ['node_modules']
  },
  // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
  externals: config.externals,
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
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
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
  ]
}
