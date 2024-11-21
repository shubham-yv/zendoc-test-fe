const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    static: path.join(__dirname, 'dist'),
    allowedHosts: [
      'wellnestperu.com',
      '.wellnestperu.com'
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.mjs'], // Include .mjs here
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/, // Update to include .mjs
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'] 
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:7][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:7][ext]'
        }
      },
      {
        test: /\.mjs$/, // Add this rule to handle .mjs files
        include: /node_modules/,
        type: 'javascript/auto',
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
