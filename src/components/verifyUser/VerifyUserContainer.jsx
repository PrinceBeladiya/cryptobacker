import React, { useCallback, useMemo } from 'react'
import VerifyUser from './VerifyUser'
import { useState, useEffect } from 'react';
import { getAllUsers } from '../../context';
import { addUsers } from '../../redux/reducer/Users';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const VerifyUserContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortedUsers, setSortedUsers] = useState([]);
  const [Users, setUsers] = useState([]);
  const { userID } = useSelector(state => state.user);
  const { users } = useSelector(state => state.users);

  console.log("users :- ", users);

  const countFilterLength = useCallback((status) => {
    if (status === 'Approved') {
      return Users.filter((campaign) => campaign.status === 'Approve').length;
    } else 
      return Users.filter((campaign) => campaign.status !== 'Approve').length;
  }, [Users]);

  const [categories, setCategories] = useState([
    { id: 'Approved', name: 'Approved', count: 0, checked: false },
    { id: 'Pending', name: 'Pending', count: 0, checked: false },  
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredUsers = useMemo(() => {
    return Users.filter(user => {
      const matchesSearch = user._id.toLowerCase().includes(searchValue.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(user.status);
      return matchesSearch && matchesCategory;
    });
  }, [Users, searchValue, selectedCategories]);

  const totalPages = Math.ceil(filteredUsers.length / 4);
  const startIndex = (currentPage - 1) * 4;
  const endIndex = startIndex + 4;
  const currentItems = filteredUsers.slice(startIndex, endIndex);

  const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);

  const handleCheckboxChange = (id) => {
    setSelectedCategories(prev => {
      if (prev.includes(id)) {
        return prev.filter(catId => catId !== id);
      } else {
        return [...prev, id];
      }
    });
    setCurrentPage(1);
  };

  const handlereview = (userid) => {
    const confirm = window.confirm("Are you sure you want to manage the User ?");
    console.log("userID :- ",userid);
    
    if(confirm) {
      navigate(`/verify-user/${userid}`);
    }
  }

  const getUserDetails = async () => {
    try {
      const data = await getAllUsers();
      if (data && Array.isArray(data.data)) {
        const filteredUsers = data.data;
        const unreviewedData = filteredUsers.filter(user => user.modifiedBy === null || user.modifiedBy === userID);
        dispatch(addUsers(unreviewedData));
        setUsers(unreviewedData);
      } else {
        console.error("Error: Response is not an array", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [users]);

  useEffect(() => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        count: countFilterLength(category.id),
      }))
    );
  }, [Users, countFilterLength]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

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
        handlereview={handlereview}
      />
      <div className='mt-7'>
        <Outlet/>
      </div>
    </div>
  )
}

export default VerifyUserContainer