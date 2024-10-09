import CryptoBacker from '../artifacts/contracts/cryptoBacker.sol/CryptoBacker.json';
import { ethers } from "ethers";
import axios from 'axios';
import toast from 'react-hot-toast';

const CryptoBackerContractAddress = import.meta.env.VITE_CRYPTOBACKER_ADDRESS;

const getProvider = () => {
  if (typeof window.ethereum === "undefined") {
    toast.error("MetaMask is not installed. Please install it to use this application.")
    throw new Error("MetaMask is not installed. Please install it to use this application.");
  }
  return new ethers.BrowserProvider(window.ethereum);
};

export const addAdmin = async () => {
  try {
    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    const txResponse = await contract.addAdmin("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    // Wait for the transaction to be mined
    const receipt = await txResponse.wait();

    return receipt;
  } catch (error) {
    console.error("Error updating campaign status:", error);
    throw error;
  }
}

export const updateCampaignStatus = async (campaignCode, newStatus) => {
  try {
    if (campaignCode < 0) {
      throw new Error("Invalid campaign code");
    }

    if (![0, 1, 2].includes(Number(newStatus))) {
      throw new Error("Invalid status");
    }

    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    const tx = await contract.updateCampaignStatus(campaignCode, newStatus);
    await tx.wait();

    return true;
  } catch (error) {
    console.error("Error updating campaign status:", error.message.split(" (")[0]);
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

export const getAllCampaignDetails = async () => {
  try {
    const response = await axios.get("http://localhost:3001/campaign/getAllCampaign", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}`,
      }
    });
    return response.data.data; // Return the data here
  } catch (error) {
    console.error("Error getting campaign donation:", error);
    if (error?.message?.split(" (")[0]) {
      toast.error(error.message.split(" (")[0] || "An error occurred");
    } else {
      toast.error("An error occurred");
    }
    throw error;
  }
}


export const createCampaign = async (form) => {
  try {
    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    if (!form.name || !form.title || !form.description || !form.category || !form.target || !form.deadline || !form.campaingn_thumbnail || !form.campaingn_report) {
      throw new Error("All fields are required");
    }

    if (form.target <= 0) {
      throw new Error("Target amount must be greater than zero");
    }

    if (new Date(form.deadline) <= new Date()) {
      throw new Error("Deadline must be in the future");
    }

    await axios.post("http://localhost:3001/campaign/campaignExist", form,
      {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}` }
      }
    ).then(async () => {
      const formData = new FormData();

      const tx = await contract.createCampaign(
        form.name,
        await signer.getAddress(),
        form.title,
        form.description,
        form.category,
        ethers.parseEther(form.target.toString()),
        Math.floor(new Date(form.deadline).getTime() / 1000)
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
      // newCampaignCode = campaignCode;
      const createdCampaign = await getCampaigns();
      console.log(createdCampaign[Number(campaignCode)]);

      const data = {
        ...createdCampaign[Number(campaignCode)]
      };

      // Append text fields
      formData.append('campaignCode', data.campaignCode);
      formData.append('category', data.category);
      formData.append('deadline', data.deadline);
      formData.append('description', data.description);
      formData.append('name', data.name);
      formData.append('status', data.status);
      formData.append('target', data.target);
      formData.append('title', data.title);
      formData.append('files', form.campaingn_thumbnail)
      formData.append('files', form.campaingn_report)

      await axios.post("http://localhost:3001/campaign/createCampaign", formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      ).then((res) => {
        toast.success(res.data.message);
        return res.data.data;
      }).catch(async (err) => {
        toast.error(err.response.data.message);

        throw err;
      })
    }).catch((err) => {
      if (err?.message?.split(" (")[0]) {
        toast.error(err.message.split(" (")[0]);
      } else {
        toast.error(err.response.data.message);
      }

      throw err;
    })
  } catch (error) {
    console.error("Error creating campaign:", error.message.split(" (")[0]);

    throw error;
  }
};

export const getCampaignDetails = async (campaignCode) => {
  try {
    const res = await axios.post("http://localhost:3001/campaign/getCampaign", { campaignCode: campaignCode },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}`
        }
      }
    )
    return res.data.data;
  } catch (error) {
    if (error?.message?.split(" (")[0]) {
      console.error("Error :", error.message.split(" (")[0]);
    } else {
      console.error("Error :", error);
    }

    throw error;
  }
}

export const getCampaignDonation = async (campaignCode) => {
  try {
    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    if (campaignCode < 0) {
      throw new Error("Invalid campaign code");
    }

    const data = await contract.getDonations(campaignCode);


    // If campaigns is an array of objects
    const donationData = data.map(donations => ({
      donor: donations.donor,
      donorName: donations.donorName,
      donorEmail: donations.donorEmail,
      amountETH: donations.amountETH,
      amountUSDC: donations.amountUSDC,
      timestamp: new Date(Number(donations.timestamp) * 1000).toISOString(),
    }));

    return donationData;
  } catch (error) {
    if (error?.message?.split(" (")[0]) {
      console.error("Error :", error.message.split(" (")[0]);
    } else {
      console.error("Error getting campaign donation:", error);
    }

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
    if (error?.message?.split(" (")[0]) {
      console.error("Error :", error.message.split(" (")[0]);
    } else {
      console.error("Error getting total campaigns:", error);
    }

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
      owner: campaign.owner,
      amountCollectedETH: Number(campaign.amountCollectedETH),
      amountCollectedUSDC: Number(campaign.amountCollectedUSDC),
      campaignCode: Number(campaign.campaignCode),
      name: campaign.name,
      title: campaign.title,
      description: campaign.description,
      category: campaign.category,
      target: ethers.formatEther(campaign.target),
      deadline: new Date(Number(campaign.deadline) * 1000).toISOString(),
      status: Number(campaign.status),
      createdAt: new Date(Number(campaign.createdAt) * 1000).toISOString(),
    }));

    return formattedCampaigns;
  } catch (error) {
    if (error?.message?.split(" (")[0]) {
      console.error("Error :", error.message.split(" (")[0]);
    } else {
      console.error("Error getting campaigns:", error);
    }

    throw error;
  }
};

export const getSpecificCampaign = async (campaignCode) => {
  try {
    if (campaignCode < 0) {
      throw new Error("Invalid campaign code");
    }

    const allCampaigns = await getCampaigns();
    return allCampaigns.filter((campaign) => Number(campaign.campaignCode) === Number(campaignCode));
  } catch (error) {
    console.error("Error getting specific campaign:", error);
    throw error;
  }
};

// export const getTransactions = async (address) => {
//   const provider = new ethers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/dVA4AxGZUZ_wZeXeXjtB_grkGCcpus5n");
//   // const provider = await getProvider();

//   const filter = {
//     address: address, // replace with your contract address
//     topics: [
//       ethers.utils.id("MyEvent(address,uint256)") // replace with your event signature
//     ]
//   };

//   provider.on(filter, (log, event) => {
//     console.log(`Transaction: ${log.transactionHash}, Event: ${event}`);
//   });
// };

export const getContractBalance = async () => {
  try {
    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    const data = await contract.getContractBalance();
    return ethers.formatEther(data);
  } catch (error) {
    if (error?.message?.split(" (")[0]) {
      console.error("Error :", error.message.split(" (")[0]);
    } else {
      console.error("Error getting contract balance:", error);
    }

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
    if (error?.message?.split(" (")[0]) {
      console.error("Error :", error.message.split(" (")[0]);
    } else {
      console.error("Error getting contract USDC balance:", error);
    }

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
    if (error?.message?.split(" (")[0]) {
      console.error("Error :", error.message.split(" (")[0]);
    } else {
      console.error("Error getting user campaigns:", error);
    }

    throw error;
  }
};

export const donateToCampaign = async (data) => {
  try {
    const { campaignCode, amount, userName, userEmail } = data;

    if (campaignCode < 0) {
      throw new Error("Invalid campaign code");
    }

    if (amount <= 0) {
      throw new Error("Donation amount must be greater than zero");
    }

    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    const feeData = await provider.getFeeData();
    let tx;
    if (userName && userEmail) {
      tx = await contract.donateToCampaign(
        campaignCode, userName, userEmail,
        {
          value: ethers.parseEther(amount.toString()),
          maxFeePerGas: feeData.maxFeePerGas * 2n,
          maxPriorityFeePerGas: feeData.maxPriorityFeePerGas + ethers.parseUnits('1', 'gwei')
        }
      );
    }

    const receipt = await tx.wait();

    if (!receipt.logs || !receipt.logs.length) {
      throw new Error("No events emitted by the transaction");
    }

    const donationEvent = receipt.logs.find(event => event.eventName === 'DonationReceived');

    if (!donationEvent) {
      throw new Error("DonationReceived event not found");
    }

    const { donor, donorName, donorEmail, amountETH, amountUSDC, timestamp } = donationEvent.args;

    return {
      donor,
      donorName,
      donorEmail,
      amountETH: ethers.formatEther(amountETH),
      amountUSDC: ethers.formatUnits(amountUSDC, 6),
      timestamp
    };
  } catch (error) {
    if (error?.message?.split(" (")[0]) {
      console.error("Error :", error.message.split(" (")[0]);
    } else {
      console.error("Error donating to campaign:", error);
    }

    throw error;
  }
};

export const deleteCampaign = async (campaignCode) => {
  try {
    if (campaignCode < 0) {
      throw new Error("Invalid campaign code");
    }

    const provider = await getProvider();
    const signer = await getSigner(provider);
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    const tx = await contract.deleteCampaign(campaignCode);
    await tx.wait();
    return true;
  } catch (error) {
    if (error?.message?.split(" (")[0]) {
      console.error("Error :", error.message.split(" (")[0]);
    } else {
      console.error("Error deleting campaign:", error);
    }

    toast.error('Error deleting campaign');
    throw error;
  }
};

export const createWithdrawRequest = async (data) => {
  try {
    if (!data.name || !data.campaignOwner || !data.title || data.campaignCode == undefined || !data.campaign || !data.amount) {
      throw new Error("All fields are required");
    }

    if (Number(data.amount) <= 0) {
      throw new Error("Amount must be greater than zero");
    }

    const formData = new FormData();

    formData.append('campaignCode', data.campaignCode);
    formData.append('name', data.name);
    formData.append('title', data.title);
    formData.append('campaignOwner', data.campaignOwner)
    formData.append('campaign', data.campaign)
    formData.append('amount', data.amount)
    formData.append('file', data.report)

    await axios.post("http://localhost:3001/withdraws/createWithdrawRequest", formData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}`,
          "Content-Type": "multipart/form-data"
        }
      }
    ).then((res) => {
      toast.success(res.data.message);
      return res.data.data;
    }).catch(async (err) => {
      toast.error(err.response.data.message);

      throw err;
    })
  } catch (error) {
    console.error("Error creating campaign:", error);

    throw error;
  }
};

