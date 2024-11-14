import React, { useContext, useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Login from "./Login/Login";
import Users from "./users/Users";
import Material from "../pages/Material";
import AddUsers from "../pages/AddUsers";
import AddMaterial from "../pages/AddMaterial";
import Orders from "../pages/Orders";
import AddFaq from "../pages/AddFaq";
import Faq from "../pages/Faq";
import AddMachine from "../pages/AddMachine";
import Machine from "../pages/Machine";
import Sheets from "../pages/Sheets";
import MarginAndLabour from "../pages/Percentages";
import ManualCheck from "../pages/ManualCheck";

import "./layout.css";
import { Protected } from "../routes/privateRoute";
import { AuthContext } from "../context/authContextProvider";
import axios from "../helpers/axios";
import Thickness from "../pages/Thickness";
import Colors from "../pages/Colors";
import Finish from "../pages/Finish";
import MaterialThickness from "../pages/MaterialThickness";
import MaterialColor from "../pages/MaterialColor";
import MaterialFinish from "../pages/MaterialFinish";
import MaterialMachine from "../pages/MaterialMachine";
import Percentages from "../pages/Percentages";

const AllRoutes = () => {
  const {toggleAuth} = useContext(AuthContext);
  const checkAdminAuth = async (token) => {
    try {
      const res = await axios.get("/admin/check");
      toggleAuth(res.data.admin);
    } catch (error) {
      localStorage.removeItem("admin-token");
    }
    // return fetch(
    //   `${process.env.REACT_APP_NODE_BACKEND_URL}/user/check`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
        
    //     return "true";
    //   })
    //   .catch((err) => {
    //     localStorage.removeItem("user-token");
    //     localStorage.removeItem("isLogin");
    //     return "false";
    //   });
  };
  useEffect(() => {
    if (localStorage.getItem("admin-token")) {
      checkAdminAuth(localStorage.getItem("admin-token"));
    } else {
      localStorage.removeItem("admin-token");
      localStorage.removeItem("isLogin");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/dashboard" exact element={
        <Dashboard />
      } />
      <Route path="/customers" element={<Customers />} />
      <Route path="/manual-check" element={<ManualCheck/>}/>
      <Route path="/Users" element={<Users />} />
      <Route path="/AddUser" element={<AddUsers />} />
      <Route path="/Materials" element={<Material />} />
      <Route path="/thickness" element={<Thickness />} />
      <Route path="/colors" element={<Colors />} />
      <Route path="/finish" element={<Finish   />} />
      <Route path="/AddMaterial" element={<AddMaterial />} />
      <Route path="/materialThickness" element={<MaterialThickness />} />
      <Route path="/materialColor" element={<MaterialColor />} />
      <Route path="/materialFinish" element={<MaterialFinish />} />
      <Route path="/materialMachine" element={<MaterialMachine />} />
      <Route path="/Orders" element={<Orders />} />
      <Route path="/AddFaq" element={<AddFaq />} />
      <Route path="/Faq" element={<Faq />} />
      <Route path="/AddMachine" element={<AddMachine />} />
      <Route path="/Machine" element={<Machine />} />
      <Route path="/sheet" element={<Sheets />} />
      <Route path="/percentages" element={<Percentages />} />
    </Routes>
  );
};

export default AllRoutes;
