import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { logo } from "../../assets/images";

const Navbar = ({
  userName,
  userEmail,
  handleLogOut,
  isDropdownOpen,
  toggleDropdown,
  handleclick,
  isAdmin,
  dropdownVariants,
  linkVariants,
  closeDropDown
}) => {


  const DropdownPortal = ({ children }) => {
    return ReactDOM.createPortal(
      children,
      document.body
    );
  };

  return (
    <motion.div 
      className={`border border-gray-400 ${isAdmin ? 'fixed top-0 left-0 w-full' : ''}`}
      style={{ zIndex: 1000 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
            <NavLink to="/" className="flex items-center space-x-3">
              <img 
                src={logo} 
                className="h-8" 
                alt="Flowbite Logo" 
                style={isAdmin ? { marginLeft: '-90px' } : {}}
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">CryptoBacker</span>
            </NavLink>
          </motion.div>
          {userName && userEmail ? (
            <>
               <div className="flex items-center md:order-2 space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                  id="user-menu-button"
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                    alt="user photo"
                  />
                </motion.button>
                <AnimatePresence>
                  {isDropdownOpen && !isAdmin &&  (
                    <DropdownPortal>
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
                        id="user-dropdown"
                        style={{
                          top: '60px', // Adjust this value based on your navbar height
                          right: '20px', // Adjust this value to align with your user icon
                          zIndex: 9999
                        }}
                      >
                        <div className="px-4 py-3">
                          <span className="block text-sm text-gray-900">{userName}</span>
                          <span className="block text-sm text-gray-500 truncate">{userEmail}</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                          <li>
                            <motion.div variants={linkVariants} whileHover="hover">
                              <NavLink id="dashboard" to="user-dashboard" onClick={handleclick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</NavLink>
                            </motion.div>
                          </li>
                          <li>
                            <motion.div variants={linkVariants} whileHover="hover">
                              <button id="create" onClick={handleclick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Create Campaign</button>
                            </motion.div>
                          </li>
                          <li>
                            <motion.div variants={linkVariants} whileHover="hover">
                              <button id="withdraw" onClick={handleclick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Withdraw</button>
                            </motion.div>
                          </li>
                          <li>
                            <motion.div variants={linkVariants} whileHover="hover">
                              <NavLink to="/" onClick={handleLogOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</NavLink>
                            </motion.div>
                          </li>
                        </ul>
                      </motion.div>
                    </DropdownPortal>
                  )}
                </AnimatePresence>
              </div>
              {!isAdmin && 
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                  <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
                    <motion.li variants={linkVariants} whileHover="hover">
                      <NavLink to="/" onClick={closeDropDown} className={({ isActive }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"} aria-current="page">
                        Home
                      </NavLink>
                    </motion.li>
                    <motion.li variants={linkVariants} whileHover="hover">
                      <NavLink to="/campaign-list" onClick={closeDropDown} className={({ isActive }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"}>
                        Campaign
                      </NavLink>
                    </motion.li>
                    <motion.li variants={linkVariants} whileHover="hover">
                      <NavLink to="/aboutus" onClick={closeDropDown} className={({ isActive }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"}>
                        About
                      </NavLink>
                    </motion.li>
                    <motion.li variants={linkVariants} whileHover="hover">
                      <NavLink to="/contact" onClick={closeDropDown} className={({ isActive }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"}>
                        Contact
                      </NavLink>
                    </motion.li>
                  </ul>
                </div>
              }
            </>
          ) : (
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
                <motion.li variants={linkVariants} whileHover="hover">
                  <NavLink to="/" className={({ isActive }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"} aria-current="page">
                    Home
                  </NavLink>
                </motion.li>
                <motion.li variants={linkVariants} whileHover="hover">
                  <NavLink to="/about" className={({ isActive }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"}>
                    About
                  </NavLink>
                </motion.li>
                <motion.li variants={linkVariants} whileHover="hover">
                  <NavLink to="/services" className={({ isActive }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"}>
                    Services
                  </NavLink>
                </motion.li>
                <motion.li variants={linkVariants} whileHover="hover">
                  <NavLink to="/pricing" className={({ isActive }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"}>
                    Pricing
                  </NavLink>
                </motion.li>
                <motion.li variants={linkVariants} whileHover="hover">
                  <NavLink to="/contact" className={({ isActive }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"}>
                    Contact
                  </NavLink>
                </motion.li>
                <motion.li variants={linkVariants} whileHover="hover">
                  <NavLink to="/login" className={({ isActive }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"}>
                    Log in
                  </NavLink>
                </motion.li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </motion.div>
  )
}

export default Navbar;