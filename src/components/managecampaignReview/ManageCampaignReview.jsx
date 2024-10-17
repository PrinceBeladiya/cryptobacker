/* eslint-disable react/prop-types */
import { Card } from 'flowbite-react';

const ManageCampaignReview = ({ 
  campaign, 
  handleReject, 
  showRejectReason, 
  rejectReason, 
  setRejectReason, 
  submitRejectReason, 
  file,
  rejectionLoader,
  handleApprove,
  buttonLoader
}) => {
  return (
    <Card className="bg-white shadow-lg rounded-lg relative">
      {/* Campaign Status */}
      <div className="absolute top-4 right-2 mr-3">
        <span className={`px-4 py-1 rounded-lg text-sm font-semibold ${
          campaign.status === 0 ? 'bg-yellow-100 text-yellow-600' :
          campaign.status === 1 ? 'bg-green-100 text-green-600' :
          'bg-red-100 text-red-600'
        }`}>
          {campaign.status == 0 ? 'Pending' : 
          campaign.status === 1 ? 'Active' : 'Suspended'}
        </span>
      </div>

      {/* Campaign Title and Details */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{campaign.title || 'No Title'}</h1>

        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <tbody>
          <tr className="border-t border-gray-200">
              <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Campaign Code</th>
              <td className="px-2 py-2 text-gray-800">{campaign.campaignCode || '0'}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Creator</th>
              <td className="px-2 py-2 text-gray-800">{campaign.name || 'N/A'}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Created on</th>
              <td className="px-2 py-2 text-gray-800">
                {new Date(campaign.createdAt).toLocaleDateString() || 'N/A'}
              </td>
            </tr>
            <tr className="border-t border-gray-200">
              <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Target</th>
              <td className="px-2 py-2 text-gray-800">{campaign.target || 0} ETH</td>
            </tr>
            <tr className="border-t border-gray-200">
              <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Collected</th>
              <td className="px-2 py-2 text-gray-800">{campaign.amountCollectedETH / 10**18 || 0} ETH</td>
            </tr>
            <tr className="border-t border-gray-200">
              <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Category</th>
              <td className="px-2 py-2 text-gray-800">{campaign.category || 'N/A'}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Deadline</th>
              <td className="px-2 py-2 text-gray-800">
                {new Date(campaign.deadline).toLocaleDateString() || 'N/A'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Campaign Details and Supporting Documents */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Campaign Details</h2>
        <p className="text-gray-700 mb-4">{campaign.description || 'No description provided'}</p>

        <h3 className="text-lg font-medium text-gray-800 mb-2">Report Summary</h3>
        <p className="text-gray-600 mb-4">{campaign.report || 'No report available'}</p>

        <h3 className="text-lg font-medium text-gray-800 mb-2">Supporting Documents</h3>
        <ul className="list-none list-inside mb-6">
          {/* Display the PDF inline using an iframe */}
          {file && (
            <li className="mb-4">
              <embed
                src={`../../backend/${file}`}
                type="application/pdf"
                width="100%"
                height="500px"
                className="border rounded-lg"
              />
            </li>
          )}
        </ul>
      </div>

      {/* Buttons */}
      <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
        {campaign.status === 2 && 
          <button
          onClick={handleApprove}
          disabled={buttonLoader}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          {buttonLoader ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 ml-3 mb-1 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg> : 'Make Active'}
          </button>
        }
        <button
          onClick={handleReject}
          className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          {campaign.status === 2 ? "Delete" : "Suspend"}
        </button>
      </div>

      {/* Reject Reason Section */}
      {showRejectReason && (
        <div className="mt-4 p-4 bg-red-100 rounded-lg">
          <h3 className="text-lg font-medium text-red-800">
            {campaign.status === 2 ? "Provide Reason for Deleting" : "Provide Reason for Suspension"}
          </h3>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="w-full p-2 mt-2 border border-red-300 rounded-md"
            rows="4"
            placeholder={campaign.status === 2 ? "Please write the reason for delete campaign here..." : "Please write the reason for suspension here..."}
          ></textarea>
          <div className="flex justify-end mt-4">
            <button
              onClick={submitRejectReason}
              disabled={rejectionLoader}
              className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
              {rejectionLoader ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 ml-3 mb-1 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.3612 88.181 36.0674C89.0455 38.4251 91.5423 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                'Send Details'
              )}
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ManageCampaignReview;
