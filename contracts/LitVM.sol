// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LitVM is ERC20, Ownable {
    constructor() ERC20("LitVM", "LITVM") Ownable(msg.sender) {
        _mint(msg.sender, 100_000_000 * 10 ** decimals()); // 100 Juta supply
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
