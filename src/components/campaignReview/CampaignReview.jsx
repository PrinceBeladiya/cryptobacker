import { Card } from 'flowbite-react';
import React from 'react';

const CampaignReview = ({ campaign, handleReject, handleApprove }) => {
  return (
    <Card className="bg-white shadow-lg rounded-lg">
      <div className="p-6 border-b border-gray-200">
  <h1 className="text-3xl font-bold text-gray-800 mb-4">{campaign.title || 'No Title'}</h1>
  
  <table className="table-auto w-full text-left border-collapse border border-gray-300">
    <tbody>
      <tr className="border-t border-gray-200">
        <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Creator</th>
        <td className="px-2 py-2 text-gray-800">{campaign.name || 'N/A'}</td>
      </tr>
      <tr className="border-t border-gray-200">
        <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Created on</th>
        <td className="px-2 py-2 text-gray-800">{new Date(campaign.createdAt).toLocaleDateString() || 'N/A'}</td>
      </tr>
      <tr className="border-t border-gray-200">
        <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Target</th>
        <td className="px-2 py-2 text-gray-800">${campaign.target || 0}</td>
      </tr>
      <tr className="border-t border-gray-200">
        <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Category</th>
        <td className="px-2 py-2 text-gray-800">{campaign.category || 'N/A'}</td>
      </tr>
      <tr className="border-t border-gray-200">
        <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Campaign Code</th>
        <td className="px-2 py-2 text-gray-800">{campaign.campaignCode || 'N/A'}</td>
      </tr>
      <tr className="border-t border-gray-200">
        <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Deadline</th>
        <td className="px-2 py-2 text-gray-800">{new Date(campaign.deadline).toLocaleDateString() || 'N/A'}</td>
      </tr>
    </tbody>
  </table>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Campaign Details</h2>
        <p className="text-gray-700 mb-4">{campaign.description || 'No description provided'}</p>

        <h3 className="text-lg font-medium text-gray-800 mb-2">Report Summary</h3>
        <p className="text-gray-600 mb-4">{campaign.report || 'No report available'}</p>

        <h3 className="text-lg font-medium text-gray-800 mb-2">Supporting Documents</h3>
        <ul className="list-none list-inside mb-6">
          {/* Display the PDF inline using an iframe */}
          {campaign.filePaths && campaign.filePaths[1] && (
            <li className="mb-4">
              <iframe
                src={`http://localhost:3001/${campaign.filePaths[1].replace(/\\/g, '/')}`}
                title="Supporting Document PDF"
                width="100%"
                height="500px"
                className="border rounded-lg"
              ></iframe>
            </li>
          )}
        </ul>
      </div>

      <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
        <button
          onClick={handleApprove}
          className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          Approve
        </button>
        <button
          onClick={handleReject}
          className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          Reject
        </button>
      </div>
    </Card>
  );
};

export default CampaignReview;
