const path = require('path');

module.exports = {
  entry: './build/index.js',
  devtool: 'sourcemap',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2' 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'build'),
        exclude: /(node_modules|bower_components|build|src)/,
        loader: 'babel-loader'
      },

      { 
        test: /\.wasm$/,
        type: 'javascript/auto',
        loader: 'file-loader',
        options: {
          name: '[name]-[hash:hex:10].[ext]',         
        }
      }
    ]
  },
  externals: {
    'react': 'commonjs react' 
  },
  target: 'node',
  node: {
    __dirname: false
  }
};
