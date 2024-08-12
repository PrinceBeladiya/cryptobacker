import React, { useState } from 'react'
import { DisplayCampagin } from '../../componets';

const CampaignList = () => {
    const [isLoading, setIsLoading] = useState(false);
    let campaigns;
    try {
      campaigns = [
        {
            owner : 'shubham Vanani',
            title : 'Make water from air',
            description : 'it says he can fill the water from an air',
            image : 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600',
            target : '12000',
            amountCollected : '1000',
            deadline : '2',

        },
        {
            owner : 'shubham Vanani',
            title : 'Make water from air',
            description : 'it says he can fill the water from an air',
            image : 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600',
            target : '12000',
            amountCollected : '1000',
            deadline : '2',

        },
        {
            owner : 'shubham Vanani',
            title : 'Make water from air',
            description : 'it says he can fill the water from an air',
            image : 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600',
            target : '12000',
            amountCollected : '1000',
            deadline : '2',

        },
        {
            owner : 'shubham Vanani',
            title : 'Make water from air',
            description : 'it says he can fill the water from an air',
            image : 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600',
            target : '12000',
            amountCollected : '1000',
            deadline : '2',

        },
        {
            owner : 'shubham Vanani',
            title : 'Make water from air',
            description : 'it says he can fill the water from an air',
            image : 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600',
            target : '12000',
            amountCollected : '1000',
            deadline : '2',

        },
      ]
    } catch(error) {
      console.log("error => ", error);
    }
  
    return (
      <DisplayCampagin 
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    )
}

export default CampaignList
