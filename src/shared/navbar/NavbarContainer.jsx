/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "./Navbar"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducer/UserSession";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NavbarContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName, userEmail, userStatus, userRole } = useSelector((state) => state.user)

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(logout());

    setDropdownOpen(false);
  }

  const linkVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.2
      }
    }
  };

  const closeDropDown = () => {
    setDropdownOpen(false);
  }

  const handleclick = (e) => {
    const event = e.target.id;
    
    if (event === 'create' || event === 'withdraw') {
      const isUserVerified = userStatus !== "Pending";
      
      if (!isUserVerified) {
        toast.error('You are not Verified','warn');
        const path = location.pathname;
        navigate(path);
      } else {
        switch (event) {
          case "create":
            navigate('/create-campaign');
            break;
          case "withdraw":
            navigate('/withdraw-page');
            break;
          default:
            break;
        }
      }
    }
    setDropdownOpen(false);
  };  

  return (
    <Navbar
      userName={userName}
      userEmail={userEmail}
      handleLogOut={handleLogOut}
      isDropdownOpen={isDropdownOpen}
      toggleDropdown={toggleDropdown}
      handleclick={handleclick}
      dropdownVariants={dropdownVariants}
      isAdmin={userRole == "Admin"}
      linkVariants={linkVariants}
      closeDropDown={closeDropDown}
    />
  )
}

export default NavbarContainer