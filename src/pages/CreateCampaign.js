import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { createCampaign } from '../context';
import { money } from '../assets';
import { CustomButton, Loader, FormField, SoftAlert } from '../componets/index';
import { checkIfImage } from '../utils';
import ReportIcon from '@mui/icons-material/Report'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form1, setForm1] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });
  const [form2, setForm2] = useState({
    idNumber: '',
    idPhoto: null,
    ideaReport: null,
  });
  const [currentForm, setCurrentForm] = useState(1);
  const [alerts, setAlerts] = useState([]);

  const handleFormFieldChange = (fieldName, value) => {
    if (currentForm === 1) {
      setForm1({ ...form1, [fieldName]: value });
    } else {
      setForm2({ ...form2, [fieldName]: value });
    }
  };

  const handleSubmitForm1 = (e) => {
    e.preventDefault();
  };

  const handleSubmitForm2 = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await createCampaign({
      ...form1,
      target: ethers.utils.parseUnits(form1.target, 18),
      idNumber: form2.idNumber,
      idPhoto: form2.idPhoto,
      ideaReport: form2.ideaReport,
    });
    setIsLoading(false);
    navigate('/');
  };

  const handleBack = () => {
    if (currentForm === 2) {
      setCurrentForm(1);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    // Check for required fields and date validation
    if (!form1.name || !form1.title || !form1.description || !form1.target || !form1.deadline || !form1.image) {
      setAlerts([
        {
          title: 'Error',
          color: 'danger',
          icon: <ReportIcon />,
          message: 'All fields are required.',
        },
        ...alerts,
      ]);
    } else if (new Date(form1.deadline) <= new Date()) {
      setAlerts([
        {
          title: 'Error',
          color: 'danger',
          icon: <ReportIcon />,
          message: 'End date must be in the future.',
        },
        ...alerts,
      ]);
    } else if (!isNumeric(form1.target)) {
      setAlerts([
        {
          title: 'Error',
          color: 'danger',
          icon: <ReportIcon />,
          message: 'Goal must be a numeric value.',
        },
        ...alerts,
      ]);
    } else {
      checkIfImage(form1.image, async (exists) => {
        if (exists) {
          setIsLoading(true);
          const data = await createCampaign({ ...form1, target: ethers.utils.parseUnits(form1.target, 18) });
          setIsLoading(false);
          if (data !== null) {
            setAlerts([
              ...alerts,
              {
                title: 'Success',
                color: 'success',
                icon: <CheckCircleIcon />,
                message: 'Campaign created successfully!',
              },
            ]);
            setCurrentForm(2);
          } else {
            setAlerts([
              {
                title: 'Error',
                color: 'danger',
                icon: <ReportIcon />,
                message: 'Failed to create campaign. Please try again.',
              },
              ...alerts,
            ]);
          }
        } else {
          setAlerts([
            {
              title: 'Error',
              color: 'danger',
              icon: <ReportIcon />,
              message: 'Please provide a proper image URL.',
            },
            ...alerts,
          ]);
        }
      });
    }
  };

  const handleFileChange = (fieldName, file) => {
    setForm2({ ...form2, [fieldName]: file });
  };

  const handleCloseAlert = (title) => {
    setAlerts(alerts.filter((alert) => alert.title !== title));
  };

  const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 relative">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create Campaign</h1>
      </div>

      {alerts.length > 0 && (
        <div className="absolute top-4 right-4">
          <SoftAlert items={alerts} onClose={handleCloseAlert} />
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {currentForm === 1 && (
            <form onSubmit={handleSubmitForm1} className="w-full mt-[65px] flex flex-col gap-[30px]">
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
                <img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
                <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 95% of the raised amount</h4>
              </div>

              <div className="flex gap-[20px]">
                <FormField
                  labelName="Goal *"
                  placeholder="ETH 0.50"
                  inputType="text"
                  value={form1.target}
                  handleChange={(e) => handleFormFieldChange('target', e.target.value)}
                />
                <FormField
                  labelName="End Date *"
                  placeholder="End Date"
                  inputType="date"
                  value={form1.deadline}
                  handleChange={(e) => handleFormFieldChange('deadline', e.target.value)}
                />
              </div>

              <FormField
                labelName="Campaign image *"
                placeholder="Place image URL of your campaign"
                inputType="url"
                value={form1.image}
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
        </>
      )}
    </div>
  );
};

export default CreateCampaign;
