// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';

contract CryptoBacker {
    struct Campaign {
        string name;
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        uint256 status;
        address[] donators;
        uint256[] donation;
    }

    ISwapRouter public immutable swapRouter = ISwapRouter(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
    address public constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    uint24 public constant feeTier = 3000;

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaign = 0;

    // Fallback function to receive Ether by contract itself
    receive() external payable {}

    fallback() external payable {}

    function swapExactInputSingle(address token0, address token1, uint256 amountIn, uint24 poolFee) private returns (uint256 amountout) {
            
            TransferHelper.safeApprove(token0, address(swapRouter), amountIn);

            ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: token0,
            tokenOut: token1,
            fee: poolFee,
            recipient: address(this),
            deadline: block.timestamp,
            amountIn: amountIn,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });

        amountout = swapRouter.exactInputSingle(params);
    }

    // create new campaign for raise the fund
    function createCampaign(string memory _name, address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns(uint256){
        Campaign storage newCampaign = campaigns[numberOfCampaign];

        require(_deadline > block.timestamp, "Deadline cannot be less that current time.");

        newCampaign.owner = _owner;
        newCampaign.name = _name;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.target = _target;
        newCampaign.deadline = _deadline;
        newCampaign.amountCollected = 0;
        newCampaign.image = _image;
        newCampaign.status = 0;

        numberOfCampaign++;

        return numberOfCampaign - 1;
    }

    // to donate the crypto to the campaign
    function donateToCampaign(uint256 _id) public payable {
        require(numberOfCampaign != 0, "There is not any campaign to donate");
        require(msg.value > 0, "Donation amount must be greater than zero");

        uint256 amount = msg.value;
        Campaign storage DonateCamapign = campaigns[_id];

        DonateCamapign.donators.push(msg.sender);
        DonateCamapign.donation.push(amount);

        swapExactInputSingle(WETH, USDC, amount, feeTier);

        DonateCamapign.amountCollected += amount;
        // The sent amount is automatically deposited to the contract
    }

    // get the deatils of the donator and their donation
    function getDonator(uint256 _id) view public returns(address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donation);
    }

    // get all the campaign details
    function getCompaigns() view public returns(Campaign[] memory) {
        require(numberOfCampaign != 0, "There is not any campaign to donate");
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaign);

        for(uint i = 0; i < numberOfCampaign; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}