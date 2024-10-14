import { useState } from "react";
import AdminLogin from "./AdminLogin"
import toast from "react-hot-toast";
import { setToken } from "../../redux/reducer/UserSession";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:3001/admin/login`, {
      ...form
    }).then((res) => {
      if (res?.data.token.length > 0) {
        localStorage.setItem("JWT_Token", res?.data.token);

        dispatch(setToken(res?.data.token))
        toast.success("User sign-in successfully.", 'success');
        navigate("/admin-dashboard");
      } else {
        toast("Something Went Wrong", 'warn');
      }
    }).catch((err) => {
      console.log("error - ", err.message ? err.message : err?.response.data.message)
      toast.error(err.message ? err.message : err?.response.data.message);
    })
  };

  return (
    <AdminLogin
      form={form}
      handleChange={handleChange}
      handleFormSubmit={handleFormSubmit}
    />
  )
}

export default AdminLoginContainer