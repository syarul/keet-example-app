const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  target: 'web',
  node: {
    fs: 'empty'
  },
  entry: [
    './src/app.js',
    './view/layout.pug'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [/node_modules/, /keet/, /test/],
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        use:  ['html-loader', 'pug-html-loader?pretty&exports=false']
      },
      { test: /\.styl$/, 
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader', 
          use: [
            'css-loader',
            'stylus-loader'
          ]
        })
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js', '.styl'],
    alias: {
      components: path.resolve(__dirname, './src/components'),
      stores: path.resolve(__dirname, './src/stores'),
      ui: path.resolve(__dirname, './src/ui'),
      styles: path.resolve(__dirname, './src/styles'),
      utils: path.resolve(__dirname, './src/client-utils'),
      keet: path.resolve(__dirname, './keet/keet'),
      router: path.resolve(__dirname, './src/router'),
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'index.html',
      template: path.join('view', 'layout.pug'),
    }),
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
        test: /\.styl$/, 
        options: {
          stylus: {
            // use: [rupture(), koutoSwiss(), jeet(), mdiStylus()],
            // sourceMap: true
            compress: true
          }
        }
    }),
    // new CopyWebpackPlugin(filesToCopy, {
    //   debug: 'warning'
    // }),
  ],
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    // contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
    // compress: true, // enable gzip compression
    // historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    // https: false, // true for self-signed, object for cert authority
    // noInfo: true, // only errors & warns on hot reload
    inline: true,
    historyApiFallback: true
  },
  devtool: 'source-map',//'#eval-source-map',
  // stats : {
  //   assets : true,
  //   excludeAssets : [/.*src\/.*/ , /.*statics\/.*/],
  // }
}

if (process.env.NODE_ENV === 'production') {
  console.log('on production mode')

  delete config.devtool

  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
      ie8: false,
      ecma: 8,
      mangle: true,
      output: {
        comments: false,
        beautify: false
      },
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      },
      warnings: false
    }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ])
}

module.exports = config