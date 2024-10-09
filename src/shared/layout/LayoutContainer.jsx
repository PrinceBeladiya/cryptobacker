import { useEffect,useState } from "react";
import Layout from "./Layout"
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, setToken } from "../../redux/reducer/UserSession";
import { useNavigate } from "react-router-dom";
const LayoutContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userToken, userRole } = useSelector((state) => state.user)
  console.log(userRole);
  
  useEffect(() => {
    if (userToken) {
      console.log("userTOken")
      console.log(userToken)
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
    navigate={navigate}
    />
  )
}

export default LayoutContainer