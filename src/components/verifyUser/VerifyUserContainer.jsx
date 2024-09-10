import React from 'react'
import VerifyUser from './VerifyUser'
import { useState, useEffect } from 'react';
import { getAllUsers } from '../../context';
import { addCampaign } from '../../redux/reducer/Campaign';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const VerifyUserContainer = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([
    { id: 'Approved', name: 'Approved', count: 56, checked: false },
    { id: 'Pending', name: 'Pending', count: 56, checked: false },  
  ]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [Users, setUsers] = useState([]);


  const handleCheckboxChange = (id) => {
    const updatedCategories = categories.map(category =>
      category.id === id ? { ...category, checked: !category.checked } : category
    );
    setCategories(updatedCategories);
  
    const selectedCategories = updatedCategories
      .filter(category => category.checked)
      .map(category => category.id);
  
    if (selectedCategories.length > 0) {
      const filteredUsers = sortedUsers.filter(user =>
        selectedCategories.includes(user.status)
      );
      setSortedUsers(filteredUsers);
    } else {
      setSortedUsers(Users);
    }
  };
  

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedUsers.length / 4);
   // Calculate the items to display on the current page
   const startIndex = (currentPage - 1) * 4;
   const endIndex = startIndex + 4;
   const currentItems = sortedUsers.slice(startIndex, endIndex);
 
   // Create an array of page numbers to display
   const pageNumbers = [];

   for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getUserDetails = async () => {
    try {
      const data = await getAllUsers();
      if (data && Array.isArray(data.data)) {
        const filteredUsers = data.data;
        setSortedUsers(filteredUsers);
        setUsers(filteredUsers);
      } else {
        console.error("Error: Response is not an array", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const [searchValue, setSearchValue] = useState('');

  const onSearchByUserID = (query) => {
    setSearchValue(query);
    const filtered = currentItems.filter(user =>
      user._id.toLowerCase().includes(query.toLowerCase())
    );
    setSortedUsers(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    onSearchByUserID(e.target.value);
  };

  useEffect(() => {
    getUserDetails();
  },[])
  return (
    <div>
      <VerifyUser 
      categories={categories}
      isOpen={isOpen}
      toggleDropdown={toggleDropdown}
      handleCheckboxChange={handleCheckboxChange}
      handlePageChange={handlePageChange}
      currentPage={currentPage}
      totalPages={totalPages}
      currentItems={currentItems}
      pageNumbers={pageNumbers}
      searchValue={searchValue}
      handleSearchChange={handleSearchChange}
      />
      <div className='mt-7'>
        <Outlet/>
      </div>
    </div>
  )
}

export default VerifyUserContainer
