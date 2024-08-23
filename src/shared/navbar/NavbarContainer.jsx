/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "./Navbar"
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducer/UserSession";

const NavbarContainer = ({
  userName,
  userEmail,
}) => {
  const dispatch = useDispatch();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(logout());

    setDropdownOpen(false);
  }

  return (
    <Navbar
      userName={userName}
      userEmail={userEmail}
      handleLogOut={handleLogOut}
      isDropdownOpen={isDropdownOpen}
      toggleDropdown={toggleDropdown}
    />
  )
}

export default NavbarContainer