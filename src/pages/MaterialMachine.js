import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Topnav from '../components/topnav/TopNav'
import styles from "./Users.module.css";
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import instance from '../helpers/axios';
import { useNavigate } from 'react-router-dom';
import AddMaterialMachine from './AddMaterialMachine';
import MaterialMachineComponent from '../components/MaterialMachine/MaterialMachineComponent';

const TableHeadder = {
    head: [
      "Sl.No",
      "Material name",
      "Machine Name",
      "Actions",
    ],
  };

const MaterialMachine = () => {
    const navigate = useNavigate();

    const [materialMachines, setMaterialMachines] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getMaterialMachines = async() => {
        try {
          const res = await instance.get("/admin/materialMachine");
          setMaterialMachines(res.data)
        } catch (error) {
          Swal.fire({
            icon: 'warning',
            title: "Something went wrong!",
            text: "Please refresh the page.",
            confirmButtonText:"Okay!"
          })
        }
    }
    const handleSubmit = async(data) => {
        try {
          await instance.post("/admin/createMaterialMachine", data);
          getMaterialMachines();
          handleClose();
          Swal.fire({
            icon:'success',
            title: 'Material machine added successfully!',
            confirmButtonText:"Okay",
            timer: 3000,
          })
        } catch (error) {
          Swal.fire({
            icon: 'warning',
            title: "Something went wrong!",
            text: "Please try again later.",
            confirmButtonText:"Okay!"
          }).then(()=> navigate("/materialMachine"))
        }
      };
    const handleDelete = async(id) => {
        try {
          await instance.delete(`/admin/materialMachine/delete/${id}`);
          
          Swal.fire({
            icon:'success',
            title: 'Material machine deleted successfully!',
            confirmButtonText:"Okay",
            timer: 3000,
          })
          getMaterialMachines();
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
          await instance.put("/admin/materialMachine/update", item);
          getMaterialMachines();
          Swal.fire({
            icon:'success',
            title: 'Material machine Updated Successfully!',
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
    useEffect(()=>{
        getMaterialMachines();
    },[])
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
                  <h1>Add Material Machine</h1>
                </div>
              </div>
            </div>
            <MaterialMachineComponent
              TableHeadder={TableHeadder}
              materialMachines={materialMachines}
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
          <Modal.Title>Add Material Machine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMaterialMachine handleSubmit={handleSubmit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MaterialMachine