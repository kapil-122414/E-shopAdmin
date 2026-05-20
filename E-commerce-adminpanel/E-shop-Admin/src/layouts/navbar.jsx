import React from "react";
import { FaBell, FaUserCircle, FaMoon, FaSun, FaSearch } from "react-icons/fa";
const Navbar = () => {
  return (
    <div className="navbar ">
      <div className="flex justify-cente items-center gap-5 navleft ">
        <FaSearch className="text-[#717182]" />

        <input
          type="text"
          placeholder="Search products, orders, customers..."
        />
      </div>
      <div className="flex justify-cente items-center gap-5">
        <div>
          <FaBell />
        </div>
        <div>
          <FaSun />
        </div> 
        <div className="usericon   flex justify-cente items-center">
          <div>
            <FaUserCircle />
          </div>
          <div className="">
            <h6>kapil</h6>
            <p>kapilkimar1222@</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
