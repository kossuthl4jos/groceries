import path from 'path';
import dotenv from 'dotenv';
import webpack, { EnvironmentPlugin } from 'webpack';

import HtmlPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';

dotenv.config();

const IS_DEV = process.env.NODE_ENV === 'development';

let progress: string;

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
  plugins: [
    new HtmlPlugin({ filename: 'index.html', template: 'public/index.html' }),
    new EnvironmentPlugin(['NODE_ENV', 'WEBPACK_PORT', 'BACKEND', 'REMOTE_BACKEND_HOST']),
    new webpack.ProgressPlugin((percentage, message) => {
      const currentProgress = `${(percentage * 100).toFixed()}% ${message}`;
      if (progress !== currentProgress) {
        console.log(currentProgress);
        progress = currentProgress;
      }
    }),
  ],
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
              name: IS_DEV ? 'css/[name].[ext]' : 'css/[contenthash].[ext]',
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
            name: IS_DEV ? 'images/[name][hash].[ext]' : 'images/[contenthash].[ext]',
          },
        },
      },
    ],
  },
};

export default baseConfig;
