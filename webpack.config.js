const path = require("path");

module.exports = {
  entry: {
    suavecito: "./src/index.js", //sitewide JavaScript file
    membershipApplication: "./src/membership-application.js",
  },
  devtool: "source-map",
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "theme/assets"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-transform-async-to-generator",
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      },
    ],
  },
};
