/*
 * This file is a typescript-ified version of https://github.com/novalabio/react-native-bip39
 * using our randombytes implementation, and crypto-browserify (imported as 'crypto', check out
 * rn-cli.config.js to see where the name resolution happens)
 */
import * as assert from "assert";
import { pbkdf2Sync as pbkdf2 } from "pbkdf2";
import * as unorm from "unorm";
import DEFAULT_WORDLIST from "./wordlist.json";
import { createHash } from "crypto";

const randomBytes = require("../randombytes");

export const mnemonicToSeed = (mnemonic: string, password: string) => {
  const mnemonicBuffer = new Buffer(mnemonic, "utf8");
  const saltBuffer = new Buffer(salt(password), "utf8");

  return pbkdf2(mnemonicBuffer, saltBuffer, 2048, 64, "sha512");
};

export const mnemonicToSeedHex = (mnemonic: string, password: string) =>
  mnemonicToSeed(mnemonic, password).toString("hex");

export const mnemonicToEntropy = (mnemonic: string, wordlist: string[]) => {
  wordlist = wordlist || DEFAULT_WORDLIST;

  const words = mnemonic.split(" ");
  assert(words.length % 3 === 0, "Invalid mnemonic");

  const belongToList = words.every(word => wordlist.indexOf(word) > -1);
  assert(belongToList, "Invalid mnemonic");

  // convert word indices to 11 bit binary strings
  const bits = words
    .map(word => {
      const index = wordlist.indexOf(word);
      return lpad(index.toString(2), "0", 11);
    })
    .join("");

  // split the binary string into ENT/CS
  const dividerIndex = Math.floor(bits.length / 33) * 32;
  const entropy = bits.slice(0, dividerIndex);
  const checksum = bits.slice(dividerIndex);

  // calculate the checksum and compare
  const entropyBytes = entropy.match(/(.{1,8})/g)!.map(bin => parseInt(bin, 2));
  const entropyBuffer = new Buffer(entropyBytes);
  const newChecksum = checksumBits(entropyBuffer);

  assert(newChecksum === checksum, "Invalid mnemonic checksum");

  return entropyBuffer.toString("hex");
};

export const entropyToMnemonic = (entropy: string, wordlist: string[]) => {
  wordlist = wordlist || DEFAULT_WORDLIST;

  const entropyBuffer = new Buffer(entropy, "hex");
  const entropyBits = bytesToBinary([].slice.call(entropyBuffer));
  const checksum = checksumBits(entropyBuffer);

  const bits = entropyBits + checksum;
  const chunks = bits.match(/(.{1,11})/g);

  const words = chunks!.map(binary => wordlist[parseInt(binary, 2)]);

  return words.join(" ");
};

export const generateMnemonicNatively = (
  strength: number,
  rng: (
    size: number,
    cb: (error: string, randomBytesBuffer: Buffer) => void
  ) => Promise<string>,
  wordlist: string[]
) =>
  new Promise((resolve, reject) => {
    strength = strength || 128;
    rng = rng || randomBytes;

    rng(strength / 8, (error, randomBytesBuffer) => {
      if (error) {
        reject(error);
      } else {
        resolve(entropyToMnemonic(randomBytesBuffer.toString("hex"), wordlist));
      }
    });
  });

export const generateMnemonic = (
  strength: number,
  wordlist: string[] = DEFAULT_WORDLIST
) =>
  entropyToMnemonic(
    randomBytes((strength || 128) / 8).toString("hex"),
    wordlist
  );

export const validateMnemonic = (
  mnemonic: string,
  wordlist: string[] = DEFAULT_WORDLIST
) => {
  try {
    mnemonicToEntropy(mnemonic, wordlist);
  } catch (e) {
    return false;
  }
  return true;
};

export const checksumBits = (entropyBuffer: Buffer) => {
  const hash = createHash("sha256")
    .update(entropyBuffer)
    .digest();

  // Calculated constants from BIP39
  const ENT = entropyBuffer.length * 8;
  const CS = ENT / 32;

  return bytesToBinary([].slice.call(hash)).slice(0, CS);
};

const salt = (password: string) => `mnemonic${unorm.nfkd(password) || ""}`;

//=========== helper methods from bitcoinjs-lib ========

const bytesToBinary = (bytes: number[]) =>
  bytes.map(x => lpad(x.toString(2), "0", 8)).join("");

const lpad = (str: string, padString: string, length: number) => {
  while (str.length < length) str = padString + str;
  return str;
};
