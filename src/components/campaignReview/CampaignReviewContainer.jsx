import React, { useEffect, useState } from 'react';
import CampaignReview from './CampaignReview';
import { useParams, useNavigate } from 'react-router-dom';
import { getCampaignDetails, updateCampaignStatus } from '../../context';
import toast from 'react-hot-toast';

const CampaignReviewContainer = () => {
  const { campaignCode } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const navigate = useNavigate();

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

    const confirmApprove = window.confirm("Are you sure you want to approve this campaign?");
    if (!confirmApprove) return;

    setUpdating(true);
    try {
      updateCampaignStatus(campaignCode, 1).then((res) => {
        console.log(res);
        setCampaign(res);
      }).catch((err) => {
        setMessage("Error: Failed to approve the campaign.");
        setMessage("Error: Failed to approve the campaign.");
        console.log(err);
      });
      setMessage("Success: Campaign approved successfully!");
    } catch (error) {
      setMessage("Error: Failed to approve the campaign.");
    } finally {
      setUpdating(false);
    }
  };

  const handleReject = () => {
    setShowRejectReason(true); // Show the rejection reason input
  };

  const submitRejectReason = async () => {
    if (!rejectReason.trim()) {
      setMessage("Error: Please provide a reason for rejection.");
      return;
    }

    const confirmReject = window.confirm("Are you sure you want to reject this campaign?");
    if (!confirmReject) return;

    setUpdating(true);
    try {
      updateCampaignStatus(campaignCode, 2).then((res) => {
        console.log(res);
        setCampaign(res);
        toast.success("Campaign rejected successfully!",'warn');
        setShowRejectReason(false); // Hide the rejection note section after submission
      }).catch((err) => {
        toast.error("Failed to reject the campaign.",'warn');
        console.log(err);
      });
    } catch (error) {
      toast.error("Failed to reject the campaign.",'warn');
    } finally {
      setUpdating(false);
    }
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
        updating={updating}
      />
  );
};

export default CampaignReviewContainer;
