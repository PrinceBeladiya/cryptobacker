import { useState, useEffect, useMemo } from 'react';
import CampaignList from './CampaignList';
import { getAllCampaignDetails, getCampaigns } from '../../context';
import { addCampaign } from '../../redux/reducer/Campaign';
import { useDispatch, useSelector } from 'react-redux';

const CampaignListContainer = () => {
  const [sortedCampaigns, setSortedCampaigns] = useState([]);
  const { campaigns } = useSelector((state) => state.campaigns);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
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

  const updateCategoryCounts = () => {
    setCategories(prevCategories => 
      prevCategories.map(category => ({
        ...category,
        count: countCategoriesLength(category.id)
      }))
    );
  };

  const handleCheckboxChange = (id) => {
    // Update the checked status of the selected category
    const updatedCategories = categories.map(category =>
      category.id === id ? { ...category, checked: !category.checked } : category
    );
    setCategories(updatedCategories);

    // Filter campaigns based on selected categories
    const selectedCategories = updatedCategories
      .filter(category => category.checked)
      .map(category => category.id);

    if (selectedCategories.length > 0) {
      const filteredCampaigns = campaigns.filter(campaign =>
        selectedCategories.includes(campaign.category)
      );
      setSortedCampaigns(filteredCampaigns);
    } else {
      // If no category is selected, show all campaigns
      setSortedCampaigns(campaigns);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  // const getCampaignDetails = async () => {
  //   try {

  //     const blockchainCampaigns = await getCampaigns();
  //     console.log("BLOCKCHAIN CAMPAIGNS:", blockchainCampaigns);

  //     const mongoCampaigns = await getAllCampaignDetails();
  //     console.log("MONGODB CAMPAIGNS:", mongoCampaigns);

  //     const mergedCampaigns = blockchainCampaigns.map(blockchainCampaign => {
  //       const mongoCampaign = mongoCampaigns.find(mongo => mongo.campaignCode === blockchainCampaign.campaignCode);

  //       return {
  //         ...blockchainCampaign,
  //         filePaths: mongoCampaign ? mongoCampaign.filePaths : [],
  //       };
  //     });

  //     dispatch(addCampaign(mergedCampaigns));
  //     setSortedCampaigns(mergedCampaigns);
  //   } catch (error) {
  //     console.error("Error fetching campaign details:", error);
  //   }
  // };

  const getCampaignDetails = async () => {
    try {
      const blockchainCampaigns = await getCampaigns();
      console.log("BLOCKCHAIN CAMPAIGNS:", blockchainCampaigns);
  
      const mongoCampaigns = await getAllCampaignDetails();
      console.log("MONGODB CAMPAIGNS:", mongoCampaigns);
  
      // Merge blockchain and MongoDB campaigns and filter by status == 1
      const mergedCampaigns = blockchainCampaigns
        .map(blockchainCampaign => {
          const mongoCampaign = mongoCampaigns.find(mongo => mongo.campaignCode === blockchainCampaign.campaignCode);
  
          return {
            ...blockchainCampaign,
            filePaths: mongoCampaign ? mongoCampaign.filePaths : [],
          };
        }) // Only include campaigns with status == 1
  
      // Dispatch filtered campaigns to the Redux store
      dispatch(addCampaign(mergedCampaigns));
  
      // Set sortedCampaigns state to display only filtered campaigns
      setSortedCampaigns(mergedCampaigns);
    } catch (error) {
      console.error("Error fetching campaign details:", error);
    }
  };

  useEffect(() => {
    getCampaignDetails();
  }, []);

  useEffect(() => {
    updateCategoryCounts();
  }, [sortedCampaigns, countCategoriesLength]);

  return (
    <CampaignList
      campaigns={sortedCampaigns}
      handleCheckboxChange={handleCheckboxChange}
      isOpen={isOpen}
      categories={categories}
      toggleDropdown={toggleDropdown}
    />
  );
};

export default CampaignListContainer;
