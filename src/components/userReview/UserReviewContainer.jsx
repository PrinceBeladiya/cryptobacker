import React, { useEffect, useState } from 'react';
import UserReview from './UserReview';
import { useParams } from 'react-router-dom';
import { getUser } from '../../context';

const UserReviewContainer = () => {
  const {userCode} = useParams();
  const [User, setUser] = useState(null);

  const handleApprove = () => {
    alert('Campaign approved');
  };

  const handleReject = () => {
    alert('Campaign rejected');
  };
  
  useEffect(() => {
    getUser(userCode)
      .then(res => {
        console.log("New Data :- ", res); 
        setUser(res.data);
      })
      .catch(error => console.error("Error fetching User details:", error));
  }, [userCode]);

  if (!User) {
    return <div>Loading...</div>;
  }

  return (
    <UserReview 
      user={User}
      handleApprove={handleApprove}
      handleReject={handleReject}
    />
  );
};

export default UserReviewContainer;
