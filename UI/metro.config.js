const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const reactAriaShim = require.resolve("./react-dom-shim.js");

config.resolver.extraNodeModules = {
  "@react-aria/utils": reactAriaShim,
  "@react-aria/ssr": reactAriaShim,
  "@react-aria/checkbox": reactAriaShim,
  "@react-aria/focus": reactAriaShim,
  "@react-aria/interactions": reactAriaShim,
  "@react-aria/radio": reactAriaShim,
  "@react-aria/toggle": reactAriaShim,
  "@react-aria/visually-hidden": reactAriaShim,
  "@react-stately/toggle": reactAriaShim,
  "@react-stately/checkbox": reactAriaShim,
  "@react-stately/radio": reactAriaShim,
  "@gluestack-ui/utils/aria": reactAriaShim, // ← add this
};

module.exports = withNativeWind(config, { input: "./global.css" });
