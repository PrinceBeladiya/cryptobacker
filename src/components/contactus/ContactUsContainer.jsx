import React, { useState } from 'react'
import ContactUs from './ContactUs'
import toast from 'react-hot-toast'

const ContactUsContainer = () => {

  const [isLoading,setisLoading] = useState(false);

  const [FormData,setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  })

  const handlesubmit = (e) => {
    e.preventDefault();
    if(FormData.message.length > 0 && FormData.subject.length > 0){
      console.log(FormData);
      toast.success('Sent Sucessfully','success');  
    }
    else{
      toast.error('Please Fill all Details','warn');
    }
    
  }

  const handlechange = (e) => {
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
      <ContactUs
      form={FormData}
      handlechange={handlechange}
      handlesubmit={handlesubmit}
      isLoading={isLoading}
      />
    </div>
  )
}

export default ContactUsContainer
