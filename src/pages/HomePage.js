import React, { useEffect, useState } from 'react';
import {DisplayCampaigns,Navbar,SoftAlert} from '../componets';
import { getCampaigns } from '../context';
import { ethers } from 'ethers';
import ReportIcon from '@mui/icons-material/Report'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 

const HomePage = () => {
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
          const data = await getCampaigns();
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
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
        context={'donation'}
      />
    </>
  );
};

export default HomePage;