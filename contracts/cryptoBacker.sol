// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CryptoBacker {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donation;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaign = 0;

    // Fallback function to receive Ether by contract itself
    receive() external payable {}

    fallback() external payable {}

    // create new campaign for raise the fund
    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns(uint256){
        Campaign storage newCampaign = campaigns[numberOfCampaign];

        require(_deadline > block.timestamp, "Deadline cannot be less that current time.");

        newCampaign.owner = _owner;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.target = _target;
        newCampaign.deadline = _deadline;
        newCampaign.amountCollected = 0;
        newCampaign.image = _image;

        numberOfCampaign++;

        return numberOfCampaign - 1;
    }

    // to donate the crypto to the campaign
    function donateToCampaign(uint256 _id) public payable {
        // require(msg.value > 0, "Donation amount must be greater than zero");

        // uint256 amount = msg.value;
        // Campaign storage DonateCamapign = campaigns[_id];

        // DonateCamapign.donators.push(msg.sender);
        // DonateCamapign.donation.push(amount);

        // DonateCamapign.amountCollected += amount;

        // The sent amount is automatically deposited to the contract
    }

    // get the deatils of the donator and their donation
    function getDonator(uint256 _id) view public returns(address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donation);
    }

    // get all the campaign details
    function getCompaigns() view public returns(Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaign);

        for(uint i = 0; i < numberOfCampaign; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}