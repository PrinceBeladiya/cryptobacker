import React from 'react'
import { useState, useEffect } from 'react';
import { getUserCampaigns } from '../../context';
import { addCampaign } from '../../redux/reducer/Campaign';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import ManageCampaign from './ManageCampaign';

const ManageCampaignContainer = () => {

  const { campaigns } = useSelector((state) => state.campaigns);
  const dispatch = useDispatch();
  

  const [categories, setCategories] = useState([
    { id: 0, name: 'Pending', count: 56, checked: false },
    { id: 1, name: 'Approved', count: 56, checked: false },
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
          selectedCategories.includes(campaign.status)
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

  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    onSearchByCampaignName(e.target.value);
  };

  const onSearchByCampaignName = (query) => {
    setSearchValue(query);
    const filtered = currentItems.filter(campaign =>
      campaign.title.toLowerCase().includes(query.toLowerCase())
    );
    setSortedCampaigns(filtered);
  };

  const getCampaignDetails = async () => {
    try {
      const res = await getUserCampaigns();
      dispatch(addCampaign(res));
      if (Array.isArray(res)) { 
        setSortedCampaigns(res);
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
      <ManageCampaign 
      categories={categories}
      isOpen={isOpen}
      toggleDropdown={toggleDropdown}
      handleCheckboxChange={handleCheckboxChange}
      handlePageChange={handlePageChange}
      currentPage={currentPage}
      totalPages={totalPages}
      currentItems={currentItems}
      pageNumbers={pageNumbers}
      searchValue={searchValue}
      handleSearchChange={handleSearchChange}
      />
      <div className='mt-7'>
        <Outlet/>
      </div>
    </div>
  )
}

export default ManageCampaignContainer
