// import the contract for interaction
import CryptoBacker from '../artifacts/contracts/cryptoBacker.sol/CryptoBacker.json';

const ethers = require("ethers")
const CryptoBackerContractAddress = process.env.REACT_APP_CryptoBackerContractAddress;

export async function createCampaign(form) {
  // If MetaMask exists
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      CryptoBackerContractAddress, // contrat address
      CryptoBacker.abi, // abi
      signer
    );

    try {
      const data = await contract.createCampaign(
        signer.getAddress(), // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image,
      );
      console.log("data: ", data);
    } catch (error) {
      console.log("Error: ", error);
    }
  } else {
      console.log("Please install metamsk first.")
  }
}

export async function getCampaigns(e) {
  e.preventDefault();
  // Create a new provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);
    
  // Get the signer
  const signer = provider.getSigner();

  // Create a new contract instance with the signer
  const contract = new ethers.Contract(
    CryptoBackerContractAddress, // contract address
    CryptoBacker.abi, // ABI
    signer
  );

  try {
    // Call the getCompaigns function
    const campaigns = await contract.getCompaigns();
    console.log("Campaigns: ", campaigns);
  } catch (error) {
    console.error("Error: ", error);
  }
}