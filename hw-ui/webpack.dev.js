const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//引⼊vue-loader
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: './example/src/index.js'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    static: [
      path.resolve(__dirname, 'example/public'),
      path.resolve(__dirname, 'dist')
    ],
    port: 8080,
    host: 'localhost'
  },
  module: {
    rules: [
      // 追加vue-loader的应⽤
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'example/public/index.html'),
      filename: 'index.html',
      chunks: ['index']
    })
  ]
}