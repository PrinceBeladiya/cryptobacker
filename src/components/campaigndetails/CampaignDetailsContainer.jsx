import { useEffect, useState } from 'react'
import CampaignDetails from './CampaignDetails'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import { donateToCampaign, getCampaignDetails, getCampaignDonation, getSpecificCampaign, updateCampaignStatus } from '../../context';
import { useSelector } from 'react-redux';

const CampaignDetailsContainer = () => {
  const pathname = window.location.pathname.split("/");
  const campaignCode = pathname[pathname.length - 1];

  const [isAdmin, setIsAdmin] = useState(false);
  const [amount, setAmount] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const [campaign, setCampaign] = useState([]);
  const [donors, setdonors] = useState([]);
  const [isCampaignOver,setisCampaignOver] = useState([]);
  const [campaignEndReason, setCampaignEndReason] = useState('');
  const [aggregatedDonations, setAggregatedDonations] = useState([]);
  const [topDonor, setTopDonor] = useState({});
  const [totalDonation, setTotalDonation] = useState(0);
  const [filePaths, setFilePaths] = useState([]);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const { userName, userEmail, userStatus } = useSelector((state) => state.user)
  const progressPercentage = (Number(totalDonation) / 10 ** 18 / Number(campaign.target)) * 100;
  
  const getUserCampaignDetails = async () => {
    try {
      const campaignData = await getSpecificCampaign(campaignCode);
      setCampaign(campaignData[0]);

      const data = await getCampaignDetails(campaignCode);
      setFilePaths(data.filePaths);

      const donationData = await getCampaignDonation(campaignCode);
      
      // Aggregate donations
      const aggregated = donationData.reduce((acc, donation) => {
        const donor = donation.donor;
        if (acc[donor]) {
          acc[donor].amountETH += BigInt(donation.amountETH);
          acc[donor].amountUSDC += BigInt(donation.amountUSDC);
        } else {
          acc[donor] = {
            amountETH: BigInt(donation.amountETH),
            amountUSDC: BigInt(donation.amountUSDC),
            donorName: donation.donorName,
            donorEmail: donation.donorEmail,
            donor: donor,
            timestamp: donation.timestamp
          };
        }
        return acc;
      }, {});

      const aggregatedArray = Object.values(aggregated);
      setAggregatedDonations(aggregatedArray);

      // Calculate top donor
      const topDonor = aggregatedArray.reduce((max, donor) => 
        Number(donor.amountUSDC) > Number(max.amountUSDC) ? donor : max
      , {amountUSDC: 0, amountETH: 0});
      setTopDonor(topDonor);

      setdonors(donationData);

      // Calculate total donation
      const total = donationData.reduce((sum, donation) => sum + Number(donation.amountETH), 0);
      setTotalDonation(total);

      // Check if campaign is over
      checkCampaignStatus(campaignData[0], total);

    } catch (error) {
      console.error("Error fetching campaign details:", error);
      toast.error("Failed to load campaign details");
    }
  }

  const toggleImagePopup = () => {
    setIsImagePopupOpen(!isImagePopupOpen);
  };

  const checkCampaignStatus = (campaignData, totalDonation) => {
    const currentDate = new Date();
    const endDate = new Date(campaignData.deadline);
    const isDatePassed = currentDate > endDate;
    const isGoalReached = Number(totalDonation) >= Number(campaignData.target) * 10**18; // Convert target to wei

    if (isDatePassed || isGoalReached) {
      setisCampaignOver(true);
      setCampaignEndReason(isDatePassed ? 'Date passed' : 'Goal reached');
    } else {
      setisCampaignOver(false);
      setCampaignEndReason('');
    }
  }

  useEffect(() => {
    getUserCampaignDetails();
  }, []);

  const { id } = useParams();

  // updateCampaignStatus(campaignCode, 1);

  const handleclick = async (e) => {
    if (e.target.id == "pay") {
      setisLoading(true);
      const data = await getSpecificCampaign(campaignCode);
      const RecievedAmount = data[0].amountCollectedETH/10**18;
      const Target = data[0].target;
      const RemainAmount = Target - RecievedAmount;
      console.log("RemainAmount :- ",RemainAmount);
      if (amount > 0 && !isNaN(amount)) {
        if(amount > RemainAmount) {
          toast.error(`Amount Should be Less than or Equal ${RemainAmount}`);
          setisLoading(false);
          return;
        }
        donateToCampaign({
          campaignCode,
          amount,
          userName,
          userEmail,
        }).then((res) => {
          setdonors(res)
          setisLoading(false);  

          getUserCampaignDetails();
        }).catch((err) => {
          toast.error(err.message.split(" (")[0])
          setisLoading(false);  
        })
      }
      else {
        setisLoading(false);
        toast.error('Enter Valid Amount');
      }
    }
  }

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div>
      <CampaignDetails
        id={id}
        handleClick={handleclick}
        amount={amount}
        handleInputChange={handleInputChange}
        isAdmin={isAdmin}
        donors={donors}
        aggregatedDonations={aggregatedDonations}
        totalRaised={Number(totalDonation) / 10 ** 18}
        campaign={campaign}
        filePaths={filePaths}
        totalDonors={aggregatedDonations.length}
        topDonor={topDonor}
        isLoading={isLoading}
        averageDonation={Number(0) / 10 ** 18}
        userStatus={userStatus}
        progressPercentage={progressPercentage}
        isImagePopupOpen={isImagePopupOpen}
        toggleImagePopup={toggleImagePopup}
        isCampaignOver={isCampaignOver}
        campaignEndReason={campaignEndReason}
      />
    </div>
  )
}

export default CampaignDetailsContainer