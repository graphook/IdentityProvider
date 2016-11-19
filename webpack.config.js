
module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  entry: {
    manage: ['./uiSrc/manage/index'],
    login: ['./uiSrc/login/index']
  },
  output: {
    path: __dirname + '/uiBuild',
    filename: "[name].bundle.js"
  }
};
