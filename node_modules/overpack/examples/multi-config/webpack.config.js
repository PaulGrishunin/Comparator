const path = require('path');

const baseConfig = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: { loader: path.resolve(__dirname, '../lib/slowdown-loader.js') },
      },
    ],
  },
};

module.exports = [
  {
    ...baseConfig,
    name: 'App Bundle',
  },
  {
    ...baseConfig,
    name: 'Test Bundle',
  },
];
