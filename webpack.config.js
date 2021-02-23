import Webpack from "webpack";

import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
  entry: "./index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: `all`,
      cacheGroups: {
        default: false,
        defaultVendors: false,
        styles: {
          test(module) {
            return module.type === `css/mini-extract`;
          },

          name: `main`,
          priority: 40,
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
