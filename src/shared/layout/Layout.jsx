/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"
import { FooterContainer, NavbarContainer } from "../"

const Layout = ({
  userName,
  userEmail,
  handleLogOut
}) => {
  return (
    <div>
      <NavbarContainer
        userName={userName}
        userEmail={userEmail}
        handleLogOut={handleLogOut}
      />
      <Outlet />
      <FooterContainer />
    </div>
  )
}

export default Layout