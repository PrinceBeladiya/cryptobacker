import { useEffect, useState } from 'react';
import UserReview from './UserReview';
import { useParams } from 'react-router-dom';
import { getUser, changeUserStatus } from '../../context';

const UserReviewContainer = () => {
  const { userCode } = useParams();
  const [User, setUser] = useState(null);

  const handleStatusChange = async (userId, newStatus) => {
    const confirmChange = window.confirm(`Are you sure you want to change the user's status to ${newStatus}?`);

    // Step 2: If the user confirmed, proceed with the API call
    if (confirmChange) {
      try {
        const result = await changeUserStatus(userId, newStatus);
        console.log(result);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    getUser(userCode)
      .then(res => {
        console.log("New Data :- ", res);
        setUser(res.data);
      })
      .catch(error => console.error("Error fetching User details:", error));
  }, [userCode]);

  const extractFilePath = (url) => {
    const urlObj = new URL(url); // Create a URL object to parse the URL
    return urlObj.pathname.substring(1); // Remove the leading '/'
  };


  if (!User) {
    return <div>Loading...</div>;
  }

  return (
    <UserReview
      user={User}
      handleStatusChange={handleStatusChange}
      extractFilePath={extractFilePath}
    />
  );
};

export default UserReviewContainer;
