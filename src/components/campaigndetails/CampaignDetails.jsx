/* eslint-disable react/prop-types */
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Button } from 'flowbite-react';
const CampaignDetails = ({
  handleClick,
  amount,
  handleInputChange,
  isAdmin,
  donors,
  aggregatedDonations,
  totalRaised,
  campaign,
  topDonor,
  totalDonors,
  averageDonation,
  filePaths,
  isLoading,
  userStatus
}) => {
  return (
    <section className="py-8 bg-white md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="min-w-40 min-h-60"
              src={`../../backend/${filePaths[0]}`}
              alt="Campaign"
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              {campaign.title}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {totalRaised} ETH
              </p>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <p className="text-sm ml-2 font-medium leading-none text-gray-500">
                  {'Out of '}
                </p>
                <p className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline">
                  {Number(campaign.target)} ETH
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 my-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${Math.min((totalRaised / Number(campaign.target)) * 100, 100)}%` }}
              ></div>
            </div>
            {userStatus && userStatus == "Approve" ? (
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <div className="flex items-center space-x-4">
                  {
                    campaign && (campaign.status == 0 || campaign.status == 2) ? (
                      <p>
                        Campaign is still
                        <span
                          className={`mx-2 px-2 py-1 text-xs font-medium rounded-full ${campaign.status == 1 ? 'bg-green-200 text-green-800' :
                            (campaign.status == 0 || campaign.status == 2) ? 'bg-red-200 text-red-800' : ''
                            }`}
                        >
                          {campaign.status === 0 ? " Pending " : campaign.status === 1 ? "Approve" : "Suspend"}
                        </span>
                        for verification.
                      </p>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={amount}
                          onChange={handleInputChange}
                          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                          placeholder="Enter amount ETH"
                        />
                        <button type="submit"
                          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2'
                          id='pay'
                          onClick={handleClick}
                          disabled={isLoading ? true : false}>
                          {isLoading ? <svg aria-hidden="true" role="status" className="inline ml-3 w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                          </svg> : 'Donate Now'}
                        </button>
                      </>
                    )
                  }
                </div>
              </div>
            ) : (
              <p>
                Owner Account
                <span
                  className={`mx-2 px-2 py-1 text-xs font-medium rounded-full ${(userStatus == "Pending" || userStatus == "Suspend") ? 'bg-red-200 text-red-800' : ''}`}
                >
                  {userStatus}
                </span>
                for verification.
              </p>
            )}

            <hr className="my-6 md:my-8 border-gray-200" />

            <p className="mb-6 text-gray-500">
              {campaign.description}
            </p>
          </div>
        </div>

        <hr className="my-6 max-w-full mx-4 md:my-8 border-gray-200" />

        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 -mt-5">
          {isAdmin ? (
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <h1 className="text-xl mb-1 mt-10 font-bold text-gray-900 sm:text-2xl">
                Donor List
              </h1>
              <ul
                className={`max-w-md mt-2 divide-y p-5 border border-gray-200 rounded-xl shadow-sm divide-gray-200 ${donors.length > 5 ? 'overflow-y-scroll h-96' : ''}`}
              >
                {aggregatedDonations && aggregatedDonations.map((profile, index) => (
                  <li key={index} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                          alt={`${profile.donorName} image`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {profile.donorName}
                          {Number(profile.amountETH) === Number(topDonor.amountETH) && (
                            <span className="ml-2 bg-yellow-400 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                              Top Donor
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {profile.donorEmail}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        {Number(profile.amountETH) / 10 ** 18} ETH
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 max-w-6xl mx-auto shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Donation History</h3>
              </div>
              <div className={`${donors.length > 3 ? 'overflow-y-scroll h-96' : ''}`}>
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-sm text-gray-500 border-b">
                      <th className="text-left pb-3 px-4">TRANSACTION</th>
                      <th className="text-left pb-3 px-4">TIME</th>
                      <th className="text-left pb-3 px-4">AMOUNT</th>
                      <th className="text-left pb-3 px-4">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donors && donors.length > 0 && donors.map((order, index) => (
                      <tr key={index} className="text-sm text-gray-800 hover:bg-gray-50 border-b last:border-none">
                        <td className="py-4 px-4">Payment From {order.donorName}</td>
                        <td className="py-4 px-4">{order.timestamp}</td>
                        <td className="py-4 px-4">{Number(order.amountETH) / 10 ** 18} ETH</td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full text-green-600 bg-green-100`}
                          >
                            Completed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex col-span-1 gap-5 mt-10">
            <div className="max-w-md bg-white border border-gray-200 p-6 rounded-lg shadow-sm h-72 mt-10">
              <h2 className="text-lg font-semibold text-gray-900">Donation Insights</h2>
              <div className="mt-4">
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900">
                    Total Donors: <span className="font-semibold">{totalDonors}</span>
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900">
                    Total Raised: <span className="font-semibold">{totalRaised} ETH</span>
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900">
                    Average Donation: <span className="font-semibold">{averageDonation} ETH</span>
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900">
                    Highest Donation: <span className="font-semibold">{Number(topDonor.amountETH) / 10 ** 18} ETH</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="max-w-md bg-white border border-gray-200 p-6 rounded-lg shadow-sm h-72 mt-10">
              <h2 className="text-lg font-semibold text-gray-900">Campaign Progress</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-24">
                  <CircularProgressbar
                    value={(totalRaised / Number(campaign.target)) * 100}
                    text={`${((totalRaised / Number(campaign.target)) * 100).toFixed(2)}%`}
                    styles={{
                      path: { stroke: '#4a5568' },
                      text: { fill: '#4a5568', fontSize: '12px' },
                      trail: { stroke: '#cbd5e0' }
                    }}
                  />
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-gray-900 text-center">
                {((totalRaised / Number(campaign.target)) * 100).toFixed(2)}% of {Number(campaign.target)} ETH goal reached
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignDetails;