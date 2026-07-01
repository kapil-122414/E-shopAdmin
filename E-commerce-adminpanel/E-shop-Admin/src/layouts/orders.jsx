import React from "react";
import { FiDownload } from "react-icons/fi";
import Ordertable from "../cards/ordertable";
import Orderhooks from "../Hooks/orderhooks";
const Orders = () => {
  const { showdata, setshowdata, search, setsearch, status, setstatus } =
    Orderhooks();
  return (
    <div>
      <div className="order-header  ">
        <div>
          <h1> Orders Management</h1>
          <p class="text-[#717182] text-sm ">
            Track and manage customer orders
          </p>
        </div>

        <div className="flex justify-center text-center items-center gap-1.5">
          <FiDownload /> Export Orders
        </div>
      </div>
      <Ordertable
        showdata={showdata}
        search={search}
        setsearch={setsearch}
        status={status}
        setstatus={setstatus}
      />
    </div>
  );
};

export default Orders;
