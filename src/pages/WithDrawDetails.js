import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { donateToCampaign, getSpecificCampaign } from '../context';
import { CountBox, CustomButton, FormField, Loader, SoftAlert } from '../componets';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';
import { ethers } from 'ethers';
import ReportIcon from '@mui/icons-material/Report'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 

const WithDrawDetails = () => {
  const { address } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [campaign, setCampaign] = useState({});
  const [alerts, setAlerts] = useState([]);

  const [form,setForm] = useState({
    amount: '',
    purpose: '',
    pdf: null
})

const percentage = campaign.target ? (campaign.amountCollected / campaign.target) * 100 : 0;

const handleFormFieldChange = (fieldName, value) => {
      setForm({ ...form, [fieldName]: value });
  };

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
    if(amount < remainamount())
    {
        setIsLoading(true);
        try {
          const data = await donateToCampaign(address,amount);
            setAlerts([
              {
                title: 'Success',
                color: 'success',
                icon: <CheckCircleIcon />,
                message: 'Successfully Donated',
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
    }
    else
    {
      setAlerts([
        {
          title: 'Error',
          color: 'danger',
          icon: <ReportIcon />,
          message: `You Can Donate Upto ${remainamount()} For This Campaign`,
        },
        ...alerts,
      ]);
    }
  };

  const handleCloseAlert = (title) => {
    setAlerts(alerts.filter((alert) => alert.title !== title));
  };

  useEffect(() => {
    getData();
  }, [address,alerts]);

  const formatBigNumber = (value, decimals = 18) => {
    if (!value) return '0';
    return ethers.utils.formatUnits(value, decimals);
  };

  const remainamount = () => {
    const required = formatBigNumber(campaign.target);
    const collection = formatBigNumber(campaign.amountCollected);

    return required - collection;
  }

  const collected = (Math.round(formatBigNumber(campaign.amountCollected) * 100) / 100).toFixed(2);

  return (
    <div>
      {isLoading && <Loader />}

      {alerts.length > 0 && (
        <div className="absolute top-4 right-4">
          <SoftAlert items={alerts} onClose={handleCloseAlert} />
        </div>
      )}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
      <div className="flex-1 flex-col">
          <img src={campaign.image} alt="campaign" className="w-full h-[410px] transition-all duration-700 ease-in-out object-fill rounded-xl" />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2 transition-all duration-600 ease-in-out overflow-hidden group hover:h-5">
            <div
              className="absolute h-full bg-[#4acd8d] transition-all duration-2000 ease-in-out group-hover:h-10"
              style={{ width: `${percentage}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {`${percentage.toFixed(2)}%`}
            </div>
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
              Requset For Fund
            </p>
            <div className="mt-[30px]">
            <FormField
                  labelName="Enter Amount"
                  placeholder="ETH 0.50"
                  inputType="text"
                  value={form.amount}
                  handleChange={(e) => handleFormFieldChange('amount', e.target.value)}
                />
              <div className='mt-3'></div>
              <FormField
                labelName="Enter Purpose"
                placeholder="Purpose For Withdraw"
                inputType="text"
                value={form.amount}
                handleChange={(e) => handleFormFieldChange('purpose',e.target.value)}
              />
              <div className='mt-3'></div>
              <FormField
                labelName="Upload Report"
                placeholder="Upload Purpose Report"
                inputType="file"
                value={form.amount}
                handleChange={(e) => handleFormFieldChange('purpose',e.target.value)}
              />
              <CustomButton 
                btnType="button"
                title={collected > 0 ? "Send Requset" : "No Amount To Withdraw"}
                styles={collected > 0 ? "w-full bg-[#8c6dfd] mt-4" : "w-full bg-[#c6b6fe] mt-4"}
                handleClick={handleDonate}
                disable={collected > 0 ? false : true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithDrawDetails;

