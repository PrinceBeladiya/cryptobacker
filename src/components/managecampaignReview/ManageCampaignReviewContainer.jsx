import React, { useEffect, useState } from 'react';
import ManageCampaignReview from './ManageCampaignReview'
import { useParams, useNavigate } from 'react-router-dom';
import { getCampaignDetails, getSpecificCampaign, updateCampaignStatus } from '../../context';
import toast from 'react-hot-toast';

const ManageCampaignReviewContainer = () => {
  const { campaignCode } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [rejectionLoader, setRejectionLoader] = useState(false);
  const [error, setError] = useState(null);
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const navigate = useNavigate(); // Store navigate instance here

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await getSpecificCampaign(campaignCode);
        const file = await getCampaignDetails(campaignCode);
        setCampaign(res[0]);
        setFile(file.filePaths[1]);
      } catch (error) {
        setError("Failed to load campaign details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignCode]);

  const handleApprove = async () => {
    if (!campaign) return;

    setButtonLoader(true);
    const confirmApprove = window.confirm("Are you sure you want to activate this campaign?");
    if (!confirmApprove) return;
    
    try {
      const res = await updateCampaignStatus(campaignCode, 1);
      setCampaign(res);
      setButtonLoader(false);
      toast.success("Campaign activated successfully!");
      navigate('/manage-campaign'); // Use the navigate instance directly here
    } catch (err) {
      toast.error("Error: Failed to activate the campaign.");
      setButtonLoader(false);
    }
  };

  const handleReject = () => {
    setShowRejectReason(true);
  };

  const submitRejectReason = async () => {
    setRejectionLoader(true);
    if (!rejectReason.trim()) {
      if(campaign.status === 2){
        toast.error("Please provide a reason for deletion");
      }else{
        toast.error("Please provide a reason for suspension");
      }
      setRejectionLoader(false);
      return;
    }

    const confirmReject = window.confirm("Are you sure you want to reject this campaign?");
    if (!confirmReject) {
      setRejectionLoader(false);
      return;
    }

    if (campaign.status === 1) {
      try {
        const res = await updateCampaignStatus(campaignCode, 2);
        setCampaign(res);
        toast.success("Campaign suspended successfully!");
        navigate('/manage-campaign');
      } catch (err) {
        toast.error("Error: Failed to suspend the campaign.");
      } finally {
        setRejectionLoader(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <ManageCampaignReview 
      campaign={campaign}
      handleApprove={handleApprove}
      handleReject={handleReject}
      showRejectReason={showRejectReason}
      rejectReason={rejectReason}
      setRejectReason={setRejectReason}
      submitRejectReason={submitRejectReason}
      buttonLoader={buttonLoader}
      rejectionLoader={rejectionLoader}
      file={file}
    />
  );
};

export default ManageCampaignReviewContainer;
