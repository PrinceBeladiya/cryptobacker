import { Card } from 'flowbite-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../context';

const VerifyUser = ({
  toggleDropdown,
  isOpen,
  categories,
  handleCheckboxChange,
  handlePageChange,
  currentPage,
  totalPages,
  currentItems,
  pageNumbers,
  onSearchByUserID,
  searchValue,
  handleSearchChange
}) => {
  return (
    <Card>
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          {/* Right-side container for search and filter */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Search input */}
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search by User ID"
              className="w-64 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
            {/* Filter button */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                type="button"
                className="flex items-center justify-center rounded-lg border border-gray-200 bg-white dark:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
                  ></path>
                </svg>
                Filters
                <svg
                  className="h-4 w-4 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 9-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {isOpen && (
                <div className="absolute z-10 right-0 mt-2 w-56 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                  <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">Status</h6>
                  <ul className="space-y-2 text-sm">
                    {categories.map((category) => (
                      <li key={category.id} className="flex items-center">
                        <input
                          id={category.id}
                          type="checkbox"
                          checked={category.checked}
                          onChange={() => handleCheckboxChange(category.id)}
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-primary-500 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor={category.id}
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          {category.name} ({category.count})
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table for displaying users */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="py-3 px-6 text-left">User ID</th>
                <th className="py-3 px-6 text-left">User Name</th>
                <th className="py-3 px-6 text-left">User Email</th>
                <th className="py-3 px-6 text-left">Date Created</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-200">
              {currentItems.map((user) => (
                <tr key={user._id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-6">{user._id}</td>
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">
                    {new Date(user.createdAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${user.status == 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                        user.status == 'Approve' ? 'bg-green-200 text-green-800' :
                          user.status == 'Suspend' ? 'bg-red-200 text-red-800' : ''
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <Link
                      to={`/verify-user/${user._id}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end mt-4">
          <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-8 text-sm">
              <li>
                <a
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                    }`}
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
                    className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === page ? 'bg-blue-50 text-blue-600 border-blue-300 dark:bg-gray-700 dark:text-white' : ''
                      }`}
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
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
                    }`}
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
      </div>
    </Card>
  );
};

export default VerifyUser;
