import { useEffect,useState } from "react";
import Layout from "./Layout"
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, setToken } from "../../redux/reducer/UserSession";

const LayoutContainer = () => {
  const dispatch = useDispatch();
  const [isAdmin,setisAdmin] = useState(true);
  const { userToken } = useSelector((state) => state.user)

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
    isAdmin={isAdmin}
    />
  )
}

export default LayoutContainer