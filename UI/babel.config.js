module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo"], "nativewind/babel"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "tailwind.config": "./tailwind.config.js",
            "react-dom": "./react-dom-shim",
          },
        },
      ],
      ["module:react-native-dotenv"],
    ],
  };
};
