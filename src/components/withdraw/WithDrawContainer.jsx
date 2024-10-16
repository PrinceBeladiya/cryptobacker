import { useEffect, useState } from 'react';
import WithDraw from './WithDraw';
import { createWithdrawRequest, getUserCampaigns, getWithdraws } from '../../context';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

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

  const { userStatus } = useSelector((state) => state.user);

  useEffect(() => {
    getUserCampaigns().then((res) => {
      setCampaign(res);
      console.log("withdrawHistory :- ",withdrawHistory);
      
    })

    getWithdraws().then((res) => {
      console.log(res);
      setWithdrawHistory(res.data);
    })
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
      }

      const res = await createWithdrawRequest(data);
      getWithdraws().then((res) => {
        console.log(res.data);
        setWithdrawHistory(res.data);
        setIsLoading(false);
      })
      
      // Filter withdraw history for the selected campaign and sum the withdrawAmount
      const totalWithdrawnAmount = withdrawHistory
        .filter((withdraw) => withdraw.status === "Pending" && withdraw.campaignCode === selectedCampaign.campaignCode) // Adjust the field names accordingly
        .reduce((total, withdraw) => {
          return total + parseFloat(withdraw.withdrawAmount); // Convert to float in case it's a string
        }, 0);

      // Log the filtered withdraw history and total withdrawn amount for debugging
      console.log("Filtered Withdraw History for Selected Campaign:", withdrawHistory.filter((withdraw) => withdraw.campaignId === selected_campaign.id));
      console.log("Total Withdrawn Amount for Selected Campaign:", totalWithdrawnAmount);

      // Set the available amount state
      const availableBalance = (Number(selectedCampaign.amountCollectedETH) / 10 ** 18) - Number(totalWithdrawnAmount);
      setAvailableAmount(availableBalance);
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

        // Filter withdraw history for the selected campaign and sum the withdrawAmount
        const totalWithdrawnAmount = withdrawHistory
          .filter((withdraw) => withdraw.status === "Pending" && withdraw.campaignCode === selected_campaign.campaignCode) // Adjust the field names accordingly
          .reduce((total, withdraw) => {
            return total + parseFloat(withdraw.withdrawAmount); // Convert to float in case it's a string
          }, 0);

        // Log the filtered withdraw history and total withdrawn amount for debugging
        console.log("Filtered Withdraw History for Selected Campaign:", withdrawHistory.filter((withdraw) => withdraw.campaignId === selected_campaign.id));
        console.log("Total Withdrawn Amount for Selected Campaign:", totalWithdrawnAmount);

        // Set the available amount state
        const availableBalance = (Number(selected_campaign.amountCollectedETH) / 10 ** 18) - Number(totalWithdrawnAmount);
        setAvailableAmount(availableBalance);
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
