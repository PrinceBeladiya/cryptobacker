import { useEffect, useState } from 'react';
import UserReview from './UserReview';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, changeUserStatus, getAllUsers } from '../../context';
import { addUsers } from '../../redux/reducer/Users';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const UserReviewContainer = () => {
  const { userCode } = useParams();
  const { userID } = useSelector(state => state.user);
  const [User, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStatusChange = async (userId, newStatus) => {
    const confirmChange = window.confirm(`Are you sure you want to change the user's status to ${newStatus}?`);

    // Step 2: If the user confirmed, proceed with the API call
    if (confirmChange) {
      try {
        changeUserStatus(userId, newStatus)
        .then((res) => {          
          if(res) {
            getAllUsers()
            .then((data) => {
            const unreviewedData = data.data.filter(user => user.modifiedBy === null || user.modifiedBy === userID);
            dispatch(addUsers(unreviewedData));
            toast.success('succesfully user status changed');
            navigate('/verify-user')
          })
          .catch(err => {
            console.log("Error :- ",err);
          })
          }
          else {
            toast.error('Failed to change Status')
          }
        })
        .catch(err => {
          toast.error('Failed to Change Status');
          console.log("Error :- ",err);
        })
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
