import React from "react";
import { FaArrowLeft } from "react-icons/fa";
const viewproduct = ({ viewdata, setview }) => {
  // const totalStock =
  //   (viewdata?.stock || 0) +
  //   (viewdata?.variant?.reduce(
  //     (sum, item) => sum + (Number(item.stock) || 0),
  //     0,
  //   ) || 0);
  // console.log(tottalStock);
  return (
    <>
      <div className="viewproduct ">
        <div className=" view bg-[#000003] ">
          <FaArrowLeft
            className="text-2xl cursor-pointer text-[#ffffff] "
            onClick={() => setview(false)}
          />
          <h1 className="text-[#ffffff]">{viewdata?.Productname}</h1>
          <h4 className="text-[#ffffff]"> Slug-{viewdata?.slug}</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 viewdiv">
            <div className="bg-white rounded-xl shadow-md  border border-gray-200">
              <h6 className="text-sm text-gray-500 font-medium">MRP</h6>
              <h1 className="text-3xl font-bold text-gray-800 mt-2">
                ₹{viewdata?.mrp}
              </h1>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-200">
              <h6 className="text-sm text-gray-500 font-medium">
                Current Price
              </h6>
              <h1 className="text-3xl font-bold text-green-600 mt-2">
                ₹{viewdata?.price}
              </h1>
            </div>

            <div className="bg-white rounded-xl shadow-md  border border-gray-200">
              <h6 className="text-sm text-gray-500 font-medium">Discount</h6>
              <h1 className="text-3xl font-bold text-red-500 mt-2">
                {viewdata?.discount}%
              </h1>
            </div>
          </div>
          <div className="viewdata flex   gap-2 justify-between w-100%">
            <div>
              <img src={viewdata?.Img?.url} alt={viewdata?.Img?.url} />
              <p className="p-2 overflow-hidden text-sm">
                Img-url {viewdata?.Img?.url}
              </p>
            </div>
            <div>
              <p>
                <span>Description:</span> {viewdata?.Description}
              </p>
              <p>
                <span>Categoryname</span> :{viewdata?.categoryId?.Categoryname}
              </p>
              <p>
                <span>Brands :</span>
                {viewdata?.brand?.name}
              </p>
              <p>
                <span>Status :</span>
                {viewdata?.status}
              </p>
              <p>
                <span>Stock :</span>
                {viewdata?.stock}
              </p>
              <p>
                <span>updatedData :</span>
                {viewdata?.updatedAt}
              </p>
              <p>
                <span>Shortdescription :</span>
                {viewdata?.shortdiscription}
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-white">variants</h1>
            <table className="w-full border-collapse varintview">
              <thead>
                <tr>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>SKU</th>
                </tr>
              </thead>

              <tbody>
                {viewdata?.variant?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.color}</td>
                    <td>{item.size}</td>
                    <td>{item.stock}</td>
                    <td>₹{item.price}</td>
                    <td>{item.sku}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default viewproduct;
