import React from "react";
import Sidebar from "./layouts/sidebar";
import Navbar from "./layouts/navbar";
const App = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="main-content">
        <Navbar />
      </div>
    </div>
  );
};

export default App;
