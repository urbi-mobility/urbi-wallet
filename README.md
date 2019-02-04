# urbi wallet

A proof of concept eth wallet built with React Native (using Expo as long as we can!)

## Tricks, wizardry, and black magic

In order to use web3.js, we need a few node.js modules (which aren't by default available in the React Native environment).
Hence, we use `rn-cli.config.js` (loaded via `babel.config.ts`) and `globals.ts` to make web3.js pick up modules from `node-libs-react-native` and `vm-browserify`.
We also use a random bytes implementation taken from [this repo][1], so that we don't need to use `react-native-crypto` (which uses native libraries, and thus can't be used within Expo).

## Known issues (will try to keep this up to date)

At the moment, we can't really catch errors raised by the web3.js library, so when you're debugging it's RSOD-fest! Also, it looks like some types of errors completely break React Native's bridge, so you have no other choice but to reload the app. He. Example: try loading a wrong ws address. It will stop responding to UI actions. Neat!

[1]: https://github.com/agrcrobles/babel-preset-react-native-web3
