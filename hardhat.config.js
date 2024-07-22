/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")

module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    saigon: {
      url: `https://saigon-testnet.roninchain.com/rpc`, // Saigon RPC URL
      accounts: [process.env.SAIGON_PRIVATE_KEY] // Here is where the private key is used!
    }
  }
};
