/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"
import { FooterContainer, NavbarContainer } from "../"

const Layout = ({
  userName,
  userEmail,
}) => {
  return (
    <div>
      <NavbarContainer
        userName={userName}
        userEmail={userEmail}
      />
       <div style={{ minHeight: "calc(100vh - 64px - 164.8px)" }}>
        <Outlet />
      </div>
      <FooterContainer />
    </div>
  )
}

export default Layout