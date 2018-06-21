const path = require('path');

module.exports = {
  entry: './build/index.mjs',
//  devtool: 'sourcemap',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'CJSCommunication',
    chunkFilename: '[name]-[id]-[contenthash].js',
  },
  module: {    
    rules: [
      { 
        test: /\.wasm$/,
        type: 'javascript/auto',
        loader: 'file-loader',
        options: {
          name: '[name]-[hash].[ext]',         
        }        
      }
    ]
  },

  target: 'webworker',
  node: {
    __dirname: false,
    fs: 'empty',
    Buffer: false,
    process: false
  }
};
