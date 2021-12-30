import * as Crypto from "expo-crypto";

const getHashedValue = async (param: string): Promise<string> => {
  const hashedUri = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    param
  );
  return hashedUri;
};

export { getHashedValue };
