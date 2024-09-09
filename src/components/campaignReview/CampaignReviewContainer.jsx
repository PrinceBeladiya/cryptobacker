import React, { useEffect, useState } from 'react';
import CampaignReview from './CampaignReview';
import { useParams } from 'react-router-dom';
import { getCampaignDetails } from '../../context';

const CampaignReviewContainer = () => {
  const { campaignCode } = useParams();
  const [campaign, setCampaign] = useState(null); // Initialize as null to handle loading state

  const handleApprove = () => {
    alert('Campaign approved');
  };

  const handleReject = () => {
    alert('Campaign rejected');
  };

  useEffect(() => {
    getCampaignDetails(campaignCode)
      .then(res => {
        console.log("New Data :- ", res); 
        setCampaign(res); // Set campaign data when it is fetched
      })
      .catch(error => console.error("Error fetching campaign details:", error));
  }, [campaignCode]);

  if (!campaign) {
    return <div>Loading...</div>; // Render a loading state until data is available
  }

  return (
    <CampaignReview 
      campaign={campaign}
      handleApprove={handleApprove}
      handleReject={handleReject}
    />
  );
};

export default CampaignReviewContainer;
