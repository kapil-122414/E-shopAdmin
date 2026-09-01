import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import LoginForm from "../ui/LoginForm";
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
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = ({ 
  formData, 
  setIslogin, 
  islogin, 
  search, 
  setSearch,
  isOpen,
  onClose,
  editfrom,
  setEditfrom,
  setFormData,
  register
}) => {
  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024;
  const shouldShow = isDesktop || isOpen;

  const logout = () => {
    Cookies.remove("Token");
    console.log("remove token");
    setIslogin(false);
  };

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1025);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 1024;
  const navigate = useNavigate();
  const location = useLocation();
  const menuClass = (path) => {
    return location.pathname === path
      ? "bg-[var(--primary-color)] text-white p-3 rounded-lg flex items-center gap-2"
      : "p-3 flex items-center gap-2";
  };

  const handleProfileClick = () => {
    if (isMobile) {
      setEditfrom(true);
      onClose();
    }
  };

  return (
    <>
      {shouldShow && !isDesktop && <div className="overlay" onClick={onClose}></div>}
      <div className={`side-bar ${shouldShow ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h1>E-Shop Admin</h1>
          {!isDesktop && (
            <button className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
              <FaTimes size={24} />
            </button>
          )}
        </div>

        <div className="sidebar-menu">
          <div onClick={() => { navigate("/"); onClose(); }} className={menuClass("/")}>
            <FaTachometerAlt className="" />
            <h3>Dashboard</h3>
          </div>
          <div
            onClick={() => { navigate("/products"); onClose(); }}
            className={menuClass("/products")}
          >
            <FaBox />
            <h3>Products</h3>
          </div>
          <div
            onClick={() => { navigate("/categories"); onClose(); }}
            className={menuClass("/categories")}
          >
            <FaList />
            <h3>Categories</h3>
          </div>
          <div
            onClick={() => { navigate("/brands"); onClose(); }}
            className={menuClass("/brands")}
          >
            <FaTag />
            <h3>Brands</h3>
          </div>
          <div
            onClick={() => { navigate("/orders"); onClose(); }}
            className={menuClass("/orders")}
          >
            <FaShoppingCart />
            <h3>Orders</h3>
          </div>
          <div
            onClick={() => { navigate("/customers"); onClose(); }}
            className={menuClass("/customers")}
          >
            <FaUsers />
            <h3>Customers</h3>
          </div>
          <div
            onClick={() => { navigate("/analytics"); onClose(); }}
            className={menuClass("/analytics")}
          >
            <FaChartBar />
            <h3>Analytics</h3>
          </div>
          <div
            onClick={() => { navigate("/setting"); onClose(); }}
            className={menuClass("/setting")}
          >
            <FaCog />
            <h3>Setting</h3>
          </div>
        </div>

        {isMobile && (
          <div className="sidebar-user-profile mobile-only p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="sidebar-user-info cursor-pointer" onClick={handleProfileClick}>
              <div className="userimg w-10 h-10 rounded-full bg-[#E8521A]/10 flex items-center justify-center">
                <FaUserCircle size={24} className="text-[#E8521A]" />
              </div>
              <div className="userdetails flex-1 min-w-0">
                <h6 className="font-medium truncate text-white dark:text-white">kapil</h6>
                <p className="text-sm text-gray-400 dark:text-gray-400 truncate">{formData.Email}</p>
              </div>
            </div>
          </div>
        )}

        <div onClick={logout} className="logout">
          <FaSignOutAlt />
          <h3>logout</h3>
        </div>
      </div>

      {isMobile && editfrom && (
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

export default Sidebar;