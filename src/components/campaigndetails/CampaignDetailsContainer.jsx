import { useEffect, useState } from 'react'
import CampaignDetails from './CampaignDetails'
import toast from 'react-hot-toast';
import { donateToCampaign, getCampaignDonation, updateCampaignStatus, getSpecificCampaign } from '../../context';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CampaignDetailsContainer = () => {
  
  const pathname = window.location.pathname.split("/");
  const campaignCode = pathname[pathname.length - 1];
  
  const { userName, userEmail } = useSelector((state) => state.user)
  

  const getUserCampaignDetails = () => {
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
      console.log("aggregatedDonationsArray : ");
      console.log(aggregatedDonationsArray);

      // for user view
      console.log("all donations")
      console.log(res);
      return res;
    });
  }

  useEffect(() => {    
    getSpecificCampaign(Number(campaignCode)).then((res) => {
      console.log(res);
    })
  }, []);

  const [isexpanded, setisexpanded] = useState(false);
  const [isAdmin, setisAdmin] = useState(true);
  const [amount, setAmount] = useState('');
  const [donors, setdonors] = useState([
    {
      id: 1,
      name: "Neil Sims",
      email: "email@flowbite.com",
      amount: "$320",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Bonnie Green",
      email: "email@flowbite.com",
      amount: "$3467",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Michael Gough",
      email: "email@flowbite.com",
      amount: "$67",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Thomas Lean",
      email: "email@flowbite.com",
      amount: "$2367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Lana Byrd",
      email: "email@flowbite.com",
      amount: "$367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Thomas Lean",
      email: "email@flowbite.com",
      amount: "$2367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Lana Byrd",
      email: "email@flowbite.com",
      amount: "$367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Thomas Lean",
      email: "email@flowbite.com",
      amount: "$2367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Lana Byrd",
      email: "email@flowbite.com",
      amount: "$367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Thomas Lean",
      email: "email@flowbite.com",
      amount: "$2367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Lana Byrd",
      email: "email@flowbite.com",
      amount: "$367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ])
  const totalRaised = 1249.99; // Example value, can be dynamic
  const goal = 2000; // Example goal, can be dynamic
  const topDonor = donors.reduce((prev, current) =>
    parseFloat(current.amount.replace('$', '')) > parseFloat(prev.amount.replace('$', ''))
      ? current
      : prev
  );
  const averageDonation = (totalRaised / donors.length).toFixed(2);
  const orders = [
    {
      transaction: 'Payment from Bonnie Green',
      date: 'Apr 23, 2021',
      amount: '$2300',
      status: 'Completed',
    },
    {
      transaction: 'Payment refund to #00910',
      date: 'Apr 23, 2021',
      amount: '-$670',
      status: 'Completed',
    },
    {
      transaction: 'Payment failed from #087651',
      date: 'Apr 18, 2021',
      amount: '$234',
      status: 'Cancelled',
    },
    {
      transaction: 'Payment failed from #087651',
      date: 'Apr 18, 2021',
      amount: '$234',
      status: 'Cancelled',
    },
    {
      transaction: 'Payment failed from #087651',
      date: 'Apr 18, 2021',
      amount: '$234',
      status: 'Cancelled',
    },
    {
      transaction: 'Payment failed from #087651',
      date: 'Apr 18, 2021',
      amount: '$234',
      status: 'Cancelled',
    },
    {
      transaction: 'Payment failed from #087651',
      date: 'Apr 18, 2021',
      amount: '$234',
      status: 'Cancelled',
    },
  ];

  const handleclick = (e) => {
    if (e.target.name == "pay") {
      if (amount > 0 && !isNaN(amount)) {
        updateCampaignStatus(campaignCode, 1).then((res) => {
          donateToCampaign({
            campaignCode,
            amount,
            userName,
            userEmail,
          }).then((res) => {
            console.log("Res", res);
            setdonors(res)
          })
        })
      }
      else {
        toast.error('Enter Valid Amount', 'warn');
      }
    }
    setisexpanded(!isexpanded)
  }

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div>
      <CampaignDetails
        handleClick={handleclick}
        isexpanded={isexpanded}
        amount={amount}
        handleInputChange={handleInputChange}
        isAdmin={isAdmin}
        donors={donors}
        totalRaised={totalRaised}
        goal={goal}
        topDonor={topDonor}
        averageDonation={averageDonation}
        orders={orders}
      />
    </div>
  )
}

export default CampaignDetailsContainer
