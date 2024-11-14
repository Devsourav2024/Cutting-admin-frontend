import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@chakra-ui/react";
import MachineComponent from "../components/Machine/MachineComponent";
import Sidebar from "../components/sidebar/Sidebar";
import Topnav from "../components/topnav/TopNav";
import AddMachine from "./AddMachine";

import styles from "./Users.module.css";
import instance from "../helpers/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Machine = () => {
  const navigate = useNavigate();
  const [machines, setMachines] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const TableHeadder = {
    head: [
      "Sl.No",
      "Name",
      "Actions",
    ],
  };

  const handleSubmit = async(data) => {
    try {
      console.log(data)
      await instance.post("/admin/createMachines", data);
      getMachines();
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: "Something went wrong!",
        text: "Please try again later.",
        confirmButtonText:"Okay!"
      }).then(()=> navigate("/Materials"))
    }
  };

  const getMachines = async() => {
    try {
      const res = await instance.get("/admin/machines");
      setMachines(res.data)
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: "Something went wrong!",
        text: "Please refresh the page.",
        confirmButtonText:"Okay!"
      })
    }
  };
  const handleDelete = async(id) => {
    try {
      await instance.delete(`/admin/machine/delete/${id}`);
      
      Swal.fire({
        icon:'success',
        title: 'Machine deleted successfully!',
        confirmButtonText:"Okay",
        timer: 3000,
      })
      getMachines();
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: "Something went wrong!",
        text: "Please refresh the page.",
        confirmButtonText:"Okay!"
      })
    }
  };
  const handleUpdate = async(item) => {
    try {
      await instance.put("/admin/machine/update", item);
      getMachines();
      Swal.fire({
        icon:'success',
        title: 'Machine Updated Successfully!',
        confirmButtonText:"Okay",
        timer: 3000,
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text:'Please try again.',
        confirmButtonText:"Okay",
        timer: 3000,
      })
    }
  };
  useEffect(() => {
    getMachines();
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
                  <h1>Add Machine</h1>
                </div>
              </div>
            </div>
            <MachineComponent
              TableHeadder={TableHeadder}
              machines={machines}
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
          <AddMachine handleSubmit={handleSubmit} />
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

export default Machine;
