import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  TextInput,
  Label,
  Button,
  Select,
  FileInput,
} from 'flowbite-react';

const WithDraw = ({
  form,
  handleSubmit,
  handleChange,
  withdrawHistory,
  isLoading,
  availableAmount,
  campaign,
  userStatus
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <>
      {userStatus && userStatus === "Approve" ? (
        <motion.div 
          className="flex space-x-8 p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="w-full">
            <Card className="w-full p-4 bg-white shadow-md rounded-md">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Withdraw
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div variants={itemVariants} className="w-full">
                  <Label htmlFor="name" className="block mb-2">
                    Your Name
                  </Label>
                  <TextInput
                    id="name"
                    type="text"
                    placeholder="Enter Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="">
                  <Label htmlFor="subject" className="inline-block mb-2">
                    Your Title
                  </Label>
                  <TextInput
                    id="title"
                    type="text"
                    placeholder="Enter Title"
                    value={form.title}
                    onChange={handleChange}
                    name="title"
                    required
                    className="w-full"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="w-full">
                  <Label htmlFor="campaign" className="block mb-2">
                    Select Campaign
                  </Label>
                  <Select
                    id="campaign"
                    name="campaign"
                    value={form.campaign}
                    onChange={handleChange}
                    required
                    className="w-full"
                  >
                    <option value="NA" disabled>
                      Select Campaign
                    </option>
                    {campaign && campaign.length > 0 && campaign.map((CampaignItem) => (
                      <option key={CampaignItem.campaignCode} value={CampaignItem.campaignCode}>
                        {CampaignItem.title}
                      </option>
                    ))}
                  </Select>
                  {
                    form.campaign !== 'NA' && (
                      <p className="mt-2 text-sm text-green-600">
                        Available Amount: {availableAmount} USDC
                      </p>
                    )
                  }
                </motion.div>

                <motion.div variants={itemVariants} className="w-full">
                  <Label htmlFor="amount" className="block mb-2">
                    Amount to Withdraw
                  </Label>
                  <TextInput
                    id="amount"
                    type="number"
                    placeholder="USDC"
                    value={form.amount}
                    onChange={handleChange}
                    min={1}
                    max={availableAmount}
                    name="amount"
                    required
                    className="w-full"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="w-full">
                  <Label htmlFor="report" className="block mb-2">
                    Upload PDF Report
                  </Label>
                  <FileInput
                    id="report"
                    name="report"
                    accept=".pdf"
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </motion.div>

                <motion.div 
                  className="w-full" 
                  style={{marginTop: '30px'}}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    className="w-full text-white"
                    color="blue"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 me-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      'Send Request For Withdraw'
                    )}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full md:w-1/2">
            <Card className="w-full h-full bg-white shadow-lg rounded-lg p-6">
              <div className="text-center mb-6">
                <h5 className="text-2xl font-bold text-black">
                  Withdraw History
                </h5>
              </div>
              <div style={{height: '525px'}} className={`${withdrawHistory && withdrawHistory.length > 3 ? 'overflow-y-scroll' : ''}`}>
                {withdrawHistory && withdrawHistory.length > 0 ? (
                  <motion.ul 
                    className="space-y-4 mx-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {withdrawHistory.map((transaction, index) => (
                      <motion.li
                        key={index}
                        variants={itemVariants}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                        whileHover={{ scale: 1.03 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-gray-800">
                            {transaction.title}
                          </span>
                          <span className="text-sm text-gray-500">{new Date(transaction.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">
                            Amount: <span className="font-semibold">{Number(transaction.withdrawAmount)} USDC</span>
                          </span>
                          <span
                            className={`text-sm font-medium px-2 py-1 rounded ${
                              transaction.status === 'Approved'
                                ? 'bg-green-100 text-green-800'
                                : transaction.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </div>
                        <div className='mt-2 text-sm text-gray-600'>
                          Campaign: {transaction.campaign}
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No transaction history found.
                  </p>
                )}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          className="flex items-center justify-center -mt-3 h-screen"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md shadow-lg bg-blue-50">
            <motion.div 
              className="flex flex-col items-center p-8 text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-3">Account Status is: <span className="underline" style={{ color: '#E3A008' }}>{userStatus}</span></h2>
              <p className="text-blue-600">
                Your user authentication is in progress. Currently, you can't access this feature.
              </p>
            </motion.div>
          </Card>
        </motion.div>
      )}
    </>
  );
};

export default WithDraw;