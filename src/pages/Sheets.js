import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Button } from "@chakra-ui/react";
import Sidebar from "../components/sidebar/Sidebar";
import Topnav from "../components/topnav/TopNav";
import styles from "./Users.module.css";
import AddSheets from "./AddSheets";
import SheetTable from "../components/SheetTable/SheetTable";
const Sheets = () => {
  const [sheets, setSheets] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const TableHeadder = {
    head: ["Sl.No", "Height", "Width", "Cost per sheet", "Actions"],
  };

  const getSheet = () => {
    fetch("http://14.140.119.44:8000/admin/get-sheet", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        setSheets(res);
      })
      .catch((err) => console.log("Login Error: ", err));
  };
  const handleUpdate = (data) => {
    fetch("http://14.140.119.44:8000/admin/update-sheet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        getSheet();
      })
      .catch((err) => console.log("Login Error: ", err));
  };
  const handleSubmit = (data) => {
    fetch("http://14.140.119.44:8000/admin/create-sheet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        getSheet();
        handleClose();
      })
      //   .then((res) => history.push("/Materials"))
      .catch((err) => console.log("SignUP Error: ", err));
  };
  const handleDelete = async (id) => {
    const res = await axios.delete(
      `http://14.140.119.44:8000/admin/delete-sheet/${id}`
    );
    if (res.data === "Successfully Deleted") {
      getSheet();
    }
  };
  useEffect(() => {
    getSheet();
  }, []);
  return (
    <>
      <div className={`layout theme-mode-dark`}>
        <Sidebar />
        <div className="layout__content">
          <Topnav />
          <div className="layout__content-main">
            <div className="col-4">
              <div className={styles.addUserContainer} onClick={handleShow}>
                <div className="status-card__icon">
                  <i className="bx bxs-user-plus"></i>
                </div>
                <div className={styles.iconText}>
                  <h1>Add Sheet</h1>
                </div>
              </div>
            </div>
            <SheetTable
              TableHeadder={TableHeadder}
              sheets={sheets}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
      <Modal
        //   dialogClassName={style.modal90w}

        fullscreen={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Machine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddSheets handleSubmit={handleSubmit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Sheets;
