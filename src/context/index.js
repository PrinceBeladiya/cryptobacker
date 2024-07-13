// import the contract for interaction
import CryptoBacker from '../artifacts/contracts/cryptoBacker.sol/CryptoBacker.json';

const ethers = require("ethers")
const CryptoBackerContractAddress = process.env.REACT_APP_CryptoBackerContractAddress;

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

export async function createCampaign(form) {
  // If MetaMask exists
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    await provider.send("eth_requestAccounts", []); // Request user's MetaMask account
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      CryptoBackerContractAddress, // contrat address
      CryptoBacker.abi, // abi
      signer
    );

    try {
      const data = await contract.createCampaign(
        form.name,
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

export async function getCampaigns() {
  // If MetaMask exists
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      CryptoBackerContractAddress, // contrat address
      CryptoBacker.abi, // abi
      provider
    );

    const signer = provider.getSigner();

    try {
      const data = await contract.connect(signer).getCompaigns();
      console.log("data: ", data);
    } catch (error) {
      console.log("Error: ", error);
    }
  } else {
    console.log("Please install metamsk first.")
  }
}

export async function donateToCampaign(e, compaignCode) {
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
      const data = await contract.donateToCampaign(
        0,
        { value: ethers.utils.parseEther("1.0") }
      );
      console.log("data: ", data);
    } catch (error) {
      console.log("Error: ", error);
    }
  } else {
      console.log("Please install metamsk first.")
  }
}