// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, Ownable(msg.sender) {
    uint256 public tokenCounter;

    // Constructor initializes both ERC721 and Ownable
    constructor() ERC721("MyNFT", "NFT") {
        tokenCounter = 0;
    }

    // This function can only be called by the owner
    function mintNFT(address recipient) public onlyOwner returns (uint256) {
        uint256 tokenId = tokenCounter;
        _safeMint(recipient, tokenId);
        tokenCounter++;
        return tokenId;
    }
}
