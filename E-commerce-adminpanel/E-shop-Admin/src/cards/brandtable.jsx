import React from "react";

const brandtable = ({ getdata, setgetdata }) => {
  return (
    <div className="brand-table">
      <div>
        <input type="text" placeholder="Search brands ...." />
      </div>
      <table className="w-full overflow-auto">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Total product</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {getdata.map((item) => (
            <tr key={item._id}>
              <td>
                <div className="flex gap-2">
                  <img src={item.Img.url} className="h-10 w-10  " />
                  <h3>{item.name}</h3>
                </div>
              </td>
              <td>{item.product}</td>
              <td>{item.status}</td>
              <td>
                <div className="flex">
                  <p>edit</p>
                  <p>edit</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default brandtable;
