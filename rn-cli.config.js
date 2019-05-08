const nodeLibs = require("node-libs-react-native");
nodeLibs.vm = require.resolve("vm-browserify");
nodeLibs.crypto = require.resolve("react-native-crypto");

module.exports = {
  resolver: {
    extraNodeModules: nodeLibs
  }
};
