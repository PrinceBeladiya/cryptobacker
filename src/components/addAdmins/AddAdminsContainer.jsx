import { useState } from 'react';
import AddAdmins from './AddAdmins';
import { addSubAdmin } from '../../context';

const AddAdminContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    role: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addSubAdmin(formData);
      console.log(res);
      setFormData({
        name: '',
        mobile: '',
        email: '',
        password: '',
        role: ''
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <AddAdmins
        form={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AddAdminContainer;
