#!/bin/bash

# Step 1: Replace content of IERC20.sol
echo "Replacing content of IERC20.sol..."
cat > ./node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol <<EOL
// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.20;

/**
 * @dev Interface of the ERC-20 standard as defined in the ERC.
 */
interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}
EOL

# Step 2: Compile contracts
echo "Compiling contracts..."
npx hardhat compile

# Step 3: Delete the deployment directory
echo "Deleting ./ignition/deployments directory..."
rm -rf ./ignition/deployments

# Step 3: Delete the deployment directory
echo "Starting the VSCode..."
code . -r


printf  "\n\nProcess Completed....."
printf  "\nFollow Below Instruction :"

printf  "\n1] start hardhat node in terminal 1 execute command: \n\nnpx hardhat node --fork https://eth-mainnet.g.alchemy.com/v2/dVA4AxGZUZ_wZeXeXjtB_grkGCcpus5n"
printf  "\n\nAfter start the node then only go furthur"

printf  "\n\n2] Deploy the cryptoBacker contract in terminal 2(Open New Terminal) execute command: \n\nnpx hardhat ignition deploy ignition/modules/CryptoBacker.js --network localhost"
printf  "\n\nOutput shown in the terminal 2 where the contract deployed address is provided copy and paste it in the .env file.(like below...)"
printf  "\n\nREACT_APP_CryptoBackerContractAddress=\"<Paste Here>\""

printf  "\n\n3] Deploy the userAuthentication contract in terminal 2 execute command: \n\nnpx hardhat ignition deploy ignition/modules/userAuthentication.js --network localhost"
printf  "\n\nOutput shown in the terminal 2 where the contract deployed address is provided copy and paste it in the .env file.(like below...)"
printf  "\n\nREACT_APP_UserAuthContractAddress=\"<Paste Here>\""

printf  "\n\nNow you can start the project in terminal 2 by: \n\nnpm run start\n"