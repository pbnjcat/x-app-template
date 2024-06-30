// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract GeoModelStorage {

    string public modelStorageUrl; //IPFS hash
    string public latitude;
    string public longitude;
    string public name;
    uint256 public price; //i.e 50 VET
    address public owner;
    uint256 public dateCreated;
    mapping(address => string) userComments; //people are able to leave comments on your model
    
    constructor(
        string memory _modelStorageUrl, 
        string memory _latitude, 
        string memory _longitude, 
        string memory _name,
        uint256 _price
    ){
        dateCreated = block.timestamp;
        owner = msg.sender;
        modelStorageUrl = _modelStorageUrl;
        latitude = _latitude;
        longitude = _longitude;
        name = _name;
        price = _price;
    }

    function addComment(string memory comment) public {
        userComments[msg.sender] = comment;
    }
}