import React from "react";
import Sidebar from "./layouts/sidebar";
import Navbar from "./layouts/navbar";

import Loginfromdata from "./froms/loginfrom";
import useLoginform from "./Hooks/loginfrom";
const App = () => {
  const {
    islogin,
    register,
    editfrom,
    setEditfrom,

    formData,
    setFormData,
  } = useLoginform();

  if (!islogin) {
    return (
      <Loginfromdata
        editfrom={true}
        setEditfrom={setEditfrom}
        formData={formData}
        setFormData={setFormData}
        register={register}
      />
    );
  } 
    return (
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="main-content">
          <Navbar
            editfrom={editfrom}
            setEditfrom={setEditfrom}
            formData={formData}
            setFormData={setFormData}
            register={register}
          />
        </div>
      </div>
    );
  
};

export default App;
