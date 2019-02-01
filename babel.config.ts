module.exports = function(api: any) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("babel-plugin-module-resolver"),
      {
        root: ["./"],
        alias: {
          randombytes: "./randombytes" // after eject, replace with react-native-randombytes
        }
      }
    ]
  };
};
