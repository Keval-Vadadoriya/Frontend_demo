import axios from "axios";

if (localStorage.getItem("token"))
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");

const baseService = axios.create({
  baseURL: process.env.REACT_APP_HOST,
});

export default baseService;
