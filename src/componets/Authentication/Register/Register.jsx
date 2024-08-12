import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../../Style.css'; // Ensure this file includes the #blurround and .register-container styles

const Register = () => {
  // Set initial form state
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    proof: undefined,
    dob: '',
    mobile: '',
    remember: false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Process form data
    console.log('Form submitted:', form);
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
    <div className="relative">
      <div id="blurround"></div>
      <div className="register-container">
        <section
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            padding: '40px 0',
          }}
          className="bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative z-10">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
              <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
              CryptoBacker    
            </a>
            <div className="w-full bg-white rounded-lg shadow-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Sign Up to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Dox Smith"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900">Your Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      id="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="1234567899"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900">Date Of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      value={form.dob}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-gray-900">Upload file</label>
                    <input 
                      className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                      aria-describedby="file_input_help"
                      onChange={handleChange}
                      id="file_input"
                      type="file"
                      name="proof"
                    />
                    <p className="mt-1 text-sm text-gray-500" id="file_input_help">A proof picture is useful to validate your identity</p>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign Up
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Already have an account? <NavLink to={'/login'} className="font-medium text-blue-600 hover:underline">Sign In</NavLink>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
