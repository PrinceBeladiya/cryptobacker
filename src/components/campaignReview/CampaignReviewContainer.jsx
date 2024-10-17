import React, { useEffect, useState } from 'react';
import CampaignReview from './CampaignReview';
import { useParams, useNavigate } from 'react-router-dom';
import { getCampaignDetails, getCampaigns, updateCampaignStatus, getUser } from '../../context';
import toast from 'react-hot-toast';
import { addCampaign } from '../../redux/reducer/Campaign';
import { useDispatch } from 'react-redux';

const CampaignReviewContainer = () => {
  const { campaignCode } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonloader,setbuttonloader] = useState(false);
  const [rejectionloader,setrejectionloader] = useState(false);
  const [error, setError] = useState(null);
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await getCampaignDetails(campaignCode);
        setCampaign(res);
      } catch (error) {
        setError("Failed to load campaign details.");
        setMessage("Error: Unable to fetch campaign details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignCode]);

  const handleApprove = async () => {
    if (!campaign) return;
    setbuttonloader(true);

    const confirmApprove = window.confirm("Are you sure you want to approve this campaign?");
    if (!confirmApprove) {
      setbuttonloader(false);
      return; 
    }
      updateCampaignStatus(campaignCode, 1).then((res) => {
        getCampaigns().then((res) => {
          dispatch(addCampaign(res));
        })
        setCampaign(res);
        setbuttonloader(false);
        toast.success("Success: Campaign approved successfully!");
        navigate('/verify-campaign');
        })
        .catch((err) => {
          toast.error("Error: Failed to activate the campaign.");
          setbuttonloader(false);
          console.log(err);
          
        })
  };

  const handleReject = () => {
    setShowRejectReason(true);
  };

  const submitRejectReason = async () => {
    const campaign1 = await getCampaignDetails(campaignCode); // owner
    const userDetails = await getUser(campaign1.owner);
    if (!rejectReason.trim()) {
      return;
    }
    setrejectionloader(true);
    const confirmReject = window.confirm("Are you sure you want to reject this campaign?");
    if (!confirmReject){
      setrejectionloader(false);
       return;
    }
    
    updateCampaignStatus(campaignCode, 2).then((res) => {
      getCampaigns().then((res) => {
        dispatch(addCampaign(res));
      })
      setCampaign(res); 
      const data = {
        ownerName: userDetails.data.name,
        ownerEmail: userDetails.data.email,
        campaignTitle: campaign.title,
        status: 'Rejected Campaingn',
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
      toast.success("Campaign rejected successfully!",'warn');
      navigate('/verify-campaign');
      })
      .catch((err) => {
        toast.error("Failed to reject the campaign.",'warn');
        setrejectionloader(false);
        console.log(err);
        
      })
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
      <CampaignReview 
        campaign={campaign}
        handleApprove={handleApprove}
        handleReject={handleReject}
        showRejectReason={showRejectReason}
        rejectReason={rejectReason}
        setRejectReason={setRejectReason}
        submitRejectReason={submitRejectReason}
        buttonloader={buttonloader}
        rejectionloader={rejectionloader}
      />
  );
};

export default CampaignReviewContainer;
