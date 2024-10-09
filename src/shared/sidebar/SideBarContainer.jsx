import SideBar from './SideBar'
import { useSelector } from 'react-redux';

const SideBarContainer = () => {
  const { access } = useSelector((state) => state.user);
  return (
    <SideBar
      access={access}
    />
  )
}

export default SideBarContainer
