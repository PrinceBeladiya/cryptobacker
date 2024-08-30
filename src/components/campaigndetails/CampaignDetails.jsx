/* eslint-disable react/prop-types */
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CampaignDetails = ({
  handleClick,
  isexpanded,
  amount,
  handleInputChange,
  isAdmin,
  donors,
  totalRaised,
  goal,
  topDonor,
  totalDonors,
  averageDonation,
  orders
}) => {
  return (
    <section className="py-8 bg-white md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="min-w-40 min-h-60"
              src="https://images.unsplash.com/photo-1724515543157-e2ed5385d1a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D"
              alt="Campaign"
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Make Water From Air
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
                  {goal} ETH
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 my-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(totalRaised / goal) * 100}%` }}
              ></div>
            </div>
            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              {!isexpanded ? (
                <button
                  onClick={handleClick}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                >
                  Donate Now
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              ) : (
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
                    Pay
                  </button>
                </div>
              )}
            </div>

            <hr className="my-6 md:my-8 border-gray-200" />

            <p className="mb-6 text-gray-500">
              Studio quality three mic array for crystal clear calls and voice recordings. Six-speaker sound system for a remarkably robust and high-quality audio experience. Up to 256GB of ultrafast SSD storage.
            </p>

            <p className="text-gray-500">
              Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with Magic Keyboard or Magic Keyboard with Touch ID.
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
                {donors.map((profile, index) => (
                  <li key={index} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={profile.imageSrc}
                          alt={`${profile.name} image`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {profile.name}
                          {profile.id === topDonor.id && (
                            <span className="ml-2 bg-yellow-400 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                              Top Donor
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {profile.email}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        {profile.amount}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 max-w-6xl mx-auto shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Transaction History</h3>
              </div>
              <div className={`${orders.length > 3 ? 'overflow-y-scroll h-96' : ''}`}>
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
                    {orders.map((order, index) => (
                      <tr key={index} className="text-sm text-gray-800 hover:bg-gray-50 border-b last:border-none">
                        <td className="py-4 px-4">{order.transaction}</td>
                        <td className="py-4 px-4">{order.date}</td>
                        <td className="py-4 px-4">{order.amount}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                              order.status === 'Completed'
                                ? 'text-green-600 bg-green-100'
                                : 'text-red-600 bg-red-100'
                            }`}
                          >
                            {order.status}
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
                    Highest Donation: <span className="font-semibold">{topDonor.amount} ETH</span>
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900">
                    Donation Frequency: <span className="font-semibold">{(totalDonors / 2).toFixed(2)} donations/day</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="max-w-md bg-white border border-gray-200 p-6 rounded-lg shadow-sm h-72 mt-10">
              <h2 className="text-lg font-semibold text-gray-900">Campaign Progress</h2>
              <div className="flex justify-center mt-6">
                <div className="w-24 h-24">
                  <CircularProgressbar 
                    value={(totalRaised / goal) * 100} 
                    text={`${((totalRaised / goal) * 100).toFixed(2)}%`} 
                    styles={{
                      path: { stroke: '#4a5568' },
                      text: { fill: '#4a5568', fontSize: '12px' },
                      trail: { stroke: '#cbd5e0' }
                    }} 
                  />
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-gray-900 text-center">
                {((totalRaised / goal) * 100).toFixed(2)}% of {goal} ETH goal reached
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignDetails;
