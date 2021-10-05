const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',    // 절대 경로 옵션 추가
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, //노드 모듈안의 js파일은 바벨로더로 변환하지 않음
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.s?css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: './src/index.html', //웹팩이 해석해야하는 html 파일이 어디있는지 명시함
    }),
    new CopyPlugin({
      patterns: [
        { from : 'static'}
      ]
    })
  ],
  devServer:{
    historyApiFallback:true //이제 SPA 기본 페이지 index.html 파일로 설정 404 처리 관련 로컬에서만! 배포에서는 다르게!
  }
}
