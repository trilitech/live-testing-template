// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract MessageStorage {
    string public message;

    constructor(string memory _initialMessage) {
        message = _initialMessage;
    }

    function setMessage(string calldata _newMessage) external {
        message = _newMessage;
    }
}