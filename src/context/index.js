// import the contract for interaction
import CryptoBacker from '../artifacts/contracts/cryptoBacker.sol/CryptoBacker.json';
const ethers = require("ethers")

const CryptoBackerContractAddress = process.env.REACT_APP_CryptoBackerContractAddress;

export async function enableEthereum() {
  if(typeof window.ethereum !== "undefined") {
    try {
      window.ethereum.enable();
    } catch(err) {
      console.log("There is an Error.");
      console.log("Error - ", err);
    }
  }
}

export async function createCampaign(form) {
  // If MetaMask exists
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    await provider.send("eth_requestAccounts", []); // Request user's MetaMask account
    const feeData = await provider.getFeeData();
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
        {
          maxFeePerGas: feeData.maxFeePerGas.mul(2),  // Adjust as needed
          maxPriorityFeePerGas: feeData.maxPriorityFeePerGas.add(ethers.utils.parseUnits('1', 'gwei'))  // Adjust as needed
        }
      );
      // console.log("data: ", data);
      return data;
      // getCampaigns();
    } catch (error) {
      console.log("Error: ", error);
      return null;
    }
  } else {
    console.log("Please install metamsk first.")
  }
}

export async function getCampaignDonation(campaignCode) {
  // If MetaMask exists
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const feeData = await provider.getFeeData();

    const contract = new ethers.Contract(
      CryptoBackerContractAddress, // contrat address
      CryptoBacker.abi, // abi
      provider
    );

    const signer = provider.getSigner();

    try {
      const data = await contract.connect(signer).getDonator(
        campaignCode,
        {
          maxFeePerGas: feeData.maxFeePerGas.mul(2),  // Adjust as needed
          maxPriorityFeePerGas: feeData.maxPriorityFeePerGas.add(ethers.utils.parseUnits('1', 'gwei'))  // Adjust as needed
        }
      );
      console.log("data: ", data);

      return data;
    } catch (error) {
      console.log("Error: ", error);
    }
  } else {
    console.log("Please install metamsk first.")
  }
}

export async function getTotalOfCampaigns() {
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
      const data = await contract.connect(signer).numberOfCampaign();
      console.log("data: ", ethers.utils.formatEther(data._hex, 18));

      return ethers.utils.formatEther(data._hex, 18);
    } catch (error) {
      console.log("Error: ", error);
    }
  } else {
    console.log("Please install metamsk first.")
  }
}

export async function getCampaigns() {
  const totalCampaigns = await getTotalOfCampaigns();

  if(totalCampaigns.toString() !== ("0.0")) {
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

        return data;
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      console.log("Please install metamsk first.")
    } 
  } else {
    console.log("There is nothing to show");
    return [];
  }
}

export async function getSpecificCampaign(campaignCode) {
  // If MetaMask exists
  if (typeof window.ethereum !== "undefined") {
    try {
      const allCampaigns = await getCampaigns();
      const filteredCampaigns = allCampaigns.filter((campaign) => campaign.campaignCode.toNumber() === campaignCode)
      console.log("Filtered :- ",filteredCampaigns);
    
      return filteredCampaigns;
    } catch(err) {
      console.log("Error : ", err);
      return [];
    }
  } else {
    console.log("Please install metamsk wallet");
    return [];
  }
}

export async function getContractBalance() {
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
      const data = await contract.connect(signer).getContractBalance();
      console.log("data: ", ethers.utils.formatEther(data._hex, 18));

      return ethers.utils.formatEther(data._hex, 18);
    } catch (error) {
      console.log("Error: ", error);
    }
  } else {
    console.log("Please install metamsk first.")
  }
}

export async function getContractUSDCBalance() {
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
      const data = await contract.connect(signer).getContractUSDCBalance();
      const usdcBalance = ethers.utils.formatUnits(data, 6);
      console.log("USDC Balance:", usdcBalance);

      return usdcBalance;
    } catch (error) {
      console.log("Error: ", error);
    }
  } else {
    console.log("Please install metamsk first.")
  }
}

export async function getUserCampaigns() {
  // If MetaMask exists
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
      const allCampaigns = await getCampaigns();
      
      let add = await signer.getAddress();
      const filteredCampaigns = allCampaigns.filter((campaign) => add === campaign.owner);

      return filteredCampaigns;
    } catch (error) {
      console.log("Error: ", error);
    }
  } else {
    console.log("Please install metamsk first.")
  }
}

export async function donateToCampaign(compaignCode, Amount) {

  const totalCampaigns = await getTotalOfCampaigns();

  if(totalCampaigns.toString() !== ("0.0")) {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const feeData = await provider.getFeeData();

      await provider.send("eth_requestAccounts", []); // Request user's MetaMask account
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        CryptoBackerContractAddress, // contrat address
        CryptoBacker.abi, // abi
        signer
      );

      try {
        const data = await contract.donateToCampaign(
          compaignCode,
          { 
            value: ethers.utils.parseEther(Amount.toString()),
            maxFeePerGas: feeData.maxFeePerGas.mul(2),  // Adjust as needed
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas.add(ethers.utils.parseUnits('1', 'gwei'))  // Adjust as needed
          }
        );
        console.log("data: ", data);
        return data;
      } catch (error) {
        console.log("Error: ", error);
        return null;
      }
    } else {
        console.log("Please install metamsk first.")
    }
  } else {
    console.log("There is no campaigns to donate.");
    return null;
  }
}