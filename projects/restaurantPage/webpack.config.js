const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
      home: "./src/homePage.js",
      menu: "./src/menuPage.js",
      about: "./src/aboutPage.js",
      contact: "./src/contactPage.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Home ",
            filename: "homePage.html",
            template: "src/homePage.html",
            chunks: ["home"],
        }),
        new HtmlWebpackPlugin({
            title: "Menu",
            filename: "menuPage.html",
            template: "src/menuPage.html",
            chunks: ["menu"],
        }),
        new HtmlWebpackPlugin({
            title: "About",
            filename: "aboutPage.html",
            template: "src/aboutPage.html",
            chunks: ["about"],
        }),
        new HtmlWebpackPlugin({
            title: "Contact",
            filename: "contactPage.html",
            template: "src/contactPage.html",
            chunks: ["contact"],
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
          ],
    },
};