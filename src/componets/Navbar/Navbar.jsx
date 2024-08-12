import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust threshold as needed
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">CryptoBacker</span>
        </a>
        <div className="flex md:order-2 space-x-3">
          <NavLink to={'/register'}>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Get started
            </button>
          </NavLink>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <a
                href="#hero"
                className={`block py-2 px-3 ${
                  activeSection === 'hero' ? 'text-blue-700' : 'text-gray-900'
                } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={`block py-2 px-3 ${
                  activeSection === 'about' ? 'text-blue-700' : 'text-gray-900'
                } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#feature"
                className={`block py-2 px-3 ${
                  activeSection === 'feature' ? 'text-blue-700' : 'text-gray-900'
                } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`block py-2 px-3 ${
                  activeSection === 'contact' ? 'text-blue-700' : 'text-gray-900'
                } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
