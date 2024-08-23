import { useEffect, useState } from "react";
import Login from "./Login"
import toast from "react-hot-toast";
import { setToken } from "../../redux/reducer/UserSession";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginContainer = () => {
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
    
    axios.post(`http://localhost:3001/user/login`, {
      ...form
    }).then((res) => {
      if(res?.data.token.length > 0) {
        localStorage.setItem("JWT_Token", res?.data.token);
        
        dispatch(setToken(res?.data.token))
        toast.success("User sign-in successfully.", 'success');
        navigate("/");
      } else {
        toast("Something Went Wrong", 'warn');  
      }
    }).catch((err) => {
      console.log("error - ", err.message ? err.message : err?.response.data.message)
      toast.error(err.message ? err.message : err?.response.data.message);
    })
  };

  return (
    <Login
      form={form}
      handleChange={handleChange}
      handleFormSubmit={handleFormSubmit}
    />
  )
}

export default LoginContainer