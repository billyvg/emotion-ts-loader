import path from 'path';
import { Configuration } from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';

import { SERVER_PORT, IS_DEV, WEBPACK_PORT } from './src/server/config';

const plugins = [new ManifestPlugin()];

const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const config: Configuration = {
  mode: IS_DEV ? 'development' : 'production',
  devtool: 'source-map',
  entry: ['core-js', './src/client/client'],
  output: {
    path: path.join(__dirname, 'dist', 'statics'),
    filename: `[name]-[hash:8]-bundle.js`,
    publicPath: '/statics/',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: [/node_modules/, nodeModulesPath],
      },
      {
        test: /\.tsx2$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: [/node_modules/, nodeModulesPath],
      },
      {
        test: /.jpe?g$|.gif$|.png$|.svg$|.woff$|.woff2$|.ttf$|.eot$/,
        use: 'url-loader?limit=10000',
      },
    ],
  },
  devServer: {
    port: WEBPACK_PORT,
    open: IS_DEV,
    openPage: `http://localhost:${SERVER_PORT}`,
  },
  plugins,
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};

export default config;
