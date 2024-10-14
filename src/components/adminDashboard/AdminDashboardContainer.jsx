import React, { useState, useRef, useEffect } from 'react';
import AdminDashBoard from './AdminDashBoard';
import { getAllCampaignDetails, getCampaigns, getAllUsers } from '../../context';
import { useDispatch, useSelector } from 'react-redux';
import { addCampaign } from '../../redux/reducer/Campaign';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [tabBounds, setTabBounds] = useState({ left: 0, width: 0 });
  const { userID } = useSelector((state) => state.user);
  const { campaigns } = useSelector((state) => state.campaigns);
  const [mongoCampaign, setMongoCampaign] = useState([]);
  const [campaignsData, setCampaignsData] = useState([]);
  const [usersData,setusersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const tabRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const activeTabElement = tabRefs.current[activeTabIndex];
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setTabBounds({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  const tabs = [
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'users', label: 'Users' },
    { id: 'withdrawals', label: 'Withdrawals' },
  ];

  const withdrawalsData = [
    { id: 1, user: 'John Doe', amount: '$100', date: '2024-10-05', status: 'Pending' },
    { id: 2, user: 'Jane Smith', amount: '$250', date: '2024-10-06', status: 'Completed' },
  ];

  const getCampaignDetails = async () => {
    try {
      const res = await getCampaigns();
      const mongores = await getAllCampaignDetails();

      setMongoCampaign(mongores);

      // Filter campaigns reviewed by the current user
      const userSignedCampaigns = mongores.filter((campaign) => campaign.reviewedBy === userID);

      // Filter campaigns from `res` based on the campaignCode in `userSignedCampaigns`
      const resCampaign = res.filter((item) =>
        userSignedCampaigns.some((sortedItem) => sortedItem.campaignCode === item.campaignCode)
      );

      // Dispatch the filtered campaigns to the Redux store
      dispatch(addCampaign(resCampaign));

      // Update local state with the dispatched campaigns from Redux
      setCampaignsData(resCampaign);

    } catch (error) {
      console.error("Error fetching campaign details:", error);
    }
  };

  const handleReview = (status, campaignCode) => {
    console.log("Clicked");

    if (status === 0) {
      toast.success('You Will Be Redirected To the Verify Campaign...', 'success');
      setTimeout(() => {
        navigate(`/verify-campaign/${campaignCode}`); // Use navigate from the component scope
      }, 1800);
    } else {
      toast.success('You Will Be Redirected To the Manage Campaign...', 'success');
      setTimeout(() => {
        navigate(`/manage-campaign/${campaignCode}`);
      }, 1800);
    }
  };

  const filteredCampaigns = React.useMemo(() => 
    campaignsData?.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [],
    [campaignsData, searchTerm]
  );

  const filteredUsers = React.useMemo(() => 
    usersData?.filter(user => 
      user._id.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [],
    [usersData, searchTerm]
  );

  const handleUserClick = (userid) => {
    toast.success('You Will Be Redirected To the Verify User...', 'success');
    setTimeout(() => {
      navigate(`/verify-user/${userid}`);
    }, 1800);
  }

  const getUserDetails = async() => {
    const users = await getAllUsers();
    console.log("users :- ",users);
    setusersData(users.data);
  }

  useEffect(() => {
    getCampaignDetails();
    getUserDetails();
  }, []); // Runs only once when the component mounts

  return (
    <AdminDashBoard
      tabs={tabs}
      campaignsData={campaignsData}
      usersData={usersData}
      withdrawalsData={withdrawalsData}
      activeTab={activeTab}
      tabBounds={tabBounds}
      tabRefs={tabRefs}
      setActiveTab={setActiveTab}
      handleReview={handleReview}
      handleUserClick={handleUserClick}
      filteredUsers={filteredUsers}
      filteredCampaigns={filteredCampaigns}
      setSearchTerm={setSearchTerm}
      searchTerm={searchTerm}
    />
  );
};

export default AdminDashboardContainer;
