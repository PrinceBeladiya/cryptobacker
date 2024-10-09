import { useEffect, useState } from "react";
import AdminRegister from "./AdminRegister"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRegisterContainer = () => {
  const navigate = useNavigate();
  // Set initial form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData();
    for (let ele in form) {
      formData.append(ele, form[ele])
    }

    axios.post('http://localhost:3001/admin/signup', form).then((res) => {
      toast.success(res.data.message);

      navigate("/admin")
    }).catch((err) => {
      toast.error(err.response.data.message);
    })
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };

    // Add event listener on mount
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <AdminRegister
      form={form}
      handleChange={handleChange}
      handleFormSubmit={handleFormSubmit}
    />
  )
}

export default AdminRegisterContainer