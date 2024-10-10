/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom"
import { FooterContainer, NavbarContainer, SideBarContainer } from "../"

const Layout = ({isAdmin,navigate}) => {
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
      <main className="flex-1" style={{ marginLeft: '270px', marginRight: '15px', marginTop: '85px', marginBottom: '20px'}}>
        <Outlet/>
      </main>
    </div>
  </div>
    }
    </>
  )
}

export default Layout