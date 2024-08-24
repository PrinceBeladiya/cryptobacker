import { useSelector } from 'react-redux';
import CryptoBacker from '../artifacts/contracts/cryptoBacker.sol/CryptoBacker.json';
import { ethers } from "ethers";
import axios from 'axios';
import toast from 'react-hot-toast';

const CryptoBackerContractAddress = import.meta.env.VITE_CRYPTOBACKER_ADDRESS;

const getProvider = () => {
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask is not installed. Please install it to use this application.");
  }
  return new ethers.BrowserProvider(window.ethereum);
};

export const updateCampaignStatus = async (campaignCode, newStatus) => {
  try {
    if (typeof campaignCode !== 'number' || campaignCode < 0) {
      throw new Error("Invalid campaign code");
    }

    if (![0, 1, 2].includes(newStatus)) {
      throw new Error("Invalid status");
    }

    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    const tx = await contract.updateCampaignStatus(campaignCode, newStatus);
    await tx.wait();

    return true;
  } catch (error) {
    console.error("Error updating campaign status:", error);
    throw error;
  }
};

const getSigner = async (provider) => {
  const accounts = await provider.send("eth_requestAccounts", []);
  return await provider.getSigner(accounts[0]);
};

const getContract = (address, abi, signerOrProvider) => {
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const enableEthereum = async () => {
  try {
    const provider = await getProvider();
    await provider.send("eth_requestAccounts", []);
  } catch (err) {
    console.error("Failed to enable Ethereum:", err);
    throw err;
  }
};

export const createCampaign = async (form) => {
  let newCampaignCode = -1;
  try {
    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    if (!form.name || !form.title || !form.description || !form.category || !form.target || !form.deadline || !form.image || !form.files) {
      throw new Error("All fields are required");
    }

    if (form.target <= 0) {
      throw new Error("Target amount must be greater than zero");
    }

    if (new Date(form.deadline) <= new Date()) {
      throw new Error("Deadline must be in the future");
    }

    // const feeData = await provider.getFeeData();
    const tx = await contract.createCampaign(
      form.name,
      await signer.getAddress(),
      form.title,
      form.description,
      form.category,
      ethers.parseEther(form.target.toString()),
      Math.floor(new Date(form.deadline).getTime() / 1000),
      form.image
    );

    const receipt = await tx.wait();

    // Check if events are present and if the event 'CampaignCreated' is in the receipt
    if (!receipt.logs || !receipt.logs.length) {
      throw new Error("No events emitted by the transaction");
    }

    const event = receipt.logs.find(event => event.eventName === 'CampaignCreated');

    if (!event) {
      throw new Error("CampaignCreated event not found in the receipt");
    }

    const [campaignCode] = event.args;
    newCampaignCode = campaignCode;
    const createdCampaign = await getCampaigns();
    console.log(createdCampaign[Number(campaignCode)]);

    await axios.post("http://localhost:3001/campaign/createCampaign", {
      ...createdCampaign[Number(campaignCode)],
      files: form.files
    },
      {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}` }
      }
    ).then((res) => {
      toast.success(res.data.message);
      return res.data.data;
    }).catch(async (err) => {
      newCampaignCode != -1 && deleteCampaign(newCampaignCode);

      await axios.delete("http://localhost:3001/campaign/deleteCampaign", {
        newCampaignCode
      },
        {
          headers: { 'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}` }
        }
      ).then((res) => {
        toast.success(res.data.message);
        return res.data.data;
      }).catch((err) => {
        toast.error(err.response.data.message);
  
        throw err;
      })

      toast.error(err.response.data.message);

      throw err;
    })
  } catch (error) {
    console.error("Error creating campaign:", error);

    newCampaignCode != -1 && deleteCampaign(newCampaignCode);
    await axios.delete("http://localhost:3001/campaign/deleteCampaign", {
      newCampaignCode
    },
      {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}` }
      }
    ).then((res) => {
      toast.success(res.data.message);
      return res.data.data;
    }).catch((err) => {
      toast.error(err.response.data.message);

      throw err;
    })
    
    throw error;
  }
};

export const getCampaignDonation = async (campaignCode) => {
  try {
    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    if (typeof campaignCode !== 'number' || campaignCode < 0) {
      throw new Error("Invalid campaign code");
    }

    const data = await contract.getDonator(campaignCode);
    return data;
  } catch (error) {
    console.error("Error getting campaign donation:", error);
    throw error;
  }
};

export const getTotalOfCampaigns = async () => {
  try {
    const provider = await getProvider();
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, provider);

    const data = await contract.numberOfCampaigns();
    console.log("data : " + data);
    return ethers.formatEther(data);
  } catch (error) {
    console.error("Error getting total campaigns:", error);
    throw error;
  }
};

export const getCampaigns = async () => {
  try {
    const totalCampaigns = await getTotalOfCampaigns();
    if (parseFloat(totalCampaigns) === 0) {
      return [];
    }

    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    // Call the contract method
    const campaigns = await contract.getCampaigns();

    // If campaigns is an array of objects
    const formattedCampaigns = campaigns.map(campaign => ({
      campaignCode: Number(campaign.campaignCode),
      name: campaign.name,
      title: campaign.title,
      description: campaign.description,
      category: campaign.category,
      target: ethers.formatEther(campaign.target),
      deadline: new Date(Number(campaign.deadline) * 1000).toISOString(),
      image: campaign.image,
      status: Number(campaign.status),
    }));

    return formattedCampaigns;
  } catch (error) {
    console.error("Error getting campaigns:", error);
    throw error;
  }
};

export const getSpecificCampaign = async (campaignCode) => {
  try {
    if (typeof campaignCode !== 'number' || campaignCode < 0) {
      throw new Error("Invalid campaign code");
    }

    const allCampaigns = await getCampaigns();
    return allCampaigns.filter((campaign) => campaign.campaignCode.toNumber() === campaignCode);
  } catch (error) {
    console.error("Error getting specific campaign:", error);
    throw error;
  }
};

export const getContractBalance = async () => {
  try {
    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    const data = await contract.getContractBalance();
    return ethers.formatEther(data);
  } catch (error) {
    console.error("Error getting contract balance:", error);
    throw error;
  }
};

export const getContractUSDCBalance = async () => {
  try {
    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    const data = await contract.getContractUSDCBalance();
    return ethers.formatUnits(data, 6);
  } catch (error) {
    console.error("Error getting contract USDC balance:", error);
    throw error;
  }
};

export const getUserCampaigns = async () => {
  try {
    const provider = await getProvider();
    const signer = await getSigner(provider);
    const allCampaigns = await getCampaigns();
    const userAddress = await signer.getAddress();

    return allCampaigns.filter((campaign) => campaign.owner === userAddress);
  } catch (error) {
    console.error("Error getting user campaigns:", error);
    throw error;
  }
};

export const donateToCampaign = async (campaignCode, amount) => {
  try {
    if (typeof campaignCode !== 'number' || campaignCode < 0) {
      throw new Error("Invalid campaign code");
    }

    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error("Donation amount must be greater than zero");
    }

    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    const feeData = await provider.getFeeData();
    const tx = await contract.donateToCampaign(
      campaignCode,
      {
        value: ethers.parseEther(amount.toString()),
        maxFeePerGas: feeData.maxFeePerGas * 2n,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas + ethers.parseUnits('1', 'gwei')
      }
    );

    const receipt = await tx.wait();
    const event = receipt.events.find(event => event.event === 'DonationReceived');
    const [, , amountETH, amountUSDC] = event.args;

    return {
      amountETH: ethers.formatEther(amountETH),
      amountUSDC: ethers.formatUnits(amountUSDC, 6)
    };
  } catch (error) {
    console.error("Error donating to campaign:", error);
    throw error;
  }
};

export const deleteCampaign = async (campaignCode) => {
  try {
    if (typeof campaignCode !== 'number' || campaignCode < 0) {
      throw new Error("Invalid campaign code");
    }

    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    const tx = await contract.deleteCampaign(campaignCode);
    await tx.wait();

    toast.success('Campaign deleted successfully');
    return true;
  } catch (error) {
    console.error("Error deleting campaign:", error);
    toast.error('Error deleting campaign');
    throw error;
  }
};
