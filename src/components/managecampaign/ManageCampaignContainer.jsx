import React, { useCallback } from 'react'
import { useState, useEffect, useMemo } from 'react';
import { getAllCampaignDetails, getCampaigns } from '../../context';
import { addCampaign } from '../../redux/reducer/Campaign';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import ManageCampaign from './ManageCampaign';

const ManageCampaignContainer = () => {
  const { campaigns } = useSelector((state) => state.campaigns);
  const { userID } = useSelector((state) => state.user);
  console.log("campaigns :- ",campaigns);
  
  const dispatch = useDispatch();

  const countFilterLength = useCallback((status) => {
   if (status === 'Approved') {
      return campaigns.filter((campaign) => campaign.status === 1).length;
    } else {
      return campaigns.filter((campaign) => campaign.status === 2).length;
    }
  }, [campaigns]);

  const [categories, setCategories] = useState([
    { id: 1, name: 'Approved', count: 0, checked: false },
    { id: 2, name: 'Suspended', count: 0, checked: false },
  ]);
  
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const itemsPerPage = 4;

  const handleCheckboxChange = (id) => {
    const updatedCategories = categories.map(category =>
      category.id === id ? { ...category, checked: !category.checked } : category
    );
    setCategories(updatedCategories);

    const selectedCategories = updatedCategories
      .filter(category => category.checked)
      .map(category => category.id);

    filterCampaigns(selectedCategories, searchValue);
  };

  const filterCampaigns = (selectedCategories, search) => {
    let filtered = campaigns;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(campaign =>
        selectedCategories.includes(campaign.status)
      );
    }

    if (search) {
      filtered = filtered.filter(campaign =>
        campaign.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredCampaigns(filtered);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
    
    const selectedCategories = categories
      .filter(category => category.checked)
      .map(category => category.id);

    filterCampaigns(selectedCategories, newSearchValue);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const getCampaignDetails = async () => {
    try {
      const res = await getCampaigns();
      const mongores = await getAllCampaignDetails();
      const unreviewedCampaign = mongores.filter(campaign => campaign.reviewedBy === null || campaign.reviewedBy === userID);
      const resCampaign = res.filter(item => unreviewedCampaign.some(sortedItem =>  sortedItem.campaignCode === item.campaignCode));
      const filteredCampaigns = resCampaign.filter(campaign => (campaign.status === 1 || campaign.status === 2));
      dispatch(addCampaign(filteredCampaigns));
      if (Array.isArray(filteredCampaigns)) { 
        setFilteredCampaigns(filteredCampaigns);
      } else {
        console.error("Error: Response is not an array", res);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCampaigns, currentPage]);

  const pageNumbers = useMemo(() => {
    const numbers = [];
    for (let i = 1; i <= totalPages; i++) {
      numbers.push(i);
    }
    return numbers;
  }, [totalPages]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    getCampaignDetails();
  }, []);

  useEffect(() => {
    setFilteredCampaigns(campaigns);
    setCategories([
      { id: 0, name: 'Pending', count: countFilterLength('Pending'), checked: false },
      { id: 1, name: 'Approved', count: countFilterLength('Approved'), checked: false },
      { id: 2, name: 'Suspended', count: countFilterLength('Suspended'), checked: false },
    ]);
  }, [campaigns,countFilterLength]);

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