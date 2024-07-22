import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CustomButton from './CustomButton';
import { logo, sun, menu } from '../assets';
import { navlinks } from '../constants';
import { logout } from '../context';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div 
    className={`w-[48px] h-[48px] rounded-[10px] ${isActive ? 'bg-[#2c2f32]' : ''} flex justify-center items-center ${!disabled ? 'cursor-pointer' : ''} ${styles}`} 
    onClick={handleClick}
  >
    <img src={imgUrl} alt={name} className={`w-1/2 h-1/2 ${isActive ? '' : 'grayscale'}`} />
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Get the current location
  const [toggleDrawer, setToggleDrawer] = useState(false);

  // Determine the active link based on the current path
  const currentPath = location.pathname;

  const handleIconClick = (link) => {
    if (!link.disabled) {
      navigate(link.link);
    }
    if (link.name === 'logout') {
      logout();
      navigate('/');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
        <Link to="">
          <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
        </Link>
        <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
          <div className="flex flex-col justify-center items-center gap-3">
            {navlinks.map((link) => (
              <Icon 
                key={link.name}
                {...link}
                isActive={currentPath === link.link}
                handleClick={() => handleIconClick(link)}
              />
            ))}
          </div>

          <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
        </div>
      </div>

      {/* Small screen navigation */}
      {/* Uncomment and adjust as needed */}
      {/* <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
        <div className="sm:hidden flex justify-between items-center relative">
          <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>

          <img 
            src={menu}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)}
          />

          <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 transition-all duration-700 ${!toggleDrawer ? 'translate-y-[-100vh]' : 'translate-y-0'}`}>
            <ul className="mb-4">
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${currentPath === link.link ? 'bg-[#3a3a43]' : ''}`}
                  onClick={() => {
                    handleIconClick(link);
                    setToggleDrawer(false);
                  }}
                >
                  <img 
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${currentPath === link.link ? 'grayscale-0' : 'grayscale'}`}
                  />
                  <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${currentPath === link.link ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex mx-4">
              <CustomButton 
                btnType="button"
                title="Create a campaign"
                styles="bg-[#8c6dfd]"
                handleClick={() => {
                  // Handle create campaign click
                }}
              />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
