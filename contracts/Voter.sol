// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./veLVD.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Voter is Ownable {
    veLVD public immutable veLVDContract;
    IERC20 public immutable lvdToken;

    struct PoolInfo {
        address pool;
        uint256 votes;
    }

    mapping(address => PoolInfo) public pools;
    mapping(address => mapping(address => uint256)) public userVotes;

    event Voted(address indexed user, address indexed pool, uint256 votes);
    event PoolAdded(address pool);

    constructor(address _veLVD, address _lvdToken) Ownable(msg.sender) {
        veLVDContract = veLVD(_veLVD);
        lvdToken = IERC20(_lvdToken);
    }

    function addPool(address _pool) external onlyOwner {
        require(pools[_pool].pool == address(0), "Pool already exists");
        pools[_pool] = PoolInfo(_pool, 0);
        emit PoolAdded(_pool);
    }

    function vote(address _pool, uint256 _amount) external {
        require(pools[_pool].pool != address(0), "Pool not found");
        
        uint256 votingPower = veLVDContract.votingPower(msg.sender);
        require(votingPower >= _amount, "Not enough voting power");

        // Kurangi vote lama jika ada
        if (userVotes[msg.sender][_pool] > 0) {
            pools[_pool].votes -= userVotes[msg.sender][_pool];
        }

        userVotes[msg.sender][_pool] = _amount;
        pools[_pool].votes += _amount;

        emit Voted(msg.sender, _pool, _amount);
    }

    function getPoolVotes(address _pool) external view returns (uint256) {
        return pools[_pool].votes;
    }
}
