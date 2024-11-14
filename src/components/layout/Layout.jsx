import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./layout.css";

import Sidebar from "../sidebar/Sidebar";
import TopNav from "../topnav/TopNav";

import { BrowserRouter, Route } from "react-router-dom";
import AllRoutes from "../Routes";

const Layout = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user-details")) {
      setAuth(true);
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div className={`layout theme-mode-dark`}>
            <Sidebar {...props} />
            <div className="layout__content">
              <TopNav />
              <div className="layout__content-main">
                <AllRoutes />
              </div>
            </div>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
