import React, { useEffect,useState } from 'react'
import DisplayCampaigns from '../componets/DisplayCampaigns'
import Navbar from '../componets/Navbar';
import { donateToCampaign, getCampaignDonation, getCampaigns, getContractBalance, getContractUSDCBalance, getTotalOfCampaigns } from '../context';
import { ethers } from 'ethers';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [campaigns, setCampaigns] = useState([]);
    const [address, setAddress] = useState('');

    async function getalldata(){
      setIsLoading(true);
      if(typeof window.ethereum !== "undefined") {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []); 
          const signer = provider.getSigner();

          if(typeof signer !== 'undefined') {
              const data = await getCampaigns();
              setCampaigns(data);
            } else {
              await window.ethereum.enable();
            }
            // const signer = provider.getSigner();
            // setAddress(signer.getAddress());
          } catch(err) {
            console.log("There is an Error.");
            console.log("Error - ", err);
          }
        }
    
      // console.log(data);
      setIsLoading(false);
    }

    useEffect(() => {
      getalldata()
    },[])

    return (
      <>
      <Navbar/>
      <DisplayCampaigns 
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
      </>
    )
}

export default HomePage
