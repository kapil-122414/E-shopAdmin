import React, { useState, useEffect } from "react";

import { FaBell, FaUserCircle, FaSun, FaSearch, FaMoon } from "react-icons/fa";

import Loginfromdata from "../froms/loginfrom";

const Navbar = ({ editfrom, setEditfrom, formData, setFormData, register }) => {
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
        <div className="flex justify-center items-center gap-5 navleft">
          <FaSearch className="text-[#717182]" />

          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="bg-transparent outline-none"
          />
        </div>

        <div className="flex justify-center items-center gap-5">
          <div>
            <FaBell />
          </div>

          <div
            onClick={() => setdark(!dark)}
            className="cursor-pointer text-xl"
          >
            {dark ? <FaMoon /> : <FaSun />}
          </div>

          <div
            className="usericon cursor-pointer"
            onClick={() => setEditfrom(true)}
          >
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
        <Loginfromdata
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
