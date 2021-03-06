import webpackBaseConfig from './webpack.base.config';

webpackBaseConfig.devtool = 'cheap-module-source-map';

webpackBaseConfig.devServer = {
  host: '0.0.0.0',
  port: 3000,
  historyApiFallback: true,
  clientLogLevel: 'silent',
  stats: 'errors-only',
  hot: true,
  inline: true,
  overlay: false,
  noInfo: true,
};

export default webpackBaseConfig;
