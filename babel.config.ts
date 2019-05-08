module.exports = function(api: any) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"]
  };
};
