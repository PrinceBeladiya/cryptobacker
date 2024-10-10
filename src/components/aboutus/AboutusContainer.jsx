import React from 'react'
import Aboutus from './Aboutus'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const AboutusContainer = () => {
    const navigate = useNavigate();
    const { userStatus } = useSelector((state) => state.user)
    console.log(userStatus);
    
    const handleclick = () => {
        if(userStatus === 'Approve'){
            navigate('/create-campaign');
        } else{
            navigate('/register');
        }
    }

  return (
    <Aboutus 
     handleclick={handleclick}
    />
  )
}

export default AboutusContainer
