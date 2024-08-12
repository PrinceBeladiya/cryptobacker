import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '../../componets';
import HomeNavbar from '../../componets/Navbar/HomeNavbar';

const Layout = () => {
  const authvalue = useSelector((state) => state.auth.value);
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <div>
        {(path !== '/register' && path !== '/login' && path !== '/') && <HomeNavbar/>}
        <Outlet/>
    </div>
  )
}

export default Layout