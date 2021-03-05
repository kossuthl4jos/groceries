import webpackBaseConfig from './webpack.base.config';

webpackBaseConfig.devtool = 'source-map';

webpackBaseConfig.optimization = {
  runtimeChunk: { name: 'runtime' },
  splitChunks: {
    name: 'vendor',
    chunks: 'all',
  },
};

export default webpackBaseConfig;
