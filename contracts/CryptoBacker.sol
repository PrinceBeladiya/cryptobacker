// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';

interface IWETH {
    function deposit() external payable;
    function withdraw(uint256) external;
}

contract CryptoBacker is ReentrancyGuard {
    struct Campaign {
        string name;
        address owner;
        string category;
        string title;
        string description;
        uint256 campaignCode;
        uint256 target;
        uint256 deadline;
        uint256 amountCollectedETH;
        uint256 amountCollectedUSDC;
        uint256 status;
        uint256 createdAt;
        Donation[] donations;
    }

    struct Donation {
        address donor;
        string donorName;
        string donorEmail;
        uint256 amountETH;
        uint256 amountUSDC;
        uint256 timestamp;
    }

    ISwapRouter public immutable swapRouter;
    address public immutable WETH;
    address public immutable USDC;
    uint24 public constant FEE_TIER = 3000;

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    // Admin management
    mapping(address => bool) public admins;  // Mapping to store the list of admins
    address public superAdmin;  // The address of the super admin (who can add/remove admins)

    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);
    event CampaignCreated(uint256 indexed campaignCode, address indexed owner, uint256 target, uint256 deadline, uint256 createdAt);
    event DonationReceived(uint256 indexed campaignCode, address indexed donor, string donorName, string donorEmail, uint256 amountETH, uint256 amountUSDC, uint256 timestamp);
    event CampaignStatusUpdated(uint256 indexed campaignCode, uint256 newStatus, address indexed admin);
    event CampaignDeleted(uint256 indexed campaignCode);

    constructor(address _swapRouter, address _WETH, address _USDC, address _superAdmin) {
        swapRouter = ISwapRouter(_swapRouter);
        WETH = _WETH;
        USDC = _USDC;
        superAdmin = _superAdmin;  // Set the super admin
        admins[_superAdmin] = true;  // Super admin is also an admin
    }

    // Modifier to check if the caller is an admin
    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admins can perform this action");
        _;
    }

    // Modifier to check if the caller is the super admin
    modifier onlySuperAdmin() {
        require(msg.sender == superAdmin, "Only the super admin can perform this action");
        _;
    }

    // Add an admin (only the super admin can do this)
    function addAdmin(address _admin) public onlySuperAdmin {
        require(_admin != address(0), "Invalid admin address");
        require(!admins[_admin], "Admin already exists");
        admins[_admin] = true;
        emit AdminAdded(_admin);
    }

    // Remove an admin (only the super admin can do this)
    function removeAdmin(address _admin) public onlySuperAdmin {
        require(_admin != address(0), "Invalid admin address");
        require(admins[_admin], "Admin does not exist");
        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getContractUSDCBalance() public view returns (uint256) {
        return IERC20(USDC).balanceOf(address(this));
    }

    function swapExactInputSingle(uint256 amountIn) private returns (uint256 amountOut) {
        require(amountIn > 0, "Amount must be greater than 0");
        
        IWETH(WETH).deposit{value: amountIn}();
        TransferHelper.safeApprove(WETH, address(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: WETH,
            tokenOut: USDC,
            fee: FEE_TIER,
            recipient: address(this),
            deadline: block.timestamp + 600,
            amountIn: amountIn,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });

        amountOut = swapRouter.exactInputSingle(params);
        TransferHelper.safeApprove(WETH, address(swapRouter), 0);
        return amountOut;
    }

    // Create a campaign (anyone can create)
    function createCampaign(
        string memory _name,
        address _owner,
        string memory _title,
        string memory _description,
        string memory _category,
        uint256 _target,
        uint256 _deadline
    ) public returns(uint256) {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_owner != address(0), "Invalid owner address");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(bytes(_category).length > 0, "Category cannot be empty");
        require(_target > 0, "Target must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        Campaign storage newCampaign = campaigns[numberOfCampaigns];

        newCampaign.owner = _owner;
        newCampaign.name = _name;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.category = _category;
        newCampaign.target = _target;
        newCampaign.deadline = _deadline;
        newCampaign.amountCollectedETH = 0;
        newCampaign.amountCollectedUSDC = 0;
        newCampaign.status = 0;
        newCampaign.campaignCode = numberOfCampaigns;
        newCampaign.createdAt = block.timestamp;

        emit CampaignCreated(numberOfCampaigns, _owner, _target, _deadline, block.timestamp);

        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }
    
    function donateToCampaign(
      uint256 _id,
      string memory _userName,
      string memory _userEmail
    ) public payable nonReentrant returns(uint256) {
        require(_id < numberOfCampaigns, "Invalid campaign ID");
        require(msg.value > 0, "Donation must be greater than zero");

        Campaign storage campaign = campaigns[_id];
        require(campaign.status != 0, "Campaign is Pending");
        require(block.timestamp < campaign.deadline, "Campaign has ended");

        uint256 amountETH = msg.value;
        uint256 amountUSDC = swapExactInputSingle(amountETH);

        campaign.donations.push(Donation({
            donor: msg.sender,
            amountETH: amountETH,
            amountUSDC: amountUSDC,
            timestamp: block.timestamp,
            donorName: _userName,
            donorEmail: _userEmail
        }));

        campaign.amountCollectedETH += amountETH;
        campaign.amountCollectedUSDC += amountUSDC;

        emit DonationReceived(_id, msg.sender, _userName, _userEmail, amountETH, amountUSDC, block.timestamp);

        return amountUSDC;
    }

    function getDonations(uint256 _id) view public returns(Donation[] memory) {
        require(_id < numberOfCampaigns, "Invalid campaign ID");
        return campaigns[_id].donations;
    }

    function getCampaigns() view public returns(Campaign[] memory) {
        require(numberOfCampaigns > 0, "No campaigns available");
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }

    // Update campaign status (only an admin can perform this)
    function updateCampaignStatus(uint256 _id, uint256 _newStatus) public onlyAdmin {
        require(_id < numberOfCampaigns, "Invalid campaign ID");
        require(_newStatus <= 2, "Invalid status");
        
        Campaign storage campaign = campaigns[_id];
        campaign.status = _newStatus;

        emit CampaignStatusUpdated(_id, _newStatus, msg.sender);
    }

    function deleteCampaign(uint256 _id) public {
        require(_id < numberOfCampaigns, "Invalid campaign ID");
        
        Campaign storage campaign = campaigns[_id];
        require(campaign.owner == msg.sender || msg.sender == address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), "Only the campaign owner or admin can delete the campaign");
        
        // Clear the campaign data
        delete campaigns[_id];
        numberOfCampaigns--;

        emit CampaignDeleted(_id);
    }

    function getUserDonationsByDate(address _user) public view returns (Donation[] memory) {
        // Variable to count total donations for the user
        uint256 totalDonations = 0;

        // First loop: Calculate total donations made in all the campaigns owned by the user
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            if (campaigns[i].owner == _user) {
                totalDonations += campaigns[i].donations.length;
            }
        }

        // Create a dynamic array of donations with the exact length
        Donation[] memory userDonations = new Donation[](totalDonations);

        // Second loop: Collect all donations from all campaigns owned by the user
        uint256 donationIndex = 0;
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            if (campaigns[i].owner == _user) {
                for (uint256 j = 0; j < campaigns[i].donations.length; j++) {
                    userDonations[donationIndex] = campaigns[i].donations[j];
                    donationIndex++;
                }
            }
        }

        // Sort donations by timestamp (date-wise sorting)
        for (uint256 i = 0; i < userDonations.length; i++) {
            for (uint256 j = i + 1; j < userDonations.length; j++) {
                if (userDonations[i].timestamp > userDonations[j].timestamp) {
                    // Swap donations to sort by date
                    Donation memory temp = userDonations[i];
                    userDonations[i] = userDonations[j];
                    userDonations[j] = temp;
                }
            }
        }
        
        return userDonations;
    }

}