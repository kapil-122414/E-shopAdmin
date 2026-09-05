import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBell,
  FaUserCircle,
  FaSun,
  FaSearch,
  FaMoon,
  FaBars,
  FaBox,
  FaShoppingBag,
  FaUser,
  FaTag,
  FaIndustry,
} from "react-icons/fa";

import LoginForm from "../ui/LoginForm";
import { globalSearch } from "../../features/products/api";

const getTypeIcon = (type) => {
  switch (type) {
    case "product":
      return <FaBox className="text-blue-500" />;
    case "order":
      return <FaShoppingBag className="text-green-500" />;
    case "customer":
      return <FaUser className="text-purple-500" />;
    case "category":
      return <FaTag className="text-orange-500" />;
    case "brand":
      return <FaIndustry className="text-red-500" />;
    default:
      return <FaSearch className="text-gray-500" />;
  }
};

const getStatusColor = (status) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    placed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    shipped: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    cencelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };
  return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
};

const Navbar = ({
  editfrom,
  setEditfrom,
  formData,
  setFormData,
  register,
  search: globalSearch,
  setSearch: setGlobalSearch,
  onMenuClick,
}) => {
  const [dark, setdark] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ all: [], products: [], orders: [], customers: [], categories: [], brands: [] });
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [localSearch, setLocalSearch] = useState("");
  const searchWrapperRef = useRef(null);
  const navigate = useNavigate();

  // Sync local search with global search when global search changes externally
  useEffect(() => {
    setLocalSearch(globalSearch);
  }, [globalSearch]);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const handleClickOutside = useCallback((event) => {
    if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
      setShowResults(false);
      setSelectedIndex(-1);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query || query.length < 2) {
        setResults({ all: [], products: [], orders: [], customers: [], categories: [], brands: [] });
        setShowResults(false);
        setGlobalSearch("");
        return;
      }
      setLoading(true);
      try {
        const response = await globalSearch(query, 15);
        if (response.data.success) {
          setResults(response.data.data);
          setShowResults(response.data.data.all.length > 0);
          setSelectedIndex(-1);
          setGlobalSearch(query); // Update global search for page filtering
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults({ all: [], products: [], orders: [], customers: [], categories: [], brands: [] });
        setShowResults(false);
      } finally {
        setLoading(false);
      }
    }, 300),
    [setGlobalSearch]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSearch(value);
  };

  const handleKeyDown = (e) => {
    const totalResults = results.all.length;
    if (totalResults === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalResults - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalResults - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selected = results.all[selectedIndex];
      if (selected?.url) {
        handleResultClick(selected);
      }
    } else if (e.key === "Escape") {
      setShowResults(false);
      setSelectedIndex(-1);
      searchWrapperRef.current?.querySelector("input")?.blur();
    }
  };

  const handleResultClick = (item) => {
    if (item?.url) {
      navigate(item.url);
      // Keep global search for page filtering, clear local navbar input
      if (item.searchTerm) {
        setGlobalSearch(item.searchTerm);
      }
      setLocalSearch(""); // Clear navbar input after navigation
      setShowResults(false);
      setSelectedIndex(-1);
    }
  };

  const handleFocus = () => {
    if (localSearch.length >= 2 && results.all.length > 0) {
      setShowResults(true);
    }
  };

  const renderResultItem = (item, index) => {
    const isSelected = index === selectedIndex;
    return (
      <div
        key={`${item.type}-${item.id}`}
        onClick={() => handleResultClick(item)}
        onMouseEnter={() => setSelectedIndex(index)}
        className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors ${
          isSelected
            ? "bg-blue-50 dark:bg-blue-900/30"
            : "hover:bg-gray-50 dark:hover:bg-gray-800"
        } rounded-lg`}
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          {getTypeIcon(item.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate text-gray-900 dark:text-white">{item.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.subtitle}</p>
          {item.sku && (
            <p className="text-xs text-blue-600 dark:text-blue-400 font-mono">SKU: {item.sku}</p>
          )}
          {item.status && (
            <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${getStatusColor(item.status)}`}>
              {item.status}
            </span>
          )}
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">{item.type}</span>
      </div>
    );
  };

  return (
    <>
      <div className="navbar bg-white dark:bg-[#111827] dark:text-white transition-all duration-300">
        <div className="nav-left">
          <div className="mobile-menu-btn" onClick={onMenuClick}>
            <FaBars size={24} />
          </div>
          <div ref={searchWrapperRef} className="nav-search-wrapper relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]" />
            <input
              type="text"
              placeholder="Search products, orders, customers, categories, brands..."
              value={localSearch}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none pl-10 pr-4 py-2 w-full min-w-[300px]"
              autoComplete="off"
            />
            {loading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {showResults && results.all.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fade-in">
              <div className="max-h-96 overflow-y-auto">
                {results.products.length > 0 && (
                  <div className="border-b border-gray-100 dark:border-gray-800">
                    <p className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Products ({results.products.length})
                    </p>
                    {results.products.map((item, i) => renderResultItem(item, i))}
                  </div>
                )}
                {results.orders.length > 0 && (
                  <div className="border-b border-gray-100 dark:border-gray-800">
                    <p className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Orders ({results.orders.length})
                    </p>
                    {results.orders.map((item, i) => renderResultItem(item, results.products.length + i))}
                  </div>
                )}
                {results.customers.length > 0 && (
                  <div className="border-b border-gray-100 dark:border-gray-800">
                    <p className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Customers ({results.customers.length})
                    </p>
                    {results.customers.map((item, i) => renderResultItem(item, results.products.length + results.orders.length + i))}
                  </div>
                )}
                {results.categories.length > 0 && (
                  <div className="border-b border-gray-100 dark:border-gray-800">
                    <p className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Categories ({results.categories.length})
                    </p>
                    {results.categories.map((item, i) => renderResultItem(item, results.products.length + results.orders.length + results.customers.length + i))}
                  </div>
                )}
                {results.brands.length > 0 && (
                  <div>
                    <p className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Brands ({results.brands.length})
                    </p>
                    {results.brands.map((item, i) => renderResultItem(item, results.products.length + results.orders.length + results.customers.length + results.categories.length + i))}
                  </div>
                )}
              </div>
              <div className="px-3 py-2 border-t border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Use ↑↓ to navigate, Enter to select, Esc to close
                </p>
              </div>
            </div>
          )}

          {showResults && results.all.length === 0 && localSearch.length >= 2 && !loading && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 px-4 py-6 z-50 text-center">
              <FaSearch className="mx-auto text-gray-400 mb-2" size={24} />
              <p className="text-gray-500 dark:text-gray-400 text-sm">No results found for "{localSearch}"</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Try different keywords</p>
            </div>
          )}
        </div>

        <div className="nav-right flex items-center gap-5">
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
            className="usericon cursor-pointer desktop-only "
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

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default Navbar;