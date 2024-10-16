/* eslint-disable react/prop-types */
import { Card } from 'flowbite-react';

const WithDrawReview = ({ withdraw, extractFilePath }) => {
  console.log("withdraw :- ",withdraw);
  
  return (
    <Card className="bg-white shadow-lg rounded-lg">
      <div className="p-6 border-b border-gray-200">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-4">{campaign.title || 'No Title'}</h1> */}

        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <tbody>
          <tr className="border-t border-gray-200">
              <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Campaign Title</th>
              <td className="px-2 py-2 text-gray-800">{withdraw.campaign || 'N/A'}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">ID</th>
              <td className="px-2 py-2 text-gray-800">{withdraw._id || 'N/A'}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Owner ID</th>
              <td className="px-2 py-2 text-gray-800">{withdraw.campaignOwner || 'N/A'}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Requested Name</th>
              <td className="px-2 py-2 text-gray-800">{withdraw.name || 'N/A'}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Requested Amount</th>
              <td className="px-2 py-2 text-gray-800">{withdraw.withdrawAmount || 'N/A'}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <th className="px-2 py-2 font-medium text-gray-600 border-r border-gray-300">Last Modified</th>
              <td className="px-2 py-2 text-gray-800">{new Date(withdraw.updatedAt).toLocaleDateString() || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-6">

        <h3 className="text-lg font-medium text-gray-800 mb-2">Document Summary</h3>
        <p className="text-gray-600 mb-4">{withdraw.report || 'No report available'}</p>

        <h3 className="text-lg font-medium text-gray-800 mb-2">Supporting Documents</h3>
        <ul className="list-none list-inside mb-6">
          {/* Display the PDF inline using an iframe */}
          {withdraw.file && (
            <li className="mb-4 w-full">
              <embed
                src={`../../backend/${extractFilePath(withdraw.file)}`}
                type="application/pdf"
                width="100%"
                height="500px"
                className="border rounded-lg"
              />
            </li>
          )}
        </ul>
      </div>

      <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Approve
          </button>
        <button
          className={"bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"}
        >
          {withdraw.status == "Pending" ? "Reject" : withdraw.status == "Suspend" ? "Approve" : "Suspend"}
        </button>
      </div>
    </Card>
  );
};

export default WithDrawReview;
