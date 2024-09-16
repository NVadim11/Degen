const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Точка входа в приложение
  entry: './src/index.js',

  // Куда будут собираться файлы
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Очистка предыдущей сборки
    publicPath: 'Degen'
  },

  // Настройка devServer для разработки
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true, // Автоматически открывать браузер
    hot: true,  // Включение горячей перезагрузки
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
  ],

  // Разрешаем использовать расширения .js и .jsx
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
