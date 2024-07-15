import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { donateToCampaign, getSpecificCampaign } from '../context';
import { CountBox, CustomButton, Loader, SoftAlert } from '../componets';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';
import { ethers } from 'ethers';
import ReportIcon from '@mui/icons-material/Report'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 

const CampaignDetails = () => {
  const { address } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [campaign, setCampaign] = useState({});
  const [alerts, setAlerts] = useState([]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const data = await getSpecificCampaign(parseInt(address));
      setCampaign(data[0]);
    } catch (error) {
      console.error("Error fetching campaign data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDonate = async () => {
    setIsLoading(true);
    try {
      const data = await donateToCampaign(address, amount);
        setAlerts([
          {
            title: 'Success',
            color: 'success',
            icon: <CheckCircleIcon />,
            message: 'Success Donated',
          },
          ...alerts,
        ]);
    } catch (error) {
      setAlerts([
        {
          title: 'Error',
          color: 'danger',
          icon: <ReportIcon />,
          message: 'Transaction Falied Something Went Wrong!',
        },
        ...alerts,
      ]);
      console.error("Error donating to campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [address]);

  const formatBigNumber = (value, decimals = 18) => {
    if (!value) return '0';
    return ethers.utils.formatUnits(value, decimals);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={campaign.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl" />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage((Math.round(formatBigNumber(campaign.target) * 100) / 100).toFixed(2), (Math.round(formatBigNumber(campaign.amountCollected) * 100) / 100).toFixed(2))}%` }} />
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={daysLeft(campaign.deadline?.toNumber())} />
          <CountBox title={`Raised of ${formatBigNumber(campaign.target)} ETH`} value={`${(Math.round(formatBigNumber(campaign.amountCollected) * 100) / 100).toFixed(2)} ETH`} />
          <CountBox title="Total Backers" value={campaign.donators?.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{campaign.name}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{campaign.description}</p>
            </div>
          </div>
          {/* <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Donators</h4>
          </div> */}
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Fund</h4>   
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input 
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Back it because you believe in it.</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
              </div>
              <CustomButton 
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
