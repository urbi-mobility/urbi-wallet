import * as lightwallet from "eth-lightwallet";
import { keystore } from "eth-lightwallet";

export const signMsg = (
  ks: keystore,
  pwDerivedKey: Uint8Array,
  msg: string,
  address: string
) => {
  const signature = lightwallet.signing.signMsg(
    ks,
    pwDerivedKey,
    `\x19Ethereum Signed Message:\n${msg.length}${msg}`,
    address
  );

  return lightwallet.signing.concatSig(signature);
};

export interface UrbiKeyStore {
  lightwalletKeystore: keystore;
  address: string;
  pwDerivedKey: Uint8Array;
}

export const createKeystore = (mnemonic: string, password: string) =>
  new Promise<UrbiKeyStore>((resolve, reject) => {
    lightwallet.keystore.createVault(
      {
        hdPathString: "m/44'/60'/0'/0",
        seedPhrase: mnemonic,
        password
      },
      (err, ks) => {
        if (err) reject(err);

        ks.keyFromPassword(password, (err2, pwDerivedKey) => {
          if (err2) reject(err2);

          ks.generateNewAddress(pwDerivedKey, 1);
          const addresses = ks.getAddresses();
          resolve({
            lightwalletKeystore: ks,
            address: addresses[0],
            pwDerivedKey
          });
        });
      }
    );
  });
