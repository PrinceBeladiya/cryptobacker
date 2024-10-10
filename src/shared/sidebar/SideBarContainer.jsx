import SideBar from './SideBar'
import { useDispatch, useSelector } from 'react-redux';
import { Home, UserPlus, Flag, CheckSquare, DollarSign } from 'lucide-react';
import { logout } from "../../redux/reducer/UserSession";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const SideBarContainer = () => {
  const { access } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/admin-dashboard', access: [0, 1, 2, 3] },
    { name: 'Add Admins', icon: UserPlus, path: '/add-admins', access: [0] },
    { name: 'Verify Campaign', icon: Flag, path: '/verify-campaign', access: [0, 2] },
    { name: 'Manage Campaign', icon: CheckSquare, path: '/manage-campaign', access: [0, 2] },
    { name: 'Verify User', icon: UserPlus, path: '/verify-user', access: [0, 1] },
    { name: 'Manage Withdrawals', icon: DollarSign, path: '/manages-withdraw', access: [0, 3] },
  ];

  const handleclick = () => {
    localStorage.clear();
    dispatch(logout());
    toast.success('Logged Out Succesfully','success');
    navigate('/admin')
  }

  return (
    <SideBar
      access={access}
      handleclick={handleclick}
      menuItems={menuItems}
    />
  )
}

export default SideBarContainer
