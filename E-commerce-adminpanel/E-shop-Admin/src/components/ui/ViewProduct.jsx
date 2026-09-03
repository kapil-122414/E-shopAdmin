import React from "react";
import { FaArrowLeft } from "react-icons/fa";
const viewproduct = ({ viewdata, setview }) => {

  return (                                                                                                                                          
    <>                                        
      <div className="viewproduct">
        <div className="view view-modal">
          <div className="view-modal-header">
            <FaArrowLeft
              className="view-modal-close"
              onClick={() => setview(false)}
            />
            <h1 className="view-modal-title">{viewdata?.Productname}</h1>
            <div style={{width: '32px'}} />
          </div>
          <div className="view-modal-body">
            <h4 className="view-modal-slug">Slug: {viewdata?.slug}</h4>
            
            <div className="price-cards">
              <div className="price-card mrp">
                <h6>MRP</h6>
                <h1>₹{viewdata?.mrp}</h1>
              </div>

              <div className="price-card price">
                <h6>Current Price</h6>
                <h1>₹{viewdata?.price}</h1>
              </div>

              <div className="price-card discount">
                <h6>Discount</h6>
                <h1>{viewdata?.discount}%</h1>
              </div>
            </div>

            <div className="info-grid">
              <div>
                <img 
                  src={viewdata?.Img?.url} 
                  alt={viewdata?.Productname} 
                  className="info-image"
                />
                <p className="info-image-url">{viewdata?.Img?.url}</p>
              </div>
              <div className="info-details">
                <p className="info-row"><strong>Description:</strong> {viewdata?.Description}</p>
                <p className="info-row"><strong>Category:</strong> {viewdata?.categoryId?.Categoryname}</p>
                <p className="info-row"><strong>Brand:</strong> {viewdata?.brand?.name}</p>
                <p className="info-row">
                  <strong>Status:</strong> 
                  <span className={`status-badge ${viewdata?.status?.toLowerCase()}`}>
                    {viewdata?.status}
                  </span>
                </p>
                <p className="info-row"><strong>Stock:</strong> {viewdata?.stock}</p>
                <p className="info-row"><strong>Updated:</strong> {viewdata?.updatedAt}</p>
                <p className="info-row"><strong>Short Description:</strong> {viewdata?.shortdiscription}</p>
              </div>
            </div>

            <div className="variants-section">
              <h3>Variants</h3>
              <div className="overflow-x-auto">
                <table className="varintview">
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
                        <td className="font-mono">{item.sku}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {(!viewdata?.variant || viewdata?.variant?.length === 0) && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No variants available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default viewproduct;
