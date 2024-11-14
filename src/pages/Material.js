import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@chakra-ui/react";
import Materials from "../components/Materials/Materials";
import Sidebar from "../components/sidebar/Sidebar";
import Topnav from "../components/topnav/TopNav";
import AddMaterial from "./AddMaterial";

import styles from "./Users.module.css";
import instance from "../helpers/axios";
import Swal from "sweetalert2";

const Material = () => {
  const [materials, setMaterials] = useState("");
  const [show, setShow] = useState(false);
  const TableHeadder = {
    head: [
      "Sl.No",
      "Material Name",
      "Actions",
    ],
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async(data) => {
    try {
      await instance.post("/admin/createMaterial", data);
      Swal.fire({
        icon:'success',
        title: 'Material added successfully!',
        confirmButtonText:"Okay",
        timer: 3000,
      });
      getMaterials();
     setShow(false);
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: "Something went wrong!",
        text: "Please refresh the page.",
        confirmButtonText:"Okay!"
      })
    }
    // fetch("http://14.140.119.44:8000/product/addMaterial", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     getMaterials();
    //     setShow(false);
    //   })
    //   .catch((err) => console.log("SignUP Error: ", err));
  };

  const getMaterials = async() => {
    try {
      const res = await instance.get("/admin/materials");
      setMaterials(res.data);
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: "Something went wrong!",
        text: "Please refresh the page.",
        confirmButtonText:"Okay!"
      })
    }
    // fetch("http://14.140.119.44:8000/admin/materials", {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.msg === "Wrong Password!") {
    //       alert("Wrong Password!");
    //     } else {
    //       setMaterials(res);
    //       localStorage.setItem("materials", JSON.stringify(res[0]));
    //     }
    //   })
    //   .catch((err) => console.log("Login Error: ", err));
  };
  const handleDelete = async(id) => {
    try {
      await instance.delete(`/admin/material/delete/${id}`);
      getMaterials();
      Swal.fire({
        icon:'success',
        title: 'Material deleted successfully!',
        confirmButtonText:"Okay",
        timer: 3000,
      });
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: "Something went wrong!",
        text: "Please refresh the page.",
        confirmButtonText:"Okay!"
      })
    }
  };
  const handleUpdate = async (item) => {
    try {
      await instance.put("/admin/material/update", item);
      getMaterials();
      Swal.fire({
        icon:'success',
        title: 'Material update successfully!',
        confirmButtonText:"Okay",
        timer: 3000,
      });
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: "Something went wrong!",
        text: "Please refresh the page.",
        confirmButtonText:"Okay!"
      })
    }
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
            <div className="col-4">
              <div className={styles.addUserContainer} onClick={handleShow}>
                <div className="status-card__icon">
                  <i className="bx bxs-user-plus"></i>
                </div>
                <div className={styles.iconText}>
                  <h1>Add Material</h1>
                </div>
              </div>
            </div>
            <Materials
              TableHeadder={TableHeadder}
              materials={materials}
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
          <Modal.Title>Add Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMaterial handleSubmit={handleSubmit} />
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

export default Material;
