import {} from "@cosmjs/stargate";
import { executeKdf, extractKdfConfiguration } from "@cosmjs/amino";
import {} from "@cosmjs/tendermint-rpc";

async function keyStorePut(password) {
  const kdfParams = {
    algorithm: "argon2id",
    params: {
      outputLength: 32,
      opsLimit: 5000,
      memLimitKib: 15 * 1024,
    },
  };
  const encryptionKey = await executeKdf(password, kdfParams);
}

async function keyStoreGet(serialized) {
  const kdfConfig = extractKdfConfiguration(serialized);
  const encryptionKey = await executeKdf(serialized, kdfConfig);
}
