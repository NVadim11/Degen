const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // Точка входа в приложение
  entry: './src/index.js',

  // Куда будут собираться файлы
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/Degen/',
    filename: 'bundle.js',
  },

  // Настройка devServer для разработки
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3010,
    open: true, // Автоматически открывать браузер
    hot: true,  // Включение горячей перезагрузки
    historyApiFallback: true
  },

  // Загрузчики для обработки разных типов файлов
  module: {
    rules: [
      // Для JavaScript/JSX файлов
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Для CSS файлов
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  // Плагины
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Указываем путь к HTML шаблону
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_SECRET_URL: JSON.stringify(process.env.REACT_APP_SECRET_URL),
      },
    }),
  ],

  // Разрешаем использовать расширения .js и .jsx
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
