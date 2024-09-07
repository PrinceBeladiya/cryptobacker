 import { Card } from 'flowbite-react';
 import React, { useState } from 'react';

    const VerifyCampaign = ({toggleDropdown,isOpen,sortedCampaigns,categories,handleCheckboxChange}) => {
    return (
        <Card>
         <div className="p-4 bg-white">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Verify Campaigns</h1>
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            type="button"
                            className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100"
                        >
                            <svg className="h-4 w-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"></path>
                            </svg>
                            Filters
                            <svg className="h-4 w-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="absolute z-10 right-0 mt-2 w-56 p-3 bg-white rounded-lg shadow-lg border border-gray-200">
                                <h6 className="mb-3 text-sm font-medium text-gray-900">Category</h6>
                                <ul className="space-y-2 text-sm">
                                    {categories.map((category) => (
                                        <li key={category.id} className="flex items-center">
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
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            <tr>
                                <th className="py-3 px-6 text-left">Campaign Name</th>
                                <th className="py-3 px-6 text-left">Creator</th>
                                <th className="py-3 px-6 text-left">Date Created</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800 dark:text-gray-200">
                            {sortedCampaigns.map((campaign) => (
                                <tr key={campaign.campaignCode} className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="py-3 px-6">{campaign.title}</td>
                                    <td className="py-3 px-6">{campaign.name}</td>
                                    <td className="py-3 px-6">{new Date(campaign.createdAt).toLocaleDateString('en-GB')}</td>
                                    <td className="py-3 px-6">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${campaign.status === 0 ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                                            {campaign.status == 0 ? 'Pending' : 'Approved'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <a href={`/verify-campaign/${campaign.campaignCode}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                            Review
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
    };

    export default VerifyCampaign;
