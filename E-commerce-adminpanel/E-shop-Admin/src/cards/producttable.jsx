import React from "react";
import { FaSearch } from "react-icons/fa";
const producttable = ({ from, setfrom, productdata, setProductdata }) => {
  return (
    <div className="product-table">
      <div className="flex gap-2.5 items-center ">
        <FaSearch className="text-4 " />
        <input type="text" placeholder="Search name, category or sku" />
      </div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>status</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {productdata.map((item) => (
            <tr key={item._id}>
              <div>
                <img src={item.Img} alt=" not show" className="h-3.5 w-2.5" />
                <td>{item.Productname}</td>
              </div>
              <td>{item.variant[0].sku}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default producttable;
