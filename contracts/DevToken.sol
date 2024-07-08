// contracts/DevToken.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";


contract DevToken is ERC20, ERC20Burnable, Ownable {
    constructor(address initialOwner) 
    ERC20("Developer", "DEV") 
    Ownable(initialOwner)
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decmials() public view virtual returns (uint8) {
        return 18;
    }
}