/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "./Navbar"

const NavbarContainer = ({
  userName,
  userEmail,
  handleLogOut
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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