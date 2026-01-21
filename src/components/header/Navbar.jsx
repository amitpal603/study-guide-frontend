import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import study from "/src/assets/study.jpg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isAdmin , setIsAdmin] = useState(true)
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/help", label: "Help" },
  ];

  const handleAccountChange = (e) => {
    const value = e.target.value;
    if (value === "Sign Up") {
      navigate("/sign-up");
    } else if (value === "Login") {
      navigate("/login-account");
    }
    e.target.value = "Account";
  };

  const handleUniversityChange = (e) => {
    const value = e.target.value;
    if (value === "Mgkvp") {
      navigate("/mgkvp-university");
    } else if (value === "Aktu") {
      navigate("/aktu-university");
    }
    e.target.value = "University";
  };

  return (
    <>
      <nav className="bg-[#F67280] w-full  z-50 shadow-lg fixed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-2">
            {/* Logo */}
            <div className="flex-shrink-0 flex gap-2 sm:gap-3 justify-center items-center">
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-white shadow-md hover:scale-105 transition-transform duration-200">
                <img
                  src={study}
                  alt="Study"
                  className="h-full w-full object-cover"
                />
              </div>
              <h1 className="text-lg sm:text-xl lg:text-2xl text-white font-bold whitespace-nowrap">
                Study <span className="text-[#3674b5]">Gu</span>ide
              </h1>
            </div>

            {/* Desktop Navigation Links - Centered */}
            <ul className="hidden md:flex space-x-2 lg:space-x-4 flex-1 justify-center md:ml-85">
              {links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `text-white font-medium text-base lg:text-lg transition-all duration-200 hover:text-gray-100 px-3 lg:px-4 py-2 rounded-md whitespace-nowrap ${
                        isActive
                          ? "bg-[#e55d6d] shadow-lg font-bold"
                          : "hover:bg-[#e55d6d] hover:bg-opacity-50 hover:shadow-md"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              {
                isAdmin && (
                  <li>
                    <NavLink to="/admin/study-guide/dashboard"
                    className={({ isActive }) =>
                      `text-white font-medium text-base lg:text-lg transition-all duration-200 hover:text-gray-100 px-3 lg:px-4 py-2 rounded-md whitespace-nowrap ${
                        isActive
                          ? "bg-[#e55d6d] shadow-lg font-bold"
                          : "hover:bg-[#e55d6d] hover:bg-opacity-50 hover:shadow-md"
                      }`
                    }
                    >
                      Admin Dashboard
                    </NavLink>
                  </li>
                )
              }
            </ul>

            {/* University Dropdown - Desktop */}
            <div className="hidden md:block flex-shrink-0">
              <select
                onChange={handleUniversityChange}
                className="bg-white text-[#F67280] font-medium text-sm lg:text-base px-3 lg:px-5 py-2 lg:py-2.5 rounded-md border-2 border-white shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-60 appearance-none pr-8 lg:pr-10 bg-[length:1.2em] lg:bg-[length:1.5em] bg-[right_0.4rem_center] lg:bg-[right_0.5rem_center] bg-no-repeat"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23F67280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\")",
                }}
              >
                <option value="University">University</option>
                <option value="Mgkvp">MGKVP</option>
                <option value="Aktu">AKTU</option>
              </select>
            </div>

            {/* Account Dropdown - Desktop */}
            <div className="hidden md:block flex-shrink-0">
              <select
                onChange={handleAccountChange}
                className="bg-white text-[#F67280] font-medium text-sm lg:text-base px-3 lg:px-5 py-2 lg:py-2.5 rounded-md border-2 border-white shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-60 appearance-none pr-8 lg:pr-10 bg-[length:1.2em] lg:bg-[length:1.5em] bg-[right_0.4rem_center] lg:bg-[right_0.5rem_center] bg-no-repeat"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23F67280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\")",
                }}
              >
                <option value="Account">Account</option>
                <option value="Sign Up">Sign Up</option>
                <option value="Login">Login</option>
              </select>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex-shrink-0">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 rounded-md hover:bg-[#e55d6d] transition-all duration-200 active:scale-95"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 md:hidden z-40 ${
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar - Left Side, Full Height */}
      <div
        className={`fixed top-0 left-0 h-full w-[75%] sm:w-[60%] bg-[#F67280] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden z-50 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-white border-opacity-30 sticky top-0 bg-[#F67280] z-10">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                src={study}
                alt="Study"
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-white text-base sm:text-lg font-bold">
              Study <span className="text-[#3674b5]">Gu</span>ide
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white p-2 rounded-md hover:bg-[#e55d6d] transition-all duration-200 active:scale-95"
            aria-label="Close menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {links.map((link, index) => (
              <li
                key={link.label}
                className={`transform transition-all duration-300 ${
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: isOpen ? `${index * 100}ms` : "0ms" }}
              >
                <NavLink
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block text-white font-medium text-base py-3 px-4 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[#e55d6d] shadow-md scale-[1.02]"
                        : "hover:bg-[#e55d6d] hover:bg-opacity-70 hover:pl-6 active:scale-95"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
             {
                isAdmin && (
                  <li onClick={() => setIsOpen(false)}>
                    <NavLink to="/admin/study-guide/dashboard"
                    className={({ isActive }) =>
                    `block text-white font-medium text-base py-3 px-4 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[#e55d6d] shadow-md scale-[1.02]"
                        : "hover:bg-[#e55d6d] hover:bg-opacity-70 hover:pl-6 active:scale-95"
                    }`
                  }
                    >
                      Admin Dashboard
                    </NavLink>
                  </li>
                )
              }
          </ul>

          {/* University Section - Mobile */}
          <div className="mt-6 pt-4 border-t border-white border-opacity-30">
            <h3 className="text-white text-sm font-semibold mb-3 px-2 uppercase tracking-wide">
              University
            </h3>
            <select
              onChange={handleUniversityChange}
              className="w-full bg-white text-[#F67280] font-medium text-base px-4 py-3 rounded-lg border-2 border-white shadow-md hover:bg-gray-50 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-60 appearance-none pr-10 bg-[length:1.2em] bg-[right_0.5rem_center] bg-no-repeat"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23F67280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\")",
              }}
            >
              <option value="University">Select University</option>
              <option value="Mgkvp">MGKVP</option>
              <option value="Aktu">AKTU</option>
            </select>
          </div>

          {/* Account Section - Mobile */}
          <div className="mt-6 pt-4 border-t border-white border-opacity-30">
            <h3 className="text-white text-sm font-semibold mb-2 px-2 uppercase tracking-wide">
              Account
            </h3>
            <div className="space-y-2">
              <NavLink
                to="/my-account"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left text-white font-medium text-base py-3 px-4 rounded-lg hover:bg-[#e55d6d] hover:bg-opacity-70 transition-all duration-200 active:scale-95"
              >
                My Account
              </NavLink>
              <NavLink
                to="/sign-up"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left text-white font-medium text-base py-3 px-4 rounded-lg hover:bg-[#e55d6d] hover:bg-opacity-70 transition-all duration-200 active:scale-95"
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/login-account"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left  text-white font-semibold text-base py-3 px-4 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200 active:scale-95"
              >
                Login
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;