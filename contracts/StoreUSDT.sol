// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StoreUSDT {
    IERC20 public _usdt;
    mapping(address => uint256) private _holders;

    constructor(address usdtAddress) {
        _usdt = IERC20(usdtAddress);
    }


    function receiveUSDT(uint256 amount) public payable {
        uint256 amount = msg.value;
        require(amount > 0, "You need to send at least some tokens");
        address from = msg.sender;

        _usdt.transferFrom(from, address(this), amount);
        uint256 preBalance = _holders[from];
        _holders[from] = preBalance + amount;
    }
}
