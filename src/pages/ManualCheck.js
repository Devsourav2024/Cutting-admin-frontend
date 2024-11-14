import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@chakra-ui/react";
import ManualChecks from "../components/ManualChecks/ManualCheck";
import Sidebar from "../components/sidebar/Sidebar";
import Topnav from "../components/topnav/TopNav";
import AddMaterial from "./AddMaterial";

import styles from "./Users.module.css";

const ManualCheck = () => {
  const [items, setItems] = useState("");
  const [show, setShow] = useState(false);
  const TableHeadder = {
    head: [
      "Sl.No",
      "Client ID",
      "Design Link",
      "Status",
      "Actions",
    ],
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (data) => {
    fetch("http://14.140.119.44:8000/product/addMaterial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        getMaterials();
        setShow(false);
      })
      .catch((err) => console.log("SignUP Error: ", err));
  };

  const getMaterials = () => {
    fetch("http://14.140.119.44:8000/manual/manual-tasks", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "Wrong Password!") {
          alert("Wrong Password!");
        } else {
            console.log("Get the manual tasks: ", res)
            setItems(res);
        }
      })
      .catch((err) => console.log("Login Error: ", err));
  };
  const handleSend = (id) => {
    // fetch("http://14.140.119.44:8000/manual/sendmail", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ material_id: id }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.msg === "Wrong Password!") {
    //       alert("Wrong Password!");
    //     } else {
    //       getMaterials();
    //     }
    //   })
    //   .catch((err) => console.log("Login Error: ", err));
  };
  const handleUpdate = (item) => {
    fetch("http://14.140.119.44:8000/manual/updat-order-item", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...item}),
    })
      .then((res) => {
          getMaterials();
      })
      .catch((err) => console.log("Login Error: ", err));
  };
  useEffect(() => {
    getMaterials();
  }, []);
  return (
    <>
      <div className={`layout theme-mode-dark`}>
        <Sidebar />
        <div className="layout__content">
          <Topnav />
          <div className="layout__content-main">
            
            <ManualChecks
              TableHeadder={TableHeadder}
              items={items}
              handleSend={handleSend}
              handleUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManualCheck;
