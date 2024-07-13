import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CustomButton,FormField } from '../componets';

const SigninPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleFormFieldChange = (fieldName, value) => {
    setForm({ ...form, [fieldName]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    // Simulate API request (replace with actual API call)
    setTimeout(() => {
      setIsLoading(false);
      alert('Sign-in successful!');
      navigate('/');
    }, 2000); // Simulating a 2-second delay for demonstration
  };

  const handleMetaMaskSignIn = () => {
    // Implement MetaMask sign-in logic here
    alert('MetaMask sign-in initiated!');
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Sign In</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <FormField
          labelName="Email *"
          placeholder="Enter your email"
          inputType="email"
          value={form.email}
          handleChange={(e) => handleFormFieldChange('email', e.target.value)}
        />

        <FormField
          labelName="Password *"
          placeholder="Enter your password"
          inputType="password"
          value={form.password}
          handleChange={(e) => handleFormFieldChange('password', e.target.value)}
        />

        <div className="flex justify-center items-center mt-[40px] space-x-4">
          <CustomButton
            btnType="submit"
            title={isLoading ? "Signing In..." : "Sign In"}
            styles="bg-[#1dc071]"
            disabled={isLoading}
          />
          <button
            onClick={handleMetaMaskSignIn}
            className="flex items-center justify-center bg-[#f0b90b] hover:bg-yellow-400 px-6 py-3 rounded-md text-white font-bold transition duration-300"
            disabled={isLoading}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6f/MetaMask_Logo.png" // MetaMask logo URL
              alt="MetaMask Logo"
              className="w-6 h-6 mr-2"
            />
            Sign in with MetaMask
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninPage;
