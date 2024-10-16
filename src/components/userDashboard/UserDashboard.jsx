/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { Card } from "flowbite-react";
import { FolderOpen } from 'lucide-react';
import { getContractBalance, getContractUSDCBalance, getUSDCBalance, getWithdrawableAmount, getWithdrawals, withdrawFromCampaign } from "../../context";
const UserDashboard = ({
  chartRef,
  userCampaigns,
  campaigns,
  handleclick,
  toggleDropdown,
  isOpen,
  categories,
  handleCheckboxChange,
  currentWeekDonation,
  growth,
  userStatus
}) => {
  const handleClick = async() => {
    console.log("Balanace : ", await getContractBalance()); // get contract balance
    console.log("Balanace : ", await getContractUSDCBalance()); // get contract usdc balance
    console.log("Balanace : ", await getWithdrawableAmount(0)); // get withable amount from the campaign
    console.log("USDC Balanace : ", await getUSDCBalance()); // get usdc balance of the user
    console.log("Withdraws : ", await getWithdrawals()); // get withdrawals data
    withdrawFromCampaign(0, 100)
  }
  return (
    <>
      {userStatus && userStatus == "Approve" ? (
        <>
          {
            campaigns.length === 0
              ?
              <div className="flex items-center justify-center -mt-3 h-screen">
                <Card className="w-full max-w-md shadow-lg bg-blue-50">
                  <div className="flex flex-col items-center p-8 text-center">
                    <FolderOpen className="w-20 h-20 text-blue-400 mb-6" />
                    <h2 className="text-2xl font-bold text-blue-700 mb-3">No Campaigns Yet</h2>
                    <p className="text-blue-600">
                      You haven't created any campaigns. Your future campaigns and their donation history will appear here.
                    </p>
                  </div>
                </Card>
              </div>
              :
              <div>
                {console.log(chartRef.current)}
                <div className='flex pt-5 w-full overflow-hidden bg-gray-50'>
                  <div className="p-4 mb-6 bg-white border w-full border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6" style={{marginLeft : '16px', marginRight: '16px'}}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-shrink-0">
                        <span className="text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">{currentWeekDonation} ETH</span>
                        <h3 className="text-base font-light text-gray-500 dark:text-gray-400">Donation this week</h3>
                      </div>
                      <div className="flex items-center justify-end flex-1 text-base font-medium text-green-500 dark:text-green-400">
                        {growth}%
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                    <div id="main-chart" ref={chartRef}></div>
                    <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
                      <div className="flex-shrink-0">
                        <a href="#" className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700">
                          Donation Report
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 mx-4 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                  {/* <!-- Card header --> */}
                  <div className="items-center justify-between lg:flex">
                    <div className="mb-4 lg:mb-0">
                      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Campaigns</h3>
                      <span className="text-base font-normal text-gray-500 dark:text-gray-400">This is a list of your camapaigns</span>
                    </div>
                    <div className="items-center sm:flex">
                      <div className="flex items-center">
                        {/* DropDown Menu */}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center p-4">
                          <div className="relative">
                            <button
                              onClick={toggleDropdown}
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                              type="button"
                            >
                              Filter by category
                              <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                            </button>

                            {isOpen && (
                              <div className="absolute z-10 w-56 p-3 mt-2 bg-white rounded-lg shadow dark:bg-gray-700">
                                <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                  Category
                                </h6>
                                <ul className="space-y-2 text-sm">
                                  {categories.map((category) => (
                                    <li key={category.id} className="flex items-center">
                                      <input
                                        id={category.id}
                                        type="checkbox"
                                        checked={category.checked}
                                        onChange={() => handleCheckboxChange(category.id)}
                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      />
                                      <label htmlFor={category.id} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
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
                    </div>
                  </div>
                  {/* <!-- Table --> */}
                  <div className="flex flex-col mt-6">
                    <div className="overflow-x-auto rounded-lg">
                      <div className="inline-block w-full align-middle">
                        <div className="shadow sm:rounded-lg">
                          <table className="w-full divide-y divide-gray-200 dark:divide-gray-600">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                              <tr>
                                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                  Camapaign Name
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                  Date &amp; Time
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white" style={{ width: '230px' }}>
                                  Amount Collected in ETH
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white" style={{ width: '230px' }}>
                                  Amount Collected in USDC
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                  Target
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                  Status
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                  Detail
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800">
                              {userCampaigns && userCampaigns.map((campaign) => (
                                <tr key={campaign.campaignCode}>
                                  <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                    {campaign.title}
                                  </td>
                                  <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    {campaign.createdAt}
                                  </td>
                                  <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white" style={{ paddingLeft: '55px' }}>
                                    {Number(campaign.amountCollectedETH) / 10 ** 18} ETH
                                  </td>
                                  <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white" style={{ paddingLeft: '55px' }}>
                                    {campaign.amountCollectedUSDC / 10 ** 6} USDC
                                  </td>
                                  <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-gray-400" style={{ paddingLeft: '22px' }}>
                                    {campaign.target} ETH
                                  </td>
                                  <td className="p-4 whitespace-nowrap">
                                    {campaign.status == 1 ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">Approved</span>
                                      : <span className="bg-orange-100 text-orange-800 text-xs mr-2 font-medium px-2.5 py-0.5 rounded-md">Pending</span>}
                                  </td>
                                  <td>
                                    <Link to={`../campaign-detail/${campaign.campaignCode}`} className="text-blue-700 bg-whit hover:text-blue-900 font-medium text-sm px-10 py-2.5 text-center inline-flex items-center">
                                      More Details
                                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                      </svg>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Card Footer --> */}
                  <div className="flex items-center justify-between pt-3 sm:pt-6">
                    <div>
                      <button
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        type="button"
                        data-dropdown-toggle="transactions-dropdown"
                      >
                        Last 7 days
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                      {/* <!-- Dropdown menu --> */}
                      <div
                        className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                        id="transactions-dropdown"
                        style={{
                          position: 'absolute',
                          inset: 'auto auto 0px 0px',
                          margin: '0px',
                          transform: 'translate3d(82.4px, 3120px, 0px)',
                        }}
                        data-popper-placement="top"
                        data-popper-reference-hidden=""
                        data-popper-escaped=""
                      >
                        <div className="px-4 py-3" role="none">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white" role="none">
                            Sep 16, 2021 - Sep 22, 2021
                          </p>
                        </div>
                        <ul className="py-1" role="none">
                          <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Yesterday</a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Today</a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Last 7 days</a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Last 30 days</a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Last 90 days</a>
                          </li>
                        </ul>
                        <div className="py-1" role="none">
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Custom...</a>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <a href="#" className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700">
                        Transactions Report
                        <svg className="w-4 h-4 ml-1 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
          }
        </>
      ) : (
        <div className="flex items-center justify-center -mt-3 h-screen">
          <Card className="w-full max-w-md shadow-lg bg-blue-50">
            <div className="flex flex-col items-center p-8 text-center">
              <h2 className="text-2xl font-bold text-blue-700 mb-3">Account Status is: <span className="underline" style={{ color: '#E3A008' }}>{userStatus}</span></h2>
              <p className="text-blue-600">
                your user authentication is in progress currently you can't access the dashboard.
              </p>
            </div>
          </Card>
        </div>
      )
      }
      <button onClick={handleClick}>Withdraw</button>
    </>
  );
};

export default UserDashboard; 