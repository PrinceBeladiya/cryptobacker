/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"
import { FooterContainer, NavbarContainer, SideBarContainer } from "../"
import { AdminDashboardContainer } from "../../components"


const Layout = ({isAdmin}) => {
  return (
    <>
    {!isAdmin && 
    <div>
      <NavbarContainer />
      <div style={{ minHeight: "calc(100vh - 64px - 164.8px)" }}>
        <Outlet />
      </div>
      <FooterContainer />
    </div>}
    {isAdmin &&
    <div className="flex flex-col h-screen">
      <NavbarContainer />
    <div className="flex flex-1">
      <SideBarContainer />
      <main className="flex-1 p-4 bg-gray-50" style={{ marginLeft: '270px', marginRight: '15px'}}>
        <Outlet/>
      </main>
    </div>
  </div>
    }
    </>
  )
}

export default Layout