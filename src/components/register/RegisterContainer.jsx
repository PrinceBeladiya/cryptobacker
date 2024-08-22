import { useEffect, useState } from "react";
import Register from "./Register"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterContainer = () => {
  const navigate = useNavigate();
  // Set initial form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    file: undefined,
    DOB: '',
    role: 'User'
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData();
    for (let ele in form) {
      formData.append(ele, form[ele])
    }

    axios.post('http://localhost:3001/user/signup', formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    ).then((res) => {
      toast.success(res.data.message);

      navigate("/login")
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
    <Register
      form={form}
      handleChange={handleChange}
      handleFormSubmit={handleFormSubmit}
    />
  )
}

export default RegisterContainer