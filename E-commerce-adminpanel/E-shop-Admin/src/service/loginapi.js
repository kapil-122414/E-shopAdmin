import axios from "axios";
const api = axios.create({
    baseURL:""
});

export const getuser=()=>api.get("/login");

export const createuser=(fromdata)=>{
 return   api.post("/api/login",fromdata);
}

