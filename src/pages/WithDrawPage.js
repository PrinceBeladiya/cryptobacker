import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CustomButton, FormField } from '../componets/index'
import { MdCheckCircle } from 'react-icons/md';

const WithDrawPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    amount: '',
    purpose: '',
    report: null // Will store file object for the report (PDF)
  });
  const [success, setSuccess] = useState(false); // State to track success animation

  const handleFormFieldChange = (fieldName, value) => {
    setForm({ ...form, [fieldName]: value });
  };

  const handleFileChange = (fieldName, file) => {
    setForm({ ...form, [fieldName]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || !form.purpose || !form.report) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    // Simulate API request (replace with actual API call)
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true); // Trigger success animation
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect after 2 seconds
    }, 2000); // Simulating a 2-second delay for demonstration
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Withdraw Money</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <FormField
          labelName="Amount to Withdraw *"
          placeholder="Enter amount"
          inputType="text"
          value={form.amount}
          handleChange={(e) => handleFormFieldChange('amount', e.target.value)}
        />

        <FormField
          labelName="Purpose *"
          placeholder="Write the purpose of withdrawal"
          isTextArea
          value={form.purpose}
          handleChange={(e) => handleFormFieldChange('purpose', e.target.value)}
        />

        <div className="flex flex-col">
          <label className="text-white font-epilogue font-bold mb-2">Report on Purpose (PDF only) *</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange('report', e.target.files[0])}
            className="border border-gray-400 bg-gray-200 py-2 px-4 rounded-md"
          />
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title={isLoading ? "Submitting..." : "Send Request for Withdrawal"}
            styles="bg-[#1dc071]"
            disabled={isLoading}
          />
        </div>
      </form>

      {/* Success Animation Section */}
      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex items-center justify-center"
        >
          <MdCheckCircle className="text-[#1dc071] text-6xl" />
          <p className="font-epilogue font-bold text-white ml-4 text-2xl">Withdrawal Request Submitted!</p>
        </motion.div>
      )}
    </div>
  );
};

export default WithDrawPage;
