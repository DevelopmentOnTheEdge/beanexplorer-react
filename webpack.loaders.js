module.exports = [

    {
      test: /(\.jsx|\.js)$/,
      query: {
        presets: ['@babel/env', '@babel/react']
      },
      exclude: /(node_modules|bower_components|public\/)/,
      loader: "babel-loader"
    },
    {
      test: /\.css$/,
      use: ['style-loader',{loader: 'css-loader', options: {importLoaders: '1'}}],
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "file-loader"
    },
    {
      test: /\.(woff|woff2)$/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader",
      options: {prefix: 'font', limit: 5000}
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader",
      options: {limit:"10000",mimetype:"application/octet-stream"}
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader",
      options: {limit:"10000",mimetype:"image/svg+xml"}

    },
    {
      test: /\.gif/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader",
      options: {limit:"10000",mimetype:"image/gif"}

    },
    {
      test: /\.jpg/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader",
      options: {limit:"10000",mimetype:"image/jpg"}
    },
    {
      test: /\.png/,
      exclude: /(node_modules|bower_components)/,
      loader: "url-loader",
      options: {limit:"10000",mimetype:"image/png"}

    }
];
