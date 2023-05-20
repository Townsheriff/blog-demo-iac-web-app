const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = (_, args) => {
  if (args.mode === "production") {
    return createProductionConfig();
  }

  return createDevelopmentConfig();
};

const createProductionConfig = () => {
  return {
    entry: "./src/index.ts",
    target: "node",
    resolve: {
      extensions: [".ts", ".mjs", ".js"],
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: "ts-loader",
          },
          exclude: /node_modules/,
        },
      ],
    },
  };
};

const createDevelopmentConfig = () => {
  return {
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    target: "node",
    watch: true,
    resolve: {
      extensions: [".ts", ".mjs", ".js"],
    },
    plugins: [
      new NodemonPlugin({
        nodeArgs: ["--enable-source-maps"],
      }),
    ],
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
      devtoolModuleFilenameTemplate: "[absolute-resource-path]?[loaders]",
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
  };
};
