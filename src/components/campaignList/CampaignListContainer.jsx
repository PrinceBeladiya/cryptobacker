import { useState, useEffect } from 'react';
import CampaignList from './CampaignList';
import { getAllCampaignDetails, getSpecificCampaign } from '../../context';
import { addCampaign } from '../../redux/reducer/Campaign';
import { useDispatch, useSelector } from 'react-redux';


const CampaignListContainer = () => {
  const [sortedCampaigns, setSortedCampaigns] = useState([])
  const { campaigns } = useSelector((state) => state.campaigns);
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    getSpecificCampaign(0).then((res) => {
      console.log(res);
    })
  }, []);

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
  const getCampaignDetails = async () => {
    getAllCampaignDetails()
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
    getCampaignDetails();
  },
    []);

  const handleNavigate = (id) => {
    // Navigation logic
    console.log('Navigate to campaign details with ID:', id);
  };

  console.log("campaigns : ", sortedCampaigns);

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
