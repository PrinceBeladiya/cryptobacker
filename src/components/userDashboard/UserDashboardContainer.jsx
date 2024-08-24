import { useState } from "react";
import UserDashboard from "./UserDashboard"
import { useSelector } from "react-redux";

const UserDashboardContainer = () => {
  const { userStatus } = useSelector((state) => state.user);
  const [statusNotice, setStatusNotice] = useState(true);

  const handleToggleNotice = () => {
    setStatusNotice(false);
  }

  return (
    <>
      {statusNotice && (
        <UserDashboard
          handleToggleNotice={handleToggleNotice}
          userStatus={userStatus}
        />
      )}
    </>
  )
}

export default UserDashboardContainer