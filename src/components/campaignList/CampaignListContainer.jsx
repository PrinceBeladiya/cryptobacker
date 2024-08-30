import { useState, useEffect } from 'react';
import CampaignList from './CampaignList';


const CampaignListContainer = () => {
  const [sortedCampaigns, setSortedCampaigns] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([
    { id: 'apple', name: 'Apple', count: 56, checked: false },
    { id: 'fitbit', name: 'Fitbit', count: 56, checked: false },
    { id: 'dell', name: 'Dell', count: 56, checked: false },
    { id: 'asus', name: 'Asus', count: 97, checked: false },
    { id: 'logitech', name: 'Logitech', count: 97, checked: false },
    { id: 'msi', name: 'MSI', count: 97, checked: false },
    { id: 'bosch', name: 'Bosch', count: 176, checked: false },
    { id: 'sony', name: 'Sony', count: 234, checked: false },
    { id: 'samsung', name: 'Samsung', count: 76, checked: false },
    { id: 'canon', name: 'Canon', count: 49, checked: false },
    { id: 'microsoft', name: 'Microsoft', count: 45, checked: false },
    { id: 'razor', name: 'Razor', count: 49, checked: false },
  ]);

  const handleCheckboxChange = (id) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, checked: !category.checked } : category
    ));
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Fetch or set campaigns logic
    setSortedCampaigns([
      // Sample campaign data
      { id: '1', title: 'Tech for Good', description: 'Supporting technology-driven solutions for global challenges.', imageUrl: 'https://via.placeholder.com/400x300?text=Tech+for+Good' },
      { id: '2', title: 'Green Energy Initiative', description: 'Promoting renewable energy sources and sustainability.', imageUrl: 'https://via.placeholder.com/400x300?text=Green+Energy+Initiative' },
      { id: '3', title: 'Education for All', description: 'Ensuring access to quality education for underserved communities.', imageUrl: 'https://via.placeholder.com/400x300?text=Education+for+All' },
      { id: '4', title: 'Health and Wellness', description: 'Improving healthcare access and wellness programs.', imageUrl: 'https://via.placeholder.com/400x300?text=Health+and+Wellness' },
      { id: '5', title: 'Clean Water Project', description: 'Providing clean and safe drinking water to remote areas.', imageUrl: 'https://via.placeholder.com/400x300?text=Clean+Water+Project' },
      { id: '6', title: 'Disaster Relief', description: 'Offering aid and support in disaster-stricken regions.', imageUrl: 'https://via.placeholder.com/400x300?text=Disaster+Relief' },
      { id: '7', title: 'Animal Welfare', description: 'Protecting and caring for animals in need.', imageUrl: 'https://via.placeholder.com/400x300?text=Animal+Welfare' },
      { id: '8', title: 'Art and Culture', description: 'Supporting artistic and cultural initiatives and projects.', imageUrl: 'https://via.placeholder.com/400x300?text=Art+and+Culture' },
      { id: '9', title: 'Mental Health Awareness', description: 'Raising awareness and providing support for mental health issues.', imageUrl: 'https://via.placeholder.com/400x300?text=Mental+Health+Awareness' },
      { id: '10', title: 'Youth Empowerment', description: 'Empowering young people through various programs and initiatives.', imageUrl: 'https://via.placeholder.com/400x300?text=Youth+Empowerment' },
    ]);
  }, []);

  const handleNavigate = (id) => {
    // Navigation logic
    console.log('Navigate to campaign details with ID:', id);
  };

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