export const getWithdraws = async () => {
  try {
    const provider = await getProvider();
    const signer = await getSigner(provider);
    const address = await signer.getAddress();

    const res = await axios.post("http://localhost:3001/withdraws/getWithdrawRequest", { campaignOwner: address },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}`,
        }
      }
    );

    return res.data;
  } catch (error) {
    if (error?.message?.split(" (")[0]) {
      console.error("Error :", error.message.split(" (")[0]);
    } else {
      console.error("Error deleting campaign:", error);
    }

    toast.error('Error deleting campaign');
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get("http://localhost:3001/user/getAllUser",
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}`,
        }
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error deleting campaign:", error);
    toast.error('Error deleting campaign');
    throw error;
  }
}

export const getUser = async (ID) => {
  try {
    const res = await axios.post("http://localhost:3001/user/getuserById",
      {
        ID: ID
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error deleting campaign:", error);
    toast.error('Error deleting campaign');
    throw error;
  }
}

export const changeUserStatus = async (userId, status) => {
  try {
    const response = await axios.post('http://localhost:3001/user/changeStatus', {
      userId: userId,
      status: status,
    },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}`,
        }
      });

    if (response.data.status) {
      toast.success(`User status updated to ${status}`);
    } else {
      toast.error('Failed to update user status');
    }

    getAllUsers();

    return response.data;
  } catch (error) {
    console.error("Error updating user status:", error);
    toast.error('Error updating user status');
    throw error;
  }
};

export const addSubAdmin = async (subAdminData) => {
  try {
    const res = await axios.post("http://localhost:3001/admin/addAdmin", subAdminData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("JWT_Token")}`,
        }
      }
    );

    if (res.data.status) {
      toast.success('Sub-Admin added successfully');
    } else {
      toast.error(res.data.message);
    }

    return res.data;
  } catch (error) {
    console.error("Error adding sub-admin:", error);
    toast.error(error.response.data.message);
    throw error;
  }
}

export const getUserDonations = async () => {
  try {
    const provider = await getProvider();
    const signer = await getSigner(provider);
    const userAdd = await signer.getAddress();
    const contract = getContract(CryptoBackerContractAddress, CryptoBacker.abi, signer);

    const data = await contract.getUserDonationsByDate(userAdd);

    // If campaigns is an array of objects
    const donationData = data.map(donations => ({
      donor: donations.donor,
      donorName: donations.donorName,
      donorEmail: donations.donorEmail,
      amountETH: donations.amountETH,
      amountUSDC: donations.amountUSDC,
      timestamp: new Date(Number(donations.timestamp) * 1000).toISOString(),
    }));

    return donationData;
  } catch (error) {
    if (error?.message?.split(" (")[0]) {
      console.error("Error :", error.message.split(" (")[0]);
    } else {
      console.error("Error getting campaign donation:", error);
    }

    throw error;
  }
};
