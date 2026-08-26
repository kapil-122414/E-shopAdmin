import React, { useState } from "react";
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";
import LoginForm from "./components/ui/LoginForm";
import useAuth from "./features/auth/useAuth";

import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const {
    islogin,
    register,
    editfrom,
    setEditfrom,
    setIslogin,
    formData,
    setFormData,
  } = useAuth();

  const [search, setSearch] = useState("");
  return (
    <>
      {islogin ? (
        <div className="flex h-screen overflow-hidden">
          <div>
            <Sidebar
              search={search}
              formData={formData}
              setIslogin={setIslogin}
              islogin={islogin}
            />
          </div>
          <div className="main-content">
            <Navbar
              editfrom={editfrom}
              setEditfrom={setEditfrom}
              formData={formData}
              setFormData={setFormData}
              register={register}
              search={search}
              setSearch={setSearch}
            />
            <div className="main-content1 bg-[#F8F8F6]">
              <AppRoutes search={search} />
            </div>
          </div>
        </div>
      ) : (
        <LoginForm
          editfrom={false}
          setEditfrom={setEditfrom}
          formData={formData}
          setFormData={setFormData}
          register={register}
        />
      )}
    </>
  );
};

export default App;
