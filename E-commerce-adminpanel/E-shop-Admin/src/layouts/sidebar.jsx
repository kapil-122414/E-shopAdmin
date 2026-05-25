import React, { useState } from "react";

import Cookies from "js-cookie";
import {
  FaTachometerAlt,
  FaBox,
  FaList,
  FaTag,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const Sidebar = ({ formData, setIslogin, islogin }) => {
  const [open, setOpen] = useState(false);



  const logout = () => {
    Cookies.remove("Token");

    console.log("remove token");
    setIslogin(false);
  };

  return (
    <>
      <div className="menu-icon">
        <FaBars onClick={() => setOpen(true)} />
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
      <div className={open ? "side-bar active" : "side-bar"}>
        <div>
          <h1>E-Shop Admin</h1>
        </div>
        <div className="">

          
          <div >
            <FaTachometerAlt className="" />
            <h3>Dashboard</h3>
          </div>
          <div>
            <FaBox />
            <h3>Products</h3>
          </div>
          <div>
            <FaList />
            <h3>Categories</h3>
          </div>
          <div>
            <FaTag />
            <h3>Brands</h3>
          </div>
          <div>
            <FaShoppingCart />
            <h3>Orders</h3>
          </div>
          <div>
            <FaUsers />
            <h3>Customers</h3>
          </div>
          <div>
            <FaChartBar />
            <h3>Analytics</h3>
          </div>
          <div>
            <FaCog />
            <h3>Setting</h3>
          </div>
        </div>
        <div onClick={logout} className="logout">
          <FaSignOutAlt />
          <h3>logout</h3>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
