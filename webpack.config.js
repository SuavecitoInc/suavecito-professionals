const path = require("path")

module.exports = {
  entry: {
    MembershipApplication: "./src/MembershipApplication.js",
  },
  devtool: "source-map",
  mode: "development",
  output: {
    filename: "[name].js",
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
            presets: ["react-app"],
          },
        },
      },
    ],
  },
}
