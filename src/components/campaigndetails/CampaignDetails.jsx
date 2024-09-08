/* eslint-disable react/prop-types */
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
  filePaths
}) => {
  return (
    <section className="py-8 bg-white md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            {console.log(filePaths)}
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
            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={amount}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Enter amount ETH"
                />
                <button
                  type="button"
                  name="pay"
                  onClick={handleClick}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                >
                  Donate Now
                </button>
              </div>
            </div>

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
                        {Number(profile.amountETH) / 10**18} ETH
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