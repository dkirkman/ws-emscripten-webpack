const path = require('path');

module.exports = {
  entry: {
    main: './build/index.mjs'
//    vendor: []
  },
  devtool: 'sourcemap',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'EmscriptenWebpack',
    chunkFilename: '[name]-[contenthash].js'
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

  target: 'web',
  node: {
    __dirname: false,
    fs: 'empty',
    Buffer: false,
    process: false
  }
};
