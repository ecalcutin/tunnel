import path from 'node:path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import merge from 'webpack-merge';

import sharedConfig from '../../webpack.config';

export default merge<Configuration & DevServerConfiguration>(sharedConfig, {
  entry: './src/client-entry.tsx',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].bundle.js',
    clean: true,
  },

  devServer: {
    port: process.env.APP_PORT || 8080,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
});
