// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract KGFTokens is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public owner;
    mapping (address=> bool) public whiteList;
    uint public totalSupply;

    constructor() ERC721("KGFTokens", "KGF") {
        owner = msg.sender;
        whiteList[msg.sender] = true;
        totalSupply = 3000;
    }

    function mint(string memory tokenURI)
        public
        returns (uint256)
    {
        require(whiteList[msg.sender],"not whitelist memebr");
        _tokenIds.increment();       
        uint256 newItemId = _tokenIds.current();
        require(newItemId<=totalSupply,"exceeded total Supply");
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function addToWhiteList(address member)
        public
        returns (bool)
    {
        require(msg.sender == owner, "not a owner");
        whiteList[member] = true;
        return whiteList[member];
    }
    
}