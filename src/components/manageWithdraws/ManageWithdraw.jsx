import React from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ManageWithdraw = ({ 
  handlePageChange, 
  currentPage, 
  totalPages, 
  currentItems, 
  pageNumbers, 
  searchValue, 
  handleSearchChange,
}) => {
  return (
    <Card>
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Manage Withdraw
          </motion.h1>
          <div className="flex items-center space-x-4 ml-auto">
            <motion.input
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search by Campaign Name"
              className="w-64 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <AnimatePresence>
          {currentItems.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <tr>
                      <th className="py-3 px-6 text-left">Campaign Name</th>
                      <th className="py-3 px-6 text-left">Creator</th>
                      <th className="py-3 px-6 text-left">Date Created</th>
                      <th className="py-3 px-6 text-left">Requested</th>
                      <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 dark:text-gray-200">
                    <AnimatePresence>
                      {currentItems.map((withdraw, index) => (
                        <motion.tr
                          key={withdraw._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-gray-200 dark:border-gray-700"
                        >
                          <td className="py-3 px-6">{withdraw.title}</td>
                          <td className="py-3 px-6">{withdraw.name}</td>
                          <td className="py-3 px-6">
                            {new Date(withdraw.createdAt).toLocaleDateString('en-GB')}
                          </td>
                          <td className="py-3 px-6 ml-1">
                            {withdraw.withdrawAmount} USDC  
                          </td>
                          <td className="py-3 px-6">
                            <Link
                              to={`/manages-withdraw/${withdraw._id}`}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              Review
                            </Link>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-4">
                <nav aria-label="Page navigation example">
                  <ul className="flex items-center -space-x-px h-8 text-sm">
                    <li>
                      <a
                        href="#"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                      >
                        <span className="sr-only">Previous</span>
                        <svg
                          className="w-2.5 h-2.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                          />
                        </svg>
                      </a>
                    </li>
                    {pageNumbers.map((page) => (
                      <li key={page}>
                        <a
                          href="#"
                          onClick={() => handlePageChange(page)}
                          className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === page ? 'bg-blue-50 text-blue-600 border-blue-300 dark:bg-gray-700 dark:text-white' : ''}`}
                        >
                          {page}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        href="#"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                      >
                        <span className="sr-only">Next</span>
                        <svg
                          className="w-2.5 h-2.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-10"
            >
              <motion.svg 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="mx-auto h-12 w-12 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </motion.svg>
              <motion.h3 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                No campaigns available
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-1 text-sm text-gray-500 dark:text-gray-400"
              >
                There are currently no campaigns to verify.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default ManageWithdraw;