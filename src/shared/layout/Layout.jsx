/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"
import { FooterContainer, NavbarContainer } from "../"

const Layout = () => {
  return (
    <div>
      <NavbarContainer />
      <div style={{ minHeight: "calc(100vh - 64px - 164.8px)" }}>
        <Outlet />
      </div>
      <FooterContainer />
    </div>
  )
}

export default Layout