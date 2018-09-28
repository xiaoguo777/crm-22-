const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const fs = require("fs");
const path = require("path");
const package = require("../package.json");

fs.open("./build/env.js", "w", function(err, fd) {
  const buf = 'export default "development";';
  fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
  devtool: "eval-source-map",
  plugins: [
    new ExtractTextPlugin({
      filename: "css/[name].css",
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vender-exten", "vender-base"],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      title: "iView admin v" + package.version,
      filename: "index.html",
      template: '!!ejs-loader!./src/template/index.ejs',
      inject: false
    })
  ]
});
