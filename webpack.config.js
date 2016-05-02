var path = require('path');

var CLIENT_DIR = path.resolve(__dirname, 'client');
var SERVER_DIR = path.resolve(__dirname, 'server/generated');
var DIST_DIR = path.resolve(__dirname, 'dist');

var loaders = [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.jsx$/,
                loader: 'jsx-loader?harmony'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, {
                test: /\.less$/,
                loader: "style!css!less"
            },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            {
                test: /node_modules\/auth0-lock\/.*\.js$/,
                loaders: [
                    'transform-loader?brfs',
                    'transform-loader?packageify'
                ]
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ];

module.exports = [{
  name: 'client',
  target: 'web',
  context: CLIENT_DIR,
  entry: './index.jsx',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: loaders
  },
  resolve: {
    alias: {
      components: path.resolve(CLIENT_DIR, 'components')
    }
  }
},
{
  name: 'server',
  target: 'node',
  context: CLIENT_DIR,
  entry: {
      app: '../src/Root.jsx'
  },
  output: {
    path: SERVER_DIR,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    loaders: loaders
  },
  resolve: {
    alias: {
      components: path.resolve(CLIENT_DIR, 'components')
    }
  }
}];