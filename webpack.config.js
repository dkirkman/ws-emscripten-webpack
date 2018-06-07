const path = require('path');

module.exports = {
  entry: './stage/index.js',
  devtool: 'sourcemap',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2' 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'stage'),
        exclude: /(node_modules|bower_components|build|src)/,
        loader: 'babel-loader'
      },

      { 
        test: /\.wasm$/,
        type: 'javascript/auto',
        loader: 'file-loader'
      }
    ]
  },
  externals: {
    'react': 'commonjs react' 
  },
//  target: 'web'
  target: 'node'
//  , node: {
//    fs: 'empty'
//  }

  , node: {
    __dirname: false
  }

};
