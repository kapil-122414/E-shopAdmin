import React, { useState, useEffect } from "react";

import { FaBell, FaUserCircle, FaSun, FaSearch, FaMoon, FaBars } from "react-icons/fa";

import LoginForm from "../ui/LoginForm";

const Navbar = ({
  editfrom,
  setEditfrom,
  formData,
  setFormData,
  register,
  search,
  setSearch,
  onMenuClick,
}) => {
  const [dark, setdark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <>
      <div className="navbar bg-white dark:bg-[#111827] dark:text-white transition-all duration-300">
        <div className="nav-left">
          <div className="mobile-menu-btn" onClick={onMenuClick}>
            <FaBars size={24} />
          </div>
          <div className="nav-search-wrapper desktop-only">
            <FaSearch className="text-[#717182]" />
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="nav-right flex items-center gap-5">
          <div className="mobile-only">
            <FaBell />
          </div>
          <div className="desktop-only">
            <FaBell />
          </div>

          <div
            onClick={() => setdark(!dark)}
            className="cursor-pointer text-xl desktop-only"
          >
            {dark ? <FaMoon /> : <FaSun />}
          </div>

          <div className="usericon cursor-pointer desktop-only" onClick={() => setEditfrom(true)}>
            <div className="userimg">
              <FaUserCircle />
            </div>
            <div className="userdetails">
              <h6>kapil</h6>
              <p>{formData.Email}</p>
            </div>
          </div>
        </div>
      </div>

      {editfrom && (
        <LoginForm
          editfrom={editfrom}
          setEditfrom={setEditfrom}
          formData={formData}
          setFormData={setFormData}
          register={register}
        />
      )}
    </>
  );
};

export default Navbar;