var path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "global.GENTLY": false
    }),
    new Dotenv({
      path: path.resolve(__dirname, "./.env.local")
    }),
    new webpack.ContextReplacementPlugin(/.*/)
  ],
  optimization:{
  	minimize: false
  }
};
