import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { join } from 'path';
import autoprefixer from 'autoprefixer';
import path from 'path';
import webpack from 'webpack';

export default {

  devtool: '#source-map',

  entry: {
    index: './client/index.js',
  },

  output: {
    filename: '[name].js',
    path: join(__dirname, './dist'),
    publicPath: '/static/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]'
        ),
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'css-loader?sourceMap'
        ),
      },
    ],
    postcss:[autoprefixer({browsers:['last 2 versions']})]
  },

  plugins: [
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
        'process.env': {NODE_ENV: '"production"'}
    })
  ],
};
