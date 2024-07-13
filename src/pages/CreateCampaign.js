import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

// import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField } from '../componets';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form1, setForm1] = useState({
    name: '',
    title: '',
    description: ''
  });
  const [form2, setForm2] = useState({
    target: '',
    deadline: '',
    image: '',
    idNumber: '',
    idPhoto: null, // Will store file object for ID photo
    ideaReport: null // Will store file object for idea report (PDF)
  });
  const [currentForm, setCurrentForm] = useState(1);

  const handleFormFieldChange = (fieldName, value) => {
    if (currentForm === 1) {
      setForm1({ ...form1, [fieldName]: value });
    } else {
      setForm2({ ...form2, [fieldName]: value });
    }
  };

  const handleSubmitForm1 = (e) => {
    e.preventDefault();
    setCurrentForm(2);
  };

  const handleSubmitForm2 = async (e) => {
    e.preventDefault();
    // Your form submission logic goes here
    setIsLoading(true);
    // Example: await createCampaign({ ...form1, ...form2 });
    setIsLoading(false);
    navigate('/');
  };

  const handleBack = () => {
    if (currentForm === 2) {
      setCurrentForm(1);
    }
  };

  const handleNext = () => {
    if (currentForm === 1) {
      setCurrentForm(2);
    }
  };

  const handleFileChange = (fieldName, file) => {
    if (currentForm === 2) {
      setForm2({ ...form2, [fieldName]: file });
    }
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create Campaign</h1>
      </div>

      {currentForm === 1 && (
        <form onSubmit={handleSubmitForm1} className="w-full mt-[65px] flex flex-col gap-[30px]">
          {/* Form 1 fields */}
          <div className="flex gap-[20px]">
            <FormField
              labelName="Your Name *"
              placeholder="John Doe"
              inputType="text"
              value={form1.name}
              handleChange={(e) => handleFormFieldChange('name', e.target.value)}
            />
            <FormField
              labelName="Campaign Title *"
              placeholder="Write a title"
              inputType="text"
              value={form1.title}
              handleChange={(e) => handleFormFieldChange('title', e.target.value)}
            />
          </div>

          <FormField
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form1.description}
            handleChange={(e) => handleFormFieldChange('description', e.target.value)}
          />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 95% of the raised amount</h4>
        </div>

            <div className="flex gap-[20px]">
            <FormField
              labelName="Goal *"
              placeholder="ETH 0.50"
              inputType="text"
              value={form2.target}
              handleChange={(e) => handleFormFieldChange('target', e.target.value)}
            />
            <FormField
              labelName="End Date *"
              placeholder="End Date"
              inputType="date"
              value={form2.deadline}
              handleChange={(e) => handleFormFieldChange('deadline', e.target.value)}
            />
          </div>

          <FormField
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form2.image}
            handleChange={(e) => handleFormFieldChange('image', e.target.value)}
          />

          <div className="flex justify-end mt-[40px]">
            <CustomButton
              title="Next"
              styles="bg-[#1dc071]"
              handleClick={handleNext}
            />
          </div>
        </form>
      )}

      {currentForm === 2 && (
        <form onSubmit={handleSubmitForm2} className="w-full mt-[65px] flex flex-col gap-[30px]">
          {/* Form 2 fields */}

          <FormField
            labelName="Government-approved ID Number *"
            placeholder="Enter ID Number"
            inputType="text"
            value={form2.idNumber}
            handleChange={(e) => handleFormFieldChange('idNumber', e.target.value)}
          />

          <FormField
            labelName="ID Photo (JPEG, PNG, PDF) *"
            placeholder="Upload ID Photo"
            inputType="file"
            handleChange={(e) => handleFileChange('idPhoto', e.target.files[0])}
          />

          <FormField
            labelName="Idea Report (PDF only) *"
            placeholder="Upload Idea Report"
            inputType="file"
            handleChange={(e) => handleFileChange('ideaReport', e.target.files[0])}
          />

          <div className="flex justify-between mt-[40px]">
            <CustomButton
              title="Back"
              styles="bg-[#f55d5d]"
              handleClick={handleBack}
            />
            <CustomButton
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateCampaign;