const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { postCSSPlugins } = require('cssnano');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', function () {
      fse.copySync('./app/assets/images', './dist/assets/images');
    });
  }
}

let cssConfig = {
  // Apply rule for .sass, .scss or .css files
  test: /\.(sa|sc|c)ss$/,

  // Set loaders to transform files.
  // Loaders are applying from right to left(!)
  // The first loader will be applied after others
  use: [
    {
      // This loader resolves url() and @imports inside CSS
      loader: 'css-loader?url=false',
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [['cssnano'], ['autoprefixer']],
        },
        sourceMap: true,
      },
    },
    {
      // First we transform SASS to standard CSS
      loader: 'sass-loader',
      options: {
        implementation: require('sass'),
      },
    },
  ],
};
let pages = fse
  .readdirSync('./app')
  .filter(function (file) {
    return file.endsWith('.html');
  })
  .map(function (page) {
    return new HtmlWebpackPlugin({
      filename: page,
      template: `./app/${page}`,
    });
  });
let config = {
  entry: './app/assets/scripts/App.js',
  plugins: pages,
  module: {
    rules: [
      cssConfig,
      {
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            // Using file-loader for these files
            loader: 'file-loader',

            // In options we can set different things like format
            // and directory to save
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
      {
        // Apply rule for fonts files
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            // Using file-loader too
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
};

if (currentTask == 'build') {
  cssConfig.use.unshift(MiniCssExtractPlugin.loader);
  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  }),
    (config.output = {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist'),
    });

  config.mode = 'production';
  config.optimization = {
    splitChunks: { chunks: 'all' },
  };
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new RunAfterCompile()
  );
}

if (currentTask == 'dev') {
  cssConfig.use.unshift('style-loader');
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app'),
  };

  config.devServer = {
    before: function (app, server) {
      server._watch('./app/**/*.html');
    },
    contentBase: path.join(__dirname, 'app'),
    hot: true,
    port: 3000,
    host: '0.0.0.0',
  };
  config.mode = 'development';
}

module.exports = config;
