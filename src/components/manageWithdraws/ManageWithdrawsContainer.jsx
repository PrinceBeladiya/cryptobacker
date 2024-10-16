import React, { useCallback } from 'react';
import { useState, useEffect, useMemo } from 'react';
import { getWithdrawRequestByID, getAllWithdraws } from '../../context';
import { addWithdraws } from '../../redux/reducer/Withdraws';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import ManageWithdraw from './ManageWithdraw';

const ManageWithdrawsContainer = () => {
  const { campaigns } = useSelector((state) => state.campaigns);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredwithdraws, setFilteredwithdraws] = useState([]);
  const [withdraws, setwithdraws] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleSearchChange = (e) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
  };

  getWithdrawRequestByID('670fa81702e049b3367191c4').then(res => console.log(res));

  const getWithdrawDetails = async () => {
    try {
      const res = await getAllWithdraws();
      dispatch(addWithdraws(res.data));
      if (Array.isArray(res.data)) { 
        setwithdraws(res.data);
      } else {
        console.error("Error: Response is not an array", res.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const totalPages = Math.ceil(filteredwithdraws.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredwithdraws.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredwithdraws, currentPage]);

  const pageNumbers = useMemo(() => {
    const numbers = [];
    for (let i = 1; i <= totalPages; i++) {
      numbers.push(i);
    }
    return numbers;
  }, [totalPages]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Filter withdraws based on search input
  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredwithdraws(withdraws); // If search is empty, show all withdraws
    } else {
      const filtered = withdraws.filter(withdraw =>
        withdraw.campaignName?.toLowerCase().includes(searchValue.toLowerCase()) || 
        withdraw.amount?.toString().includes(searchValue)
      );
      setFilteredwithdraws(filtered);
    }
  }, [searchValue, withdraws]);

  useEffect(() => {
    getWithdrawDetails();
  }, []);

  return (
    <div>
      <ManageWithdraw 
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
  );
};

export default ManageWithdrawsContainer;
