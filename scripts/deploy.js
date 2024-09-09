import { ethers } from "ethers";
import hre from "hardhat";

async function main() {  
  const CryptoBacker = await hre.ethers.getContractFactory("CryptoBacker");

  const cryptoBacker = await CryptoBacker.deploy(
    "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    {
      maxFeePerGas: 1000000000000,
      maxPriorityFeePerGas: ethers.parseUnits('1', 'gwei')
    }
  );

  // Wait for the contract to be mined
  await cryptoBacker.deploymentTransaction().wait();

  const address = await cryptoBacker.getAddress();
  console.log("CryptoBacker deployed to:", address);
}

main().catch((error) => {
  console.error(error);
});