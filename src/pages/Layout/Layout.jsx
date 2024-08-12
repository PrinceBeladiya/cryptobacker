import { Outlet, useLocation } from 'react-router-dom'
import HomeNavbar from '../../componets/Navbar/HomeNavbar';
import { useEffect } from 'react';
import { setToken } from '../../redux/reducer/UserSession';
import { useDispatch } from 'react-redux';

const Layout = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if(localStorage.getItem('JWT_Token')) {
      dispatch(setToken(localStorage.getItem('JWT_Token')));
    }
  }, []);
  
  return (
    <div>
        {(path !== '/register' && path !== '/login' && path !== '/') && <HomeNavbar/>}
        <Outlet/>
    </div>
  )
}

export default Layout