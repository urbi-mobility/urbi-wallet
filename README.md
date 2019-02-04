# urbi wallet

A proof of concept eth wallet built with React Native (using Expo as long as we can!)

## Trick, wizardry, and black magic

In order to use web3.js, we need a few node.js modules (which aren't by default available in the React Native environment).
Hence, we use `rn-cli.config.js` (loaded via `babel.config.ts`) and `globals.ts` to make web3.js pick up modules from `node-libs-react-native` and `vm-browserify`.
We also use a random bytes implementation taken from [this repo][1], so that we don't need to use `react-native-crypto` (which uses native libraries, and thus can't be used within Expo).

[1]: https://github.com/agrcrobles/babel-preset-react-native-web3
