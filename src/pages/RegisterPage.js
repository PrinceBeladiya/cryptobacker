import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton, FormField } from '../componets';
import {thirdweb} from '../assets/index'
import { getUserInfo, signUp } from '../context';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    try {
      await signUp(form);
      alert('Sign-up successful!');
      navigate('/');
    } catch(err) {
      console.log("error : ", err)
    }
    
    setIsLoading(false);

    // Simulate API request (replace with actual API call)
    // setTimeout(() => {
      
    //   
    // }, 2000); // Simulating a 2-second delay for demonstration
  };

  const handleMetaMaskSignIn = () => {
    // Implement MetaMask sign-in logic here
    alert('MetaMask sign-in initiated!');
  };

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src={thirdweb} alt="Your Company"/>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign Up to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST" onSubmit={(e) => handleSubmit(e, form)}>
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

        <div class="mt-2">
        <FormField
            inputType={'text'}
            placeholder={'Enter Your Name'}
            labelName={'Full Name'}
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e.target.value)}
          />
        </div>
        <div class="mt-4">
        <FormField
            inputType={'password'}
            placeholder={'Enter Your Password'}
            labelName={'Password'}
            value={form.password}
            handleChange={(e) => handleFormFieldChange('password', e.target.value)}
          />
        </div>
        <div class="mt-4">
        <FormField
            inputType={'text'}
            placeholder={'Enter Your Mobile'}
            labelName={'Mobile'}
            value={form.mobile}
            handleChange={(e) => handleFormFieldChange('mobile', e.target.value)}
          />
        </div>

      <div className='flex justify-center'>
        <CustomButton
        type="submit" 
        styles="bg-green-500 text-black h-10 px-8 py-2 mt-4"
        title={'Sign Up'}
        disable={false}/>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Alredy a member? 
      <Link to="/sign-in" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login Here</Link>
    </p>
  </div>
</div>
  );
};

export default RegisterPage;
