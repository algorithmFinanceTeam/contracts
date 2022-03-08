// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//NRT is like a private stock
//can only be traded with the issuer who remains in control of the market
//until he opens the redemption window
contract NRT is Ownable {
    uint256 private _issuedSupply;
    uint256 private _outstandingSupply;
    uint256 private _decimals;
    string private _symbol;
    IERC20 public _usdt;


    mapping(address => uint256) private _balances;

    event Issued(address account, uint256 amount);
    event Redeemed(address account, uint256 amount);

    constructor(address usdtAddress,string memory __symbol, uint256 __decimals) {
        _symbol = __symbol;
        _decimals = __decimals;
        _usdt = IERC20(usdtAddress);

        _issuedSupply = 0;
        _outstandingSupply = 0;
    }

    // Creates amount NRT and assigns them to account
    function issue(address account, uint256 amount) public onlyOwner {
        require(account != address(0), "zero address");

        _issuedSupply += amount;
        _outstandingSupply += amount;
        _balances[account] += amount;

        emit Issued(account, amount);
    }

    //redeem, caller handles transfer of created value
    function redeem(address account, uint256 amount) public onlyOwner {
        require(account != address(0), "zero address");
        require(_balances[account] >= amount, "Insufficent balance");

        _balances[account] -= amount;
        _outstandingSupply -= amount;

        emit Redeemed(account, amount);
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint256) {
        return _decimals;
    }

    function issuedSupply() public view returns (uint256) {
        return _issuedSupply;
    }

    function outstandingSupply() public view returns (uint256) {
        return _outstandingSupply;
    }
}

contract Funding {
    IERC20 public _usdt;
    // the certificate
    NRT public nrt;

    constructor(address usdtAddress) {
        _usdt = IERC20(usdtAddress);
        nrt = new NRT(usdtAddress,"aALG", 9);
    }

    function invest() public payable {
        uint256 amount = msg.value;
        require(amount > 0, "You need to send at least some tokens");
        address from = msg.sender;
        _usdt.transferFrom(from, address(this), amount);
        nrt.issue(msg.sender, amount);
    }
}
