module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@src": "./src",
            "@theme": "./src/theme",
            "@screens": "./src/screens",
            "@assets": "./assets",
          },
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
