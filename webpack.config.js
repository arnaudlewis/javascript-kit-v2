var webpack = require('webpack'),
    path = require('path'),
    yargs = require('yargs');
 
var libraryName = 'prismic-javascript',
    plugins = [],
    outputFile;
 
if (yargs.argv.p) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}
 
var config = {
  entry: [
    __dirname + '/src/index.ts'
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          emitErrors: true,
          failOnHint: true
        }
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  externals: [{
    "isomorphic-fetch": {
      root: 'isomorphic-fetch',
      commonjs2: 'isomorphic-fetch',
      commonjs: 'isomorphic-fetch',
      amd: 'isomorphic-fetch'
    }
  }],
  resolve: {
    alias:{
      "@root": path.resolve( __dirname, './src' )
    },
    extensions: ['.ts']
  },
  plugins: plugins
};
 
module.exports = config;