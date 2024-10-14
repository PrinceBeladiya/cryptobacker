import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import VerifyCampaign from './VerifyCampaign';
import { getCampaigns, setCampaignReviewer, getAllCampaignDetails } from '../../context';
import { addCampaign } from '../../redux/reducer/Campaign';
import toast from 'react-hot-toast';

const VerifyCampaignContainer = () => {
  const { campaigns } = useSelector((state) => state.campaigns);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userID } = useSelector((state) => state.user)
  
  const [sortedCampaigns, setSortedCampaigns] = useState([]);
  const [mongoCampaign, setmongoCampaign] = useState([]);

  const countCategoriesLength = useMemo(() => (name) => {
    return sortedCampaigns.filter((campaign) => campaign.category === name).length;
  }, [sortedCampaigns]);

  const [categories, setCategories] = useState([
    { id: 'health', name: 'Health & Medical', count: 0, checked: false },
    { id: 'education', name: 'Education', count: 0, checked: false },
    { id: 'technology', name: 'Technology & Innovation', count: 0, checked: false },
    { id: 'environment', name: 'Environment', count: 0, checked: false },
    { id: 'business', name: 'Business & Startups', count: 0, checked: false },
    { id: 'animal', name: 'Animals & Pets', count: 0, checked: false },
    { id: 'projects', name: 'Creative Projects', count: 0, checked: false },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const updateCategoryCounts = () => {
    setCategories(prevCategories => 
      prevCategories.map(category => ({
        ...category,
        count: countCategoriesLength(category.id)
      }))
    );
  };

  const handleCheckboxChange = (id) => {
    const updatedCategories = categories.map(category =>
      category.id === id ? { ...category, checked: !category.checked } : category
    );
    setCategories(updatedCategories);

    const selectedCategories = updatedCategories
      .filter(category => category.checked)
      .map(category => category.id);

    if (selectedCategories.length > 0) {
      const filteredCampaigns = campaigns.filter(campaign =>
        selectedCategories.includes(campaign.category) && campaign.status === 0
      );
      setSortedCampaigns(filteredCampaigns);
    } else {
      setSortedCampaigns(campaigns.filter(campaign => campaign.status === 0));
    }

    setCurrentPage(1);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const getCampaignDetails = async () => {
    try {
      const res = await getCampaigns();
      const mongores = await getAllCampaignDetails();
      setmongoCampaign(mongores);
      const unreviewedCampaign = mongores.filter(campaign => campaign.reviewedBy === null);
      console.log("unreviewedCampaign :- ",unreviewedCampaign);
      
      const resCampaign = res.filter(item => unreviewedCampaign.some(sortedItem =>  sortedItem.campaignCode === item.campaignCode)) ;
      console.log("resCampaign :- ",resCampaign);
      
      dispatch(addCampaign(resCampaign));
      if (Array.isArray(res)) {
        const filteredCampaigns = res.filter(obj => obj.status === 0);
        setSortedCampaigns(filteredCampaigns);
      } else {
        console.error("Error: Response is not an array", res);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlereview = (campaignCode) => {
    const campaign = mongoCampaign.find(campaign => campaign.campaignCode === campaignCode);
  
    if (!campaign) {
      toast.error('Campaign not found');
      return;
    }
  
    if (campaign.reviewedBy === null || campaign.reviewedBy === userID) {
      const confirmApprove = window.confirm("Are you sure you want to manage this campaign?");
      if (confirmApprove) {
        setCampaignReviewer(campaignCode)
          .then(res => {
            if (res.status === true) {
              navigate(`/verify-campaign/${campaignCode}`);
            }
          })
          .catch(err => {
            console.error("Error managing campaign:", err);
          });
      }
    } else {
      toast.error('Campaign already reviewed by someone else.');
    }
  };
  
  

  useEffect(() => {
    getCampaignDetails();
  }, []);

  useEffect(() => {
    const filteredCampaigns = campaigns.filter(obj => obj.status === 0);
    setSortedCampaigns(filteredCampaigns);
  }, [campaigns]);

  useEffect(() => {
    updateCategoryCounts();
  }, [sortedCampaigns, countCategoriesLength]);

  const totalPages = Math.ceil(sortedCampaigns.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCampaigns.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedCampaigns, currentPage]);

  return (
    <div>
      <VerifyCampaign 
        categories={categories}
        isOpen={isOpen}
        toggleDropdown={toggleDropdown}
        handleCheckboxChange={handleCheckboxChange}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
        currentItems={currentItems}
        handlereview={handlereview}
        pageNumbers={pageNumbers}
      />
      <div className='mt-7'>
        <Outlet/>
      </div>
    </div>
  );
};

export default VerifyCampaignContainer;