import React, { useEffect, useState } from 'react';
import {DisplayCampaigns,Navbar,SoftAlert} from '../componets';
import { getUserCampaigns } from '../context';
import { ethers } from 'ethers';
import ReportIcon from '@mui/icons-material/Report'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import { Outlet } from 'react-router-dom';

const WithDrawPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [wallet, setWallet] = useState(false);
  const [alerts, setAlerts] = useState([]);

  async function isConnected() {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length) {
      setWallet(true);
    } else {
      
      setWallet(false);
      console.log("Metamask is not connected");
    }
  }

  async function getalldata() {
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        if (typeof signer !== 'undefined') {
          const data = await getUserCampaigns();
          console.log('Spacific :- ',data);
          setCampaigns(data);
        } else {
          await window.ethereum.enable();
        }
      } catch (err) {
        console.log("There is an Error.");
        console.log("Error - ", err);
      }
    }
    setIsLoading(false);
  }

  const handleCloseAlert = (title) => {
    setAlerts(alerts.filter((alert) => alert.title !== title));
  };

  useEffect(() => {
    getalldata();

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        console.log("MetaMask is locked.");
        setAlerts([
          {
            title: 'Error',
            color: 'danger',
            icon: <ReportIcon />,
            message: 'Please Connect Your Metamask',
          },
          ...alerts,
        ]);
        setWallet(false);
        getalldata();
      } else {
        setAlerts([
          {
            title: 'Success',
            color: 'success',
            icon: <CheckCircleIcon />,
            message: 'Meta Mask Conneted Successfully',
          },
          ...alerts,
        ]);
        console.log("MetaMask is unlocked.");
        setWallet(true);
        getalldata();
      }
    };

    const handleChainChanged = (_) => {
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      {alerts.length > 0 && (
        <div className="absolute top-4 right-4">
          <SoftAlert items={alerts} onClose={handleCloseAlert} />
        </div>
      )}s
      <DisplayCampaigns
        title="Your Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
      <Outlet/>
    </>
  );
  {/* Success Animation Section
  {success && (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-8 flex items-center justify-center"
    >
      <MdCheckCircle className="text-[#1dc071] text-6xl" />
      <p className="font-epilogue font-bold text-white ml-4 text-2xl">Withdrawal Request Submitted!</p>
    </motion.div>
  )} */}
};

export default WithDrawPage;
