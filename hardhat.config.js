const { owner } = require("./secrets.json");

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "hardhat",
  paths: {
    artifacts: "../../apps/frontend/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      chainId: 80001,
      gasPrice: 20000000000,
      accounts: [owner],
    },
    mainnet: {
      url: "https://polygon-rpc.com/",
      chainId: 137,
      gasPrice: 100000000000,
      accounts: { mnemonic: owner },
      timeout: 60000
    },
  },
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  // etherscan: {
  //   apiKey: POLYGON_API_KEY,
  // },
};
