import React, { useState } from 'react';
import WithDraw from './WithDraw';

const WithDrawContainer = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const [availableAmount, setAvailableAmount] = useState(1000);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    campaign: 'NA',
    report: null, // Initialize with null instead of undefined
    title: '',
  });

  const fakeTransactionHistory = [
    {
      title: 'Campaign Fund Withdrawal',
      amount: 500,
      status: 'Approved',
      date: '2024-08-25',
    },
    {
      title: 'Project Support',
      amount: 1500,
      status: 'Pending',
      date: '2024-08-20',
    },
    {
      title: 'Research Grant',
      amount: 750,
      status: 'Rejected',
      date: '2024-08-15',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Additional logic for form submission can be added here
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <WithDraw
        form={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        fakeTransactionHistory={fakeTransactionHistory}
        isLoading={isLoading}
        availableAmount={availableAmount}
      />
    </div>
  );
};

export default WithDrawContainer;
