import CampaignList from './CampaignList'
import { enableEthereum, createCampaign, getCampaigns } from "../../context";
import { useEffect } from 'react';

const CampaignListContainer = () => {

  useEffect(() => {
    enableEthereum();
    getCampaigns();
    // createCampaign({
    //   name: 'Test Campaign',
    //   title: 'Campaign Title',
    //   description: 'This is a description of the campaign.',
    //   category: 'Technology',
    //   target: 5, // Target amount in ETH
    //   deadline: new Date(Date.now() + 86400000).toISOString(), // Deadline set to 1 day from now
    //   image: 'https://example.com/image.jpg'
    // });
  }, []);

  return (
    <CampaignList />
  )
}

export default CampaignListContainer