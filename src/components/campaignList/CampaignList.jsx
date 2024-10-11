import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CampaignList = ({
  campaigns,
  isOpen,
  categories,
  handleCheckboxChange,
  toggleDropdown,
}) => {
  console.log(campaigns);
  
  return (
    <div>
      <section className='bg-gray-50 py-8 antialiased'>
        <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
          <div className='mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8'>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='mt-3 text-xl font-semibold text-gray-900 sm:text-2xl'
            >
              Campaigns
            </motion.h2>
            <div className='flex items-center space-x-4'>
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDropdown}
                  type="button"
                  className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto"
                >
                  <svg className="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"></path>
                  </svg>
                  Filters
                  <svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
                  </svg>
                </motion.button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 w-56 p-3 mt-2 bg-white rounded-lg shadow"
                    >
                      <h6 className="mb-3 text-sm font-medium text-gray-900">
                        Category
                      </h6>
                      <ul className="space-y-2 text-sm">
                        {categories.map((category) => (
                          <motion.li 
                            key={category.id} 
                            className="flex items-center"
                            whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                          >
                            <input
                              id={category.id}
                              type="checkbox"
                              checked={category.checked}
                              onChange={() => handleCheckboxChange(category.id)}
                              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-primary-500"
                            />
                            <label htmlFor={category.id} className="ml-2 text-sm font-medium text-gray-900">
                              {category.name} ({category.count})
                            </label>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4'
          >
            {campaigns.length > 0 ? (
              campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
                >
                  {campaign.filePaths && campaign.filePaths.length > 0 ? (
                    <div className="flex-shrink-0">
                      <img src={'../../backend/' + campaign.filePaths[0]} alt={campaign.title} className="h-48 w-full object-fit rounded-t-lg" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0">
                      <img src='/default-image.jpg' alt='Default' className="h-48 w-full object-fit rounded-t-lg" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{campaign.title}</h3>
                    <p className="mb-3 font-normal text-justify text-gray-700">{campaign.description.slice(0, 103) + "..."}</p>
                    <Link
                      to={'../campaign-detail/' + campaign.campaignCode}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                    >
                      View Details
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <p>No campaigns available</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CampaignList;