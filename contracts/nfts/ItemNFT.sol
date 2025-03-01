// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract ItemNFT is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    uint256 private _nextTokenId;
    
    event Mint(address to, uint256 tokenId, string url);
    event TokenURISet(uint256 tokenId, string uri);

    constructor(address initialOwner)
        ERC721("ItemNFT", "INT")
        Ownable(initialOwner)
    {
        transferOwnership(initialOwner); 
        _nextTokenId = 1;
    }

    function safeMint(address to, string memory uri) 
    public  
    onlyOwner
    returns(address)
    {
        uint256 tokenId = _nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _nextTokenId++;

        emit Mint(to, tokenId, uri);
        return to;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function getTotalTokens() public view returns (uint256) {
        return _nextTokenId;
    }

    function setTokenURI(uint256 tokenId, string memory uri) 
        public
        onlyOwner
    {
        _setTokenURI(tokenId, uri);
        emit TokenURISet(tokenId, uri);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns(bool)
    {
        return super.supportsInterface(interfaceId);
    }

}