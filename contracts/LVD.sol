// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LVD is ERC20, Ownable {
    // Total supply dipatenkan di angka 100 Juta Token saat deploy
    constructor() ERC20("LitVM Dex", "LVD") Ownable(msg.sender) {
        _mint(msg.sender, 100_000_000 * 10 ** decimals()); 
    }

    // Fungsi mint eksternal DIHAPUS TOTAL agar tidak ada yang bisa mencetak token lagi selamanya
}
