import path from 'path';

import HtmlPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';

const baseConfig: Configuration = {
  mode: 'development',
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx'],
    symlinks: false,
    modules: ['node_modules', 'vendor'],
  },
  entry: { app: ['./src/index.ts'] },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  plugins: [new HtmlPlugin({ filename: 'index.html', template: 'public/index.html' })],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
              compilerOptions: {
                noUnusedLocals: true,
                noUnusedParameters: true,
                module: 'ESNext',
              },
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'css/[name].[ext]',
            },
          },
          'extract-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            esModule: false,
            name: 'images/[name][hash].[ext]',
          },
        },
      },
    ],
  },
};

export default baseConfig;
