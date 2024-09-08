import { useEffect, useState } from 'react';
import WithDraw from './WithDraw';
import { createWithdrawRequest, getUserCampaigns, getWithdraws } from '../../context';
import toast from 'react-hot-toast';

const WithDrawContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [availableAmount, setAvailableAmount] = useState(1000);
  const [campaign, setCampaign] = useState();
  const [selectCampaignCode, setSelectCampaignCode] = useState(-1);
  const [withdrawHistory, setWithdrawHistory] = useState();
  const [selectedCampaign, setSelectedCampaign] = useState();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    campaign: 'NA',
    report: null, // Initialize with null instead of undefined
    title: '',
  });

  useEffect(() => {
    getUserCampaigns().then((res) => {
      setCampaign(res);
    })

    getWithdraws().then((res) => {
      setWithdrawHistory(res.data);
    })
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        campaign: selectedCampaign.title,
        campaignCode: selectedCampaign.campaignCode,
        campaignOwner: selectedCampaign.owner
      }

      const res = await createWithdrawRequest(data);
      console.log(res);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (name === 'campaign') {
      const selected_campaign = campaign.find(c => Number(c.campaignCode) === Number(value)); // Find the selected campaign
      setSelectCampaignCode(value);
      setFormData(prevState => ({
        ...prevState,
        campaign: value,
      }));
      if (selected_campaign) {
        setSelectedCampaign(selected_campaign);
        setAvailableAmount(selected_campaign.amountCollectedETH); // Set the available balance
      }
    }
  
    if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };  

  return (
    <div>
      <WithDraw
        form={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        withdrawHistory={withdrawHistory}
        isLoading={isLoading}
        availableAmount={availableAmount}
        campaign={campaign}
      />
    </div>
  );
};

export default WithDrawContainer;
