import React, { useState } from 'react'


const CampaignList = () => {
    const [isLoading, setIsLoading] = useState(false);
    let campaigns;
    try {
      campaigns = getCampaigns();
    } catch(error) {
      console.log("error => ", error);
    }
  
    return (
      <DisplayCampaigns 
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    )
}

export default CampaignList
