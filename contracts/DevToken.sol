// contracts/DevToken.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DevToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Developer", "DEV") {
        _mint(msg.sender, initialSupply);
    }

    function decmials() public view virtual returns (uint8) {
        return 18;
    }
}