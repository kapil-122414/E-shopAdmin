import React from "react";

import { FaBell, FaUserCircle, FaSun, FaSearch } from "react-icons/fa";

import Loginfromdata from "../froms/loginfrom";

import useLoginform from "../Hooks/loginfrom";

const Navbar = () => {
  const { editfrom, setEditfrom, formData, setFormData, register } =
    useLoginform();
  return (
    <>
      <div className="navbar">
        <div className="flex justify-cente items-center gap-5 navleft">
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

          <div className="usericon" onClick={() => setEditfrom(true)}>
            <div className="userimg">
              <FaUserCircle />
            </div>

            <div className="userdetails">
              <h6>kapil</h6>
              <p>kapilkimar1222@dkfkd</p>
            </div>
          </div>
        </div>
      </div>

     <Loginfromdata
  editfrom={editfrom}
  setEditfrom={setEditfrom}
  formData={formData}
  setFormData={setFormData}
  register={register}
/>
    </>
  );
};

export default Navbar;
