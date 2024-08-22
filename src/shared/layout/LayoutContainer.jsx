import { useEffect } from "react";
import Layout from "./Layout"
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, setToken, logout } from "../../redux/reducer/UserSession";

const LayoutContainer = () => {
  const dispatch = useDispatch();
  const { userToken, userName, userEmail } = useSelector((state) => state.user)

  useEffect(() => {
    if (userToken) {
      dispatch(fetchUserDetails(userToken))
    }
  }, [userToken, dispatch])

  useEffect(() => {
    if (localStorage.getItem('JWT_Token')) {
      dispatch(setToken(localStorage.getItem('JWT_Token')));
    }
  }, []);

  const handleLogOut = () => {
    localStorage.clear();

    dispatch(logout());
  }

  return (
    <Layout
      userName={userName}
      userEmail={userEmail}
      handleLogOut={handleLogOut}
    />
  )
}

export default LayoutContainer