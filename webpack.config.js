const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { SourceMapDevToolPlugin } = require('webpack')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    rules: [
      {
        test: /\.pug?$/,
        use: ['pug-loader']
      },
      {
        test: /\.js?$/,
        exclude: [/node_modules/, /\.(test|spec).js?$/],
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gltf|glsl|frag|vert|bin)?$/,
        loader: 'file-loader'
      }
    ]
  },

  devtool: 'source-map',

  devServer: {
    historyApiFallback: true,
    public: 'localhost:8080',
    host: '0.0.0.0',
    hot: true
  },

  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.pug')
    }),
    new SourceMapDevToolPlugin({})
  ]
}
