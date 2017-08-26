var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': "'development'"
        }
      }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
    //,     new ExtractTextPlugin(./dist/style.css)
  ],
  module: {
    loaders: [
      // js
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'client')
      },
      // CSS
      { 
        test: /\.styl$|\.css$/, 
        include: path.join(__dirname, 'client'),
        loader: 'style-loader!css-loader?modules!stylus-loader'
      },
      //Typography NB: Using file-loader instead of url-loader
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        loader: 'file-loader'
      },
      //Images
      { 
        test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=100000' 
      }
    ]
  }
};