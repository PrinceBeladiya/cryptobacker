import React from 'react'
import Sidebar from '../componets/Sidebar'
import Navbar from '../componets/Navbar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout
