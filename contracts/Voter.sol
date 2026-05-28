// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./veLVD.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Voter is Ownable {
    veLVD public immutable veLVDContract;
    IERC20 public immutable lvdToken;

    uint256 public constant WEEK = 7 days;

    struct PoolInfo {
        address pool;
        uint256 votes;
    }

    mapping(address => PoolInfo) public pools;
    mapping(address => mapping(address => uint256)) public userVotes;
    mapping(address => uint256) public userTotalVotesUsed;
    
    // PATEN ve(3,3): Mencatat kapan terakhir kali user melakukan voting
    mapping(address => uint256) public lastVotedTimestamp;

    event Voted(address indexed user, address indexed pool, uint256 votes);
    event PoolAdded(address pool);
    event VoteReset(address indexed user);

    constructor(address _veLVD, address _lvdToken) Ownable(msg.sender) {
        veLVDContract = veLVD(_veLVD);
        lvdToken = IERC20(_lvdToken);
    }

    function addPool(address _pool) external onlyOwner {
        require(pools[_pool].pool == address(0), "Pool already exists");
        pools[_pool] = PoolInfo(_pool, 0);
        emit PoolAdded(_pool);
    }

    // Fungsi Vote standar ve(3,3) murni
    function vote(address _pool) external {
        require(pools[_pool].pool != address(0), "Pool not found");
        
        // RULE 1: User hanya bisa eksekusi vote/pindah vote seminggu sekali (Per Epoch)
        require(block.timestamp >= lastVotedTimestamp[msg.sender] + WEEK, "Kamu hanya bisa vote seminggu sekali");

        uint256 currentPower = veLVDContract.votingPower(msg.sender);
        require(currentPower > 0, "No voting power available");

        // RESET OTOMATIS: Jika ada vote di pool lama, kita bersihkan dulu sebelum pindah
        if (userTotalVotesUsed[msg.sender] > 0) {
            _resetVote(msg.sender);
        }

        // INPUT VOTE BARU
        userVotes[msg.sender][_pool] = currentPower;
        userTotalVotesUsed[msg.sender] = currentPower;
        pools[_pool].votes += currentPower;

        // Kunci waktu voting user untuk 1 minggu ke depan
        lastVotedTimestamp[msg.sender] = block.timestamp;

        emit Voted(msg.sender, _pool, currentPower);
    }

    // User bisa mereset atau mengosongkan vote mereka, tapi tetap terkena batasan seminggu sekali
    function resetVote() external {
        require(block.timestamp >= lastVotedTimestamp[msg.sender] + WEEK, "Tunggu siklus minggu ini selesai");
        require(userTotalVotesUsed[msg.sender] > 0, "No votes to reset");
        
        _resetVote(msg.sender);
        lastVotedTimestamp[msg.sender] = block.timestamp;
    }

    function _resetVote(address _user) internal {
        // Logika internal menghapus jejak vote lama user di pool sebelumnya
        // Catatan: Jika user bisa split vote ke banyak pool, bagian ini nanti menggunakan perulangan array pool.
        userTotalVotesUsed[_user] = 0;
        emit VoteReset(_user);
    }

    function getPoolVotes(address _pool) external view returns (uint256) {
        return pools[_pool].votes;
    }
}
