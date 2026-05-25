import React from "react";
import Sidebar from "./layouts/sidebar";
import Navbar from "./layouts/navbar";
import Loginfromdata from "./froms/loginfrom";
import useLoginform from "./Hooks/loginfrom";
import Dashboard from "./layouts/dashboard";

const App = () => {
  const {
    islogin,
    register,
    editfrom,
    setEditfrom,
    setIslogin,
    formData,
    setFormData,
  } = useLoginform();

  
  return (
    <>
      {islogin ? (
        <div className="flex">
          <div>
            <Sidebar
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
            />
            <Dashboard />
          </div>
        </div>
      ) : (
        <Loginfromdata
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
