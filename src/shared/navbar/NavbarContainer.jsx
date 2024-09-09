/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "./Navbar"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducer/UserSession";

const NavbarContainer = () => {
  const dispatch = useDispatch();
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

  const handleclick = () => {
    setDropdownOpen(false); 
  }

  return (
    <Navbar
      userName={userName}
      userEmail={userEmail}
      userStatus={userStatus}
      handleLogOut={handleLogOut}
      isDropdownOpen={isDropdownOpen}
      toggleDropdown={toggleDropdown}
      handleclick={handleclick}
      isAdmin={userRole == "Admin"}
    />
  )
}

export default NavbarContainer