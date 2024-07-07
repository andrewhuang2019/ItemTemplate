// hardhat.config.js
require("@nomicfoundation/hardhat-ethers");
//require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
        url: "http://127.0.0.1:8545"
    }
  }
};
