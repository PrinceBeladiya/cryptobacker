import { useEffect, useState } from 'react'
import CampaignDetails from './CampaignDetails'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import { donateToCampaign, getCampaignDonation, getSpecificCampaign, updateCampaignStatus } from '../../context';
import { useSelector } from 'react-redux';

const CampaignDetailsContainer = () => {
  const pathname = window.location.pathname.split("/");
  const campaignCode = pathname[pathname.length - 1];
  
  const [isAdmin, setIsAdmin] = useState(true);
  const [amount, setAmount] = useState('');

  const [campaign, setCampaign] = useState([]);
  const [donors, setdonors] = useState([]);
  const [aggregatedDonations, setAggregatedDonations] = useState([]);
  const [topDonor, setTopDonor] = useState({});
  const [totalDonation, setTotalDonation] = useState(0);

  const { userName, userEmail } = useSelector((state) => state.user)

  const getUserCampaignDetails = () => {
    getSpecificCampaign(campaignCode).then((res) => {
      setCampaign(res[0])
    });

    getCampaignDonation(campaignCode).then((res) => {
      // Aggregate donations by donor for admin view
      const aggregatedDonations = res.reduce((acc, donation) => {
        const donor = donation.donor;

        // If donor already exists in the accumulator, add to their totals
        if (acc[donor]) {
          acc[donor].amountETH += BigInt(donation.amountETH);
          acc[donor].amountUSDC += BigInt(donation.amountUSDC);
        } else {
          // If donor doesn't exist, create a new entry
          acc[donor] = {
            amountETH: BigInt(donation.amountETH),
            amountUSDC: BigInt(donation.amountUSDC),
            donorName: donation.donorName,
            donorEmail: donation.donorEmail,
            donor: donor,
            timestamp: donation.timestamp // Optional: You can decide how to handle the timestamp
          };
        }
        return acc;
      }, {});

      // Convert the aggregated donations object back into an array
      const aggregatedDonationsArray = Object.values(aggregatedDonations);

      // Now set the state with the aggregated donations
      setAggregatedDonations(aggregatedDonationsArray);

      let top_donor = {
        amountUSDC: 0,
        amountETH: 0
      };
      aggregatedDonationsArray.map((donation) => {
        Number(donation.amountUSDC) > Number(top_donor.amountUSDC) ? top_donor = donation : ''
      });
      setTopDonor(top_donor);

      // for user view
      setdonors(res);

      let sum = 0
      res.map((donation) => {
        sum += Number(donation.amountETH)
      })
      setTotalDonation(sum);
    });
  }

  useEffect(() => {
    getUserCampaignDetails();
  }, []);

  const { id } = useParams();

  const handleclick = (e) => {
    if (e.target.name == "pay") {
      if (amount > 0 && !isNaN(amount)) {
        updateCampaignStatus(campaignCode, 1).then(() => {
          donateToCampaign({
            campaignCode,
            amount,
            userName,
            userEmail,
          }).then((res) => {
            setdonors(res)
          })
        })
      }
      else {
        toast.error('Enter Valid Amount', 'warn');
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
        totalRaised={Number(totalDonation) / 10**18}
        campaign={campaign}
        totalDonors={aggregatedDonations.length}
        topDonor={topDonor}
        averageDonation={Number(0) / 10**18}
      />
    </div>
  )
}

export default CampaignDetailsContainer
