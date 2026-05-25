import { useState } from "react";
import { createuser } from "../service/loginapi";
import Cookie from "js-cookie";

const useLoginform = () => {
  const [editfrom, setEditfrom] = useState(false);
  const [activePage, setActivepage] = useState("Dashboard");
  const [islogin, setIslogin] = useState(!!Cookie.get("Token"));
  const [formData, setFormData] = useState({
    // username: "",
    Email: "",
    Password: "",
  });

  const register = async () => {
    try {
      const res = await createuser(formData);

      console.log("scucces", res.data);
      if (res.data.Role === "admin") {
        console.log("res.data:", res.data);
        Cookie.set("Token", res.data.token);

        Cookie.set("Role", res.data.Role);

        setIslogin(true);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  return {
    editfrom,
    setEditfrom,
    islogin,
    setIslogin,

    formData,
    setFormData,
    activePage,
    setActivepage,
    register,
  };
};

export default useLoginform;
