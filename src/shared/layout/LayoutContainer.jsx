import { useEffect,useState } from "react";
import Layout from "./Layout"
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, setToken } from "../../redux/reducer/UserSession";

const LayoutContainer = () => {
  const dispatch = useDispatch();
  
  const { userToken, userRole } = useSelector((state) => state.user)
  console.log(userRole);
  
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

  return (
    <Layout
    isAdmin={userRole == 'Admin' ? true : false}
    />
  )
}

export default LayoutContainer