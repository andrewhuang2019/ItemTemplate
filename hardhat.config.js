/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")

const SAIGON_PRIVATE_KEY = '315de8fd878e73a8c25b9367277d3f94b60d5937354cfac4375a647dc8bbaac9'; // Copy and paste private key here! Don't share outside of this project!

module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    saigon: {
      url: `https://saigon-testnet.roninchain.com/rpc`, // Saigon RPC URL
      accounts: [SAIGON_PRIVATE_KEY] // Here is where the private key is used!
    }
  }
};
