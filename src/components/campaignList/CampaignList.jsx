import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, ArrowRight } from 'lucide-react';

const CampaignList = ({
  categories,
  handleCheckboxChange,
  isOpen,
  searchTerm,
  toggleDropdown,
  filteredCampaigns,
  setSearchTerm
}) => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-gray-900 mb-8 text-center"
        >
          Explore Campaigns
        </motion.h1>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 ml-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDropdown}
              className="flex items-center space-x-2 bg-white border border-gray-300 rounded-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              <ChevronDown className="h-4 w-4" />
            </motion.button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <div className="p-4">
                    <h6 className="text-sm font-medium text-gray-900 mb-3">
                      Categories
                    </h6>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <motion.div 
                          key={category.id} 
                          className="flex items-center"
                          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                        >
                          <input
                            id={category.id}
                            type="checkbox"
                            checked={category.checked}
                            onChange={() => handleCheckboxChange(category.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor={category.id} className="ml-2 text-sm text-gray-700">
                            {category.name} ({category.count})
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48">
                  <img 
                    src={campaign.filePaths && campaign.filePaths.length > 0 ? '../../backend/' + campaign.filePaths[0] : '/default-image.jpg'} 
                    alt={campaign.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4">{campaign.description.slice(0, 100)}...</p>
                  <Link
                    to={`../campaign-detail/${campaign.campaignCode}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">No campaigns available</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CampaignList;