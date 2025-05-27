import path from 'node:path';

import webpack, { Configuration } from 'webpack';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import sharedConfig from '../../webpack.config';

export default merge<Configuration>(sharedConfig, {
  entry: './src/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
    clean: false,
  },
  plugins: [
    new webpack.IgnorePlugin({
      checkResource(resource: string) {
        const lazyImports: Array<string> = [
          'class-validator',
          'class-transformer',
          '@nestjs/microservices',
          '@nestjs/websockets/socket-module',
          '@nestjs/microservices/microservices-module',
        ];

        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource, {
            paths: [process.cwd()],
          });
        } catch {
          return true;
        }
        return false;
      },
    }),
  ],
});
