import axios from "axios";

const baseURL = process.env.REACT_APP_NODE_BACKEND_URL;

const instance = axios.create({
  baseURL: baseURL,
});


// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // add admin token in every request
    const user_token = localStorage.getItem("admin-token");
    config.headers["Authorization"] = `Bearer ${user_token}`;
    return window.navigator.onLine
      ? config
      : Promise.reject({
          response: {
            data: {
              message: "Check your internet connection",
            },
          },
        });
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    
    if (error.response.status === 401) {
      if(window.location.pathname === "/biswajit-das/CuttingCentreAdminPanel" || window.location.pathname === "/biswajit-das/CuttingCentreAdminPanel/"){
        return Promise.reject(error.response);
      }else{
      localStorage.removeItem("admin-token");
      window.location.href = "/biswajit-das/CuttingCentreAdminPanel";
      }
    } else {
      return Promise.reject(error.response);
    }
  }
);

export default instance;
