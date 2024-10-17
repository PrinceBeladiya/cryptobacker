import { useEffect, useState } from 'react';
import WithDraw from './WithDraw';
import { createWithdrawRequest, getUserCampaigns, getWithdraws } from '../../context';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const WithDrawContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [availableAmount, setAvailableAmount] = useState(0);
  const [campaign, setCampaign] = useState();
  const [selectCampaignCode, setSelectCampaignCode] = useState(-1);
  const [withdrawHistory, setWithdrawHistory] = useState();
  const [selectedCampaign, setSelectedCampaign] = useState();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    campaign: 'NA',
    report: null,
    title: '',
  });

  const { userStatus } = useSelector((state) => state.user);

  useEffect(() => {
    getUserCampaigns().then((res) => {
      setCampaign(res);
    });

    getWithdraws().then((res) => {
      setWithdrawHistory(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        ...formData,
        campaign: selectedCampaign.title,
        campaignCode: selectedCampaign.campaignCode,
        campaignOwner: selectedCampaign.owner
      };

      const res = await createWithdrawRequest(data);
      getWithdraws().then((res) => {
        setWithdrawHistory(res.data);
        setIsLoading(false);
      });
      
      updateAvailableAmount(selectedCampaign);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const updateAvailableAmount = (campaign) => {
    if (!campaign || !withdrawHistory) return;

    const totalWithdrawnAmount = withdrawHistory
      .filter((withdraw) => withdraw.status === "Pending" && withdraw.campaignCode === campaign.campaignCode)
      .reduce((total, withdraw) => total + parseFloat(withdraw.withdrawAmount), 0);

    const availableBalance = campaign.amountCollectedUSDC - totalWithdrawnAmount;
    setAvailableAmount(availableBalance);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === 'campaign') {
      const selected_campaign = campaign.find(c => Number(c.campaignCode) === Number(value));
      setSelectCampaignCode(value);
      setFormData(prevState => ({
        ...prevState,
        campaign: value,
      }));
      
      if (selected_campaign) {
        setSelectedCampaign(selected_campaign);
        updateAvailableAmount(selected_campaign);
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
        userStatus={userStatus}
      />
      <div className='mt-7'>
        <Outlet />
      </div>
    </div>
  );
};

export default WithDrawContainer;