import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton, FormField } from '../componets';
import {thirdweb} from '../assets/index'

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name:'',
    email: '',
    password: '',
    mobile: ''
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
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src={thirdweb} alt="Your Company"/>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
        <div class="mt-2">
          <FormField
            inputType={'email'}
            placeholder={'Enter Your Email'}
            labelName={'Email address'}
            value={form.email}
            handleChange={(e) => handleFormFieldChange('email', e.target.value)}
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
        </div>
        <div class="mt-2">
        <FormField
            inputType={'email'}
            placeholder={'Enter Your Password'}
            labelName={'Password'}
            value={form.email}
            handleChange={(e) => handleFormFieldChange('email', e.target.value)}
          />
        </div>
      </div>

      <div className='flex justify-center'>
        <CustomButton
        type="submit" 
        styles="bg-green-500 text-black h-10 px-8 py-2 mt-4"
        title={'Sign in'}/>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member? 
      <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Register Here</a>
    </p>
  </div>
</div>
  );
};

export default RegisterPage;
