import React, { useState } from "react";
import Sidebar from "./layouts/sidebar";
import Navbar from "./layouts/navbar";
import Loginfromdata from "./froms/loginfrom";
import useLoginform from "./Hooks/loginfrom";

import Routers from "./routes/siderouters";

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
              <Routers search={search} />
            </div>
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
