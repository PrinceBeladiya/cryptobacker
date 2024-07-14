import React, { useEffect,useState } from 'react'
import DisplayCampaigns from '../componets/DisplayCampaigns'
import Navbar from '../componets/Navbar';
import { donateToCampaign, getCampaignDonation, getCampaigns, getContractBalance, getContractUSDCBalance, getTotalOfCampaigns } from '../context';
import { ethers } from 'ethers';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [campaigns, setCampaigns] = useState([]);

    async function getalldata(){
      setIsLoading(true);
      const data = await getCampaigns();
      console.log(data);
      setCampaigns(data);
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
