/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// переменные окружения node js
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;
const jsLoader = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  }];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};


module.exports = {
  // место где лежат все исходники
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: isDev ? 'source-map' : false,
  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
    hot: isDev,
    hotOnly: isDev
  },
  module: {
    rules: [
    //   {
    //     test: /\.html$/,
    //     loader: 'raw-loader',
    //   },
      {
        test: /\.s[ac]ss$/i,
        use:
					[
					  {
					    loader: MiniCssExtractPlugin.loader,
					    options: {
					      hmr: isDev,
					      reloadAll: true,
					    }
					  },
					  'css-loader',
					  'sass-loader',
					],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoader(),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      removeComments: isProd,
      collapseWhiteSpace: isProd,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
};
