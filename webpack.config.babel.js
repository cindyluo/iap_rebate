import path from 'path';
import webpack from 'webpack';
import glob from 'glob';
import postcssAutoprefixer from 'autoprefixer';
import postcssClearfix from 'postcss-clearfix';

const appRoot = path.join(__dirname, 'assets/js');
const bowerRoot = path.join(__dirname, 'bower_components');
const nodeRoot = path.join(__dirname, 'node_modules');
const result = {};

glob.sync('assets/js/*.js').forEach((value) => {
  const key = value.replace('.js', '').replace('assets/js/', '');
  const filename = value.replace('assets/js/', '');
  result[key] = filename;
});

const entries = result;

export default {
  context: `${__dirname}/assets/js`,
  entry: entries,

  output: {
    path: `${__dirname}/static/js`,
    publicPath: '/static/js/',
    filename: '[name].min.js',
    chunkFilename: 'chunks/[id].chunk.js',
  },

  externals: {
    jquery: 'jQuery',
    root: [path.join(__dirname, 'bower_components')],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],

  resolve: {
    root: [appRoot, nodeRoot, bowerRoot],
    extensions: ['', '.js'],
  },

  resolveLoader: {
    root: bowerRoot,
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel?compact=false'],
      exclude: /(node_modules|build\/utils\.js)/,
      include: __dirname,
    }, {
      test: /\.scss/,
      loader: 'style!css!sass?outputStyle=expanded!postcss',
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss',
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'file?name=../images/[name].[ext]',
      exclude: /(flags|flags@2x).png$/,
    }, {
      test: /(flags|flags@2x)\.png$/,
      loader: 'file?name=../images/[name].[ext]',
    }, {
      test: /Jcrop\.gif$/,
      loader: 'file?name=../images/[name].[ext]',
    }],
  },

  postcss: () => [postcssAutoprefixer, postcssClearfix],
};
