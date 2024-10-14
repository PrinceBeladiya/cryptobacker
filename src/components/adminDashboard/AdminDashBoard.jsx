import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Users, FileText, DollarSign, TrendingUp, Search } from 'lucide-react';

const SummaryCard = React.memo(({ title, value, icon: Icon, color }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md p-6 flex items-start"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className={`rounded-full p-3 mr-6 ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <div style={{marginLeft: '10px'}}>
      <motion.h3 
        className="text-sm font-semibold text-gray-600 mb-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-2xl font-bold text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {value}
      </motion.p>
    </div>
  </motion.div>
));

const AdminDashboard = ({tabs, campaignsData, usersData, activeTab, tabBounds, tabRefs, setActiveTab, handleReview, handleUserClick ,filteredUsers, filteredCampaigns, searchTerm, setSearchTerm}) => {
  const renderPlaceholder = useCallback((message) => (
    <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
      <AlertCircle className="text-gray-400 mr-2" size={20} />
      <span className="text-gray-500">{message}</span>
    </div>
  ), []);

  const renderTableCell = useCallback((content, defaultMessage = "Not available") => (
    <td className="py-4 px-6">
      {content || renderPlaceholder(defaultMessage)}
    </td>
  ), [renderPlaceholder]);

  return (
    <motion.div 
      className="p-8 bg-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-8 text-gray-800"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>
      
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <SummaryCard title="Total Users" value={usersData ? usersData.length : 0} icon={Users} color="bg-blue-500" />
        <SummaryCard title="Active Campaigns" value={campaignsData ? campaignsData.filter(c => c.status === 1).length : 0} icon={FileText} color="bg-green-500" />
        <SummaryCard title="Pending Campaigns" value={campaignsData ? campaignsData.filter(c => c.status !== 1).length : 0} icon={TrendingUp} color="bg-yellow-500" />
        <SummaryCard title="Total Revenue" value="$10,234" icon={DollarSign} color="bg-purple-500" />
      </div>

      {/* Main Content */}
      <motion.div 
        className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Tabs and Search Bar */}
        <div className="bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <nav className="flex flex-grow">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                ref={el => tabRefs.current[index] = el}
                className={`py-4 px-6 font-medium focus:outline-none ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </nav>
          <div className="relative mr-8 w-64">
            <input
              type="text"
              placeholder={activeTab === 'campaigns' ? "Search by Campaign Name" : "Search by User ID"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-2 ml-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {activeTab === 'campaigns' && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Campaigns</h2>
                {filteredCampaigns.length > 0 ? (
                  <div className="overflow-x-auto" style={{height: '300px'}}>
                    <table className="w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creator</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCampaigns.map((item, index) => (
                          <motion.tr 
                            key={item.campaignCode} 
                            className="hover:bg-gray-50"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            {renderTableCell(item.title)}
                            {renderTableCell(item.name)}
                            {renderTableCell(new Date(item.createdAt).toLocaleDateString('en-GB'))}
                            <td className="px-6 py-4 whitespace-nowrap">
                              {item.status !== undefined ? (
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  item.status === 0
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : item.status === 1 
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {item.status === 0 ? 'Pending' : item.status === 1 ? 'Active' : 'Suspended'}
                                </span>
                              ) : renderPlaceholder("Status unknown")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <motion.button 
                                onClick={() => handleReview(item.status, item.campaignCode)}
                                className="text-blue-600 hover:text-blue-900"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Review
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : renderPlaceholder("No matching campaigns found")}
              </>
            )}

            {activeTab === 'users' && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Users</h2>
                {filteredUsers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user, index) => (
                          <motion.tr 
                            key={user._id} 
                            className="hover:bg-gray-50"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            {renderTableCell(user._id)}
                            {renderTableCell(user.name)}
                            {renderTableCell(user.email)}
                            {renderTableCell(new Date(user.createdAt).toLocaleDateString('en-GB'))}
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.status ? (
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  user.status === "Suspend"
                                    ? 'bg-red-100 text-red-800'
                                    : user.status === "Approve" 
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {user.status === "Suspend" ? 'Suspended' : user.status === "Approve" ? 'Active' : 'Pending'}
                                </span>
                              ) : renderPlaceholder("Status unknown")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <motion.button 
                                onClick={() => handleUserClick(user._id)}
                                className="text-blue-600 hover:text-blue-900"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Review
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : renderPlaceholder("No matching users found")}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;  