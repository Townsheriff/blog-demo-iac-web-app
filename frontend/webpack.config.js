const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (_, args) => {
  if (args.mode === "production") {
    return createProductionConfig();
  }

  return createDevelopmentConfig({
    devServerPort: 4000,
  });
};

const createDevelopmentConfig = (config) => {
  return {
    entry: "./src/index.tsx",
    mode: "development",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    devServer: {
      port: config.devServerPort,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
    ],
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
  };
};

const createProductionConfig = () => {
  return {
    entry: "./src/index.tsx",
    mode: "production",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
    ],
  };
};
