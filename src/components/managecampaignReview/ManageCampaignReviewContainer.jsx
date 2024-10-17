import React, { useEffect, useState } from 'react';
import ManageCampaignReview from './ManageCampaignReview'
import { useParams, useNavigate } from 'react-router-dom';
import { getCampaignDetails, getSpecificCampaign, updateCampaignStatus, getCampaigns, deleteCampaign, getUser } from '../../context';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addCampaign } from '../../redux/reducer/Campaign';
import { sendMail } from '../../context/index';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleApprove = () => {
    if (!campaign) return;

    setButtonLoader(true);
    const confirmApprove = window.confirm("Are you sure you want to activate this campaign?");
    if (!confirmApprove){
      setButtonLoader(false);
      return;
    }
    updateCampaignStatus(campaignCode, 1).then((res) => {
    getCampaigns().then((res) => {
      dispatch(addCampaign(res));
    })
    setCampaign(res);
    setButtonLoader(false);
    toast.success("Campaign activated successfully!");
    navigate('/manage-campaign');
    })
    .catch((err) => {
      toast.error("Error: Failed to activate the campaign.");
      setButtonLoader(false);
    })
  };

  const handleReject = () => {
    console.log("campaign")
    console.log(campaign)
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

    let confirmReject;
    if(campaign.status === 2){
      confirmReject = window.confirm("Are you sure you want to delete this campaign?");
    }
    else{
      confirmReject = window.confirm("Are you sure you want to suspend this campaign?");
    }

    if (!confirmReject) {
      setRejectionLoader(false);
      return;
    }

      const campaign1 = await getCampaignDetails(campaignCode);
      const userDetails = await getUser(campaign1.owner);
       
    if (campaign.status === 1) {
        updateCampaignStatus(campaignCode, 2).then((res) => {
        getCampaigns().then((res) => {
          dispatch(addCampaign(res));
        })
        const data = {
          ownerName: userDetails.data.name,
          ownerEmail: userDetails.data.email,
          campaignTitle: campaign.title,
          status: 'Campaign Suspended',
          reason: rejectReason
        };
        sendMail(data)
        .then(res => {
          
        })
        .catch(res => {
          
        })
        setCampaign(res);
        setRejectionLoader(false); 
        setShowRejectReason(false);
        setRejectReason('');
        toast.success("Campaign suspended successfully!");
        navigate('/manage-campaign');
        })
        .catch((err) => {
          toast.error("Error: Failed to suspend the campaign.");
          setRejectionLoader(false);
        })
      }
      else{
        deleteCampaign(campaignCode).then((res) => {
          getCampaigns().then((res) => {
            dispatch(addCampaign(res));
          })
          const data = {
            ownerName: userDetails.data.name,
            ownerEmail: userDetails.data.email,
            campaignTitle: campaign.title,
            status: 'Campaign Deleted',
            reason: rejectReason
          };
          sendMail(data)
          .then(res => {
            
          })
          .catch(res => {
            
          })
          setCampaign(res);
          setRejectionLoader(false); 
          setShowRejectReason(false);
          setRejectReason('');
          toast.success("Campaign deleted successfully!");
          navigate('/manage-campaign');
          })
          .catch((err) => {
            toast.error("Error: Failed to delete the campaign.");
            setRejectionLoader(false);
          })
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
