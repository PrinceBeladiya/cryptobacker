import React from 'react'
import VerifyCampaign from './VerifyCampaign'
import { useState, useEffect } from 'react';
import { getUserCampaigns } from '../../context';
import { addCampaign } from '../../redux/reducer/Campaign';
import { useDispatch, useSelector } from 'react-redux';

const VerifyCampaignContainer = () => {

  const { campaigns } = useSelector((state) => state.campaigns);
  const dispatch = useDispatch();
  console.log(campaigns);
  

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

  const getCampaignDetails = async () => {
    getUserCampaigns()
      .then((res) => {
        console.log(res);
        dispatch(addCampaign(res))
        setSortedCampaigns(res)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    setSortedCampaigns(campaigns);
    getCampaignDetails();
  },[])
  return (
    <VerifyCampaign 
    categories={categories}
    isOpen={isOpen}
    toggleDropdown={toggleDropdown}
    sortedCampaigns={sortedCampaigns}
    handleCheckboxChange={handleCheckboxChange}
    />
  )
}

export default VerifyCampaignContainer
