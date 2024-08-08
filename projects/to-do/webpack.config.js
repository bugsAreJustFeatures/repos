const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
      index: "./src/js/index.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Index",
            filename: "Index.html",
            template: "src/html/index.html",
        }),
    ],
    module: {
        rules: [
            {
              test: /\.css$/,
              use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
              ],
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: "asset/resource",
            },
          ],
    },
};