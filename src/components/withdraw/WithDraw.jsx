  import React from 'react';
  import {
    Card,
    TextInput,
    Label,
    Button,
    Select,
    FileInput,
    Tooltip
  } from 'flowbite-react';
  import { BiInfoCircle } from 'react-icons/bi';

  const WithDraw = ({ form, handleSubmit, handleChange, fakeTransactionHistory, isLoading, availableAmount }) => {
    return (
      <div className="flex space-x-8 p-8">
        <Card className="w-full p-4 bg-white shadow-md rounded-md">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Withdraw
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="w-full">
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
            </div>

            {/* Title Input */}
            <div className="">
              <Label htmlFor="subject" className="inline-block mb-2">
                Your Title
              </Label>  
              <TextInput
                id="title"
                type="text"
                placeholder="Enter Title"
                value={form.subject}
                onChange={handleChange}
                name="subject"
                required
                className="w-full"
              />
            </div>

            {/* Campaign Selection */}
            <div className="w-full">
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
                <option value="health">Health & Medical</option>
                <option value="education">Education</option>
                <option value="technology">Technology & Innovation</option>
                <option value="environment">Environment</option>
                <option value="business">Business & Startups</option>
                <option value="animal">Animals & Pets</option>
                <option value="projects">Creative Projects</option>
              </Select>
              <p className="mt-2 text-sm text-green-600">
                Available Amount: {availableAmount} USDC
              </p>
            </div>

            {/* Withdrawal Amount Input */}
            <div className="w-full">
              <Label htmlFor="amount" className="block mb-2">
                Amount to Withdraw
              </Label>
              <TextInput
                id="amount"
                type="number"
                placeholder="USDC"
                value={form.amount}
                onChange={handleChange}
                name="amount"
                required
                className="w-full"
              />
            </div>

            {/* PDF Report Upload */}
            <div className="w-full">
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
            </div>

            {/* Submit Button */}
            <div className="w-full">
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
                  'Submit'
                )}
              </Button>
            </div>
          </form>
        </Card>

        <div className="w-1/2">
          <Card className="w-full p-4 bg-white shadow-md rounded-md">
            <div className="text-center mb-6">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                WithDraw History
              </h5>
            </div>
            <div className="space-y-4">
              {fakeTransactionHistory.length > 0 ? (
                <ul className="pl-5 space-y-3">
                  {fakeTransactionHistory.map((transaction, index) => (
                    <li
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-gray-700">
                          {transaction.title}
                        </span>
                        <span className="text-gray-500">{transaction.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Amount: ${transaction.amount}
                        </span>
                        <span
                          className={`text-sm ${
                            transaction.status === 'Approved'
                              ? 'text-green-600'
                              : transaction.status === 'Pending'
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center">
                  No transaction history found.
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  export default WithDraw;
