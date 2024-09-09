import React from 'react'
import VerifyCampaign from './VerifyCampaign'
import { useState, useEffect } from 'react';
import { getUserCampaigns } from '../../context';
import { addCampaign } from '../../redux/reducer/Campaign';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const VerifyCampaignContainer = () => {

  const { campaigns } = useSelector((state) => state.campaigns);
  const dispatch = useDispatch();
  

  const [categories, setCategories] = useState([
    { id: 'health', name: 'Health & Medical', count: 56, checked: false },
    { id: 'education', name: 'Education', count: 56, checked: false },
    { id: 'technology', name: 'Technology & Innovation', count: 56, checked: false },
    { id: 'environment', name: 'Environment', count: 97, checked: false },
    { id: 'business', name: 'Business & Startups', count: 97, checked: false },
    { id: 'animal', name: 'Animals & Pets', count: 97, checked: false },
    { id: 'projects', name: 'Creative Projects', count: 176, checked: false },
  ]);
  const [sortedCampaigns, setSortedCampaigns] = useState([])
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
          selectedCategories.includes(campaign.category)
        );
        setSortedCampaigns(filteredCampaigns);
      } else {
        setSortedCampaigns(campaigns);
      }
    };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedCampaigns.length / 4);
   // Calculate the items to display on the current page
   const startIndex = (currentPage - 1) * 4;
   const endIndex = startIndex + 4;
   const currentItems = sortedCampaigns.slice(startIndex, endIndex);
 
   // Create an array of page numbers to display
   const pageNumbers = [];

   for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getCampaignDetails = async () => {
    try {
      const res = await getUserCampaigns();
      dispatch(addCampaign(res));
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

  useEffect(() => {
    setSortedCampaigns(campaigns);
    getCampaignDetails();
  },[])
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
      pageNumbers={pageNumbers}
      />
      <div className='mt-7'>
        <Outlet/>
      </div>
    </div>
  )
}

export default VerifyCampaignContainer
