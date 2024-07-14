import React, { useEffect, useState } from 'react'
import DisplayCampaigns from '../componets/DisplayCampaigns'
import Navbar from '../componets/Navbar';
import { donateToCampaign, getCampaigns, getContractBalance, getContractUSDCBalance, getSpecificCampaign, getTotalOfCampaigns } from '../context';
import { ethers } from 'ethers';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);


  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      const totalCampaigns = await getTotalOfCampaigns();
      console.log("totalCampaign => " + totalCampaigns);
      
      if(totalCampaigns.toString() !== "0.0") {
        try {
          const campaignsData = await getCampaigns();
          setCampaigns(campaignsData);
        } catch(error) {
          console.log("error => ", error);
        }
      } else {
        console.log("There is nothing to show");
      }
      setIsLoading(false);
    };

    fetchCampaigns();
  }, []);

  return (
    <>
    <Navbar/>
    <button className='w-40 h-10 rounded-md bg-white text-black mx-2 my-2' onClick={() => getCampaigns()}>get Campaigns</button>
    <button className='w-40 h-10 rounded-md bg-white text-black mx-2 my-2' onClick={() => getContractBalance()}>get Contract Balance</button>
    <button className='w-[200px] h-10 rounded-md bg-white text-black mx-2 my-2' onClick={() => getContractUSDCBalance()}>get Contract USDC Balance</button>
    <button className='w-[200px] h-10 rounded-md bg-white text-black mx-2 my-2' onClick={(e) => donateToCampaign(e, 0)}>Donate to Campaign 0</button>
    <button className='w-[200px] h-10 rounded-md bg-white text-black mx-2 my-2' onClick={() => getSpecificCampaign(0)}>Get Specific Campaign 0</button>

    {/* <DisplayCampaigns 
      title="All Campaigns"
      // isLoading={isLoading}
      campaigns={campaigns}
    /> */}
    </>
  )
}

export default HomePage
