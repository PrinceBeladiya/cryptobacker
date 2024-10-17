import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllUsers, getAllWithdraws, getCampaignDetails, getSpecificCampaign, getUser, getWithdrawRequestByID, getWithdraws, sendMail, withdrawFromCampaign } from '../../context'; // Ensure the function is imported correctly
import WithDrawReview from './WithDrawReview';
import toast from 'react-hot-toast';
import { addWithdraws } from '../../redux/reducer/Withdraws'
import { useDispatch } from 'react-redux';

const WithDrawReviewContainer = () => {
  const { withdrawid } = useParams(); // Extracting the withdrawal ID from the URL
  const [withdraw, setWithdraw] = useState(null); // State to store the withdrawal data
  const [loading, setLoading] = useState(true); // Loading state
  const [rejectionloader,setrejectionloader] = useState(false);
  const [buttonloader,setbuttonloader] = useState(false);
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the withdrawal data by ID
    getWithdrawRequestByID(withdrawid)
      .then((res) => {
        setWithdraw(res.data); // Set the fetched data
        setLoading(false); // Stop loading once the data is ready
      })
      .catch((err) => {
        toast.error('Failed to fetch withdrawal data'); // Show error toast
        console.error('Error fetching withdrawal:', err);
        setLoading(false); // Stop loading even if there’s an error
      });
  }, [withdrawid]);

  // Function to extract the file path from a URL (complete or remove as necessary)
  const extractFilePath = (url) => {
    try {
      const filePath = new URL(url).pathname; // Extracts the file path from the URL
      return filePath;
    } catch (error) {
      console.error('Invalid URL:', error);
      return '';
    }
  };

  const handleapprove = (campaignCode, withdrawAmount) => {
    console.log('Clicked');
    
    setbuttonloader(true);
    withdrawFromCampaign(campaignCode, withdrawAmount)
    .then((res) => {
      getAllWithdraws()
      .then((res) => {
        dispatch(addWithdraws(res.data));
        console.log(res);
        toast.success('Fund Transfer Successfully');
        navigate('/manages-withdraw');
        setbuttonloader(false);
      })
    })
    .catch((err) => {
      toast.error('Fund Not Transfered');
      setbuttonloader(false);
    })
  }

  const handlereject = () => {
    setShowRejectReason(true);
  }

  const submitRejectReason = async(campaignCode) => {
    setrejectionloader(true);

    const campaign = await getCampaignDetails(campaignCode); // owner
    const userDetails = await getUser(campaign.owner); 
    const data = {
      ownerName: userDetails.data.name,
      ownerEmail: userDetails.data.email,
      campaignTitle: campaign.title,
      status: 'Rejected WithDraw Request',
      reason: rejectReason
    };
    
    sendMail(data)
    .then(res => {
      setrejectionloader(false); 
      setShowRejectReason(false);
      setRejectReason('');
    })
    .catch(res => {
      setrejectionloader(false); 
      setShowRejectReason(false);
      setRejectReason('');
    })
  }

  if (loading) {
    return <div>Loading...</div>; // Render loading state while fetching
  }

  if (!withdraw) {
    return <div>No withdrawal data found.</div>; // Show error if no data is available
  }

  return (
    <WithDrawReview
      withdraw={withdraw} // Pass the fetched withdrawal data to the child component
      extractFilePath={extractFilePath} // Pass the file path extraction function
      handleapprove={handleapprove}
      handlereject={handlereject}
      showRejectReason={showRejectReason}
      rejectionloader={rejectionloader}
      rejectReason={rejectReason}
      setRejectReason={setRejectReason}
      buttonloader={buttonloader}
      submitRejectReason={submitRejectReason}
    />
  );
};

export default WithDrawReviewContainer;
