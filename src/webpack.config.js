module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules\/bootstrap/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true } },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
