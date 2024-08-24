/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"
import { FooterContainer, NavbarContainer } from "../"

const Layout = () => {
  return (
    <div>
      <NavbarContainer />
      <Outlet />
      <FooterContainer />
    </div>
  )
}

export default Layout