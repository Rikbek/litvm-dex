// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract veLVD {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;
    uint256 public constant WEEK = 7 days;
    uint256 public constant MAX_LOCK = 4 * 365 days; // Max 4 tahun

    struct LockInfo {
        uint256 amount;
        uint256 end;
    }

    mapping(address => LockInfo) public locks;

    event Locked(address indexed user, uint256 amount, uint256 end);
    event Withdrawn(address indexed user, uint256 amount);

    constructor(address _token) {
        token = IERC20(_token);
    }

    function createLock(uint256 _amount, uint256 _duration) external {
        require(_amount > 0, "Amount must be > 0");
        require(_duration >= WEEK && _duration <= MAX_LOCK, "Invalid lock duration");

        LockInfo storage userLock = locks[msg.sender];
        uint256 end = block.timestamp + _duration;

        require(end > userLock.end, "Cannot decrease lock time");

        token.safeTransferFrom(msg.sender, address(this), _amount);

        userLock.amount += _amount;
        userLock.end = end;

        emit Locked(msg.sender, _amount, end);
    }

    function withdraw() external {
        LockInfo storage userLock = locks[msg.sender];
        require(block.timestamp >= userLock.end, "Lock not expired");
        require(userLock.amount > 0, "No locked tokens");

        uint256 amount = userLock.amount;
        userLock.amount = 0;

        token.safeTransfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    function votingPower(address user) external view returns (uint256) {
        LockInfo memory l = locks[user];
        if (block.timestamp >= l.end) return 0;
        return (l.amount * (l.end - block.timestamp)) / MAX_LOCK;
    }
}
