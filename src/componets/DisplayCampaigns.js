import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader } from '../assets';
import { ethers } from 'ethers';
import { daysLeft } from '../utils';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.campaignCode}`);
  };

  return (
    <div>
      {campaigns && (
        <>
          <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>
          <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {isLoading && (
              <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            )}

            {!isLoading && campaigns.length === 0 && (
              <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                You have not created any campaigns yet
              </p>
            )}

            {!isLoading && campaigns.length > 0 && campaigns.map((data) => (
              <FundCard 
                key={uuidv4()}
                owner={data[0]}
                description={data.description}
                target={ethers.utils.formatEther(data.target._hex) + " ETH"}
                deadline={daysLeft(data.deadline?.toNumber())}
                amountCollected={ethers.utils.formatEther(data.amountCollected)}
                image={data.image}
                handleClick={() => handleNavigate(data)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayCampaigns;
