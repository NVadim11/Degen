const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,  // For regular CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,  // For SCSS/SASS files
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,  // Handle image files
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',  // Output to /images folder
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_SECRET_URL: JSON.stringify(process.env.REACT_APP_SECRET_URL),
      },
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',  // Explicitly specify the .js extension
      Buffer: ['buffer', 'Buffer'],
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      zlib: require.resolve('browserify-zlib'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify'),
      url: require.resolve('url'),
      path: require.resolve('path-browserify'),
      vm: require.resolve('vm-browserify'),
      // Explicitly adding '.js' extension for process/browser
      process: require.resolve('process/browser.js'),
    },
  },
};
