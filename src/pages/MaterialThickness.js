import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Topnav from '../components/topnav/TopNav'
import styles from "./Users.module.css";
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import instance from '../helpers/axios';
import { useNavigate } from 'react-router-dom';
import MaterialThicknessComponent from '../components/MaterialThickness/MaterialThicknessComponent';
import AddMaterialThickness from './AddMaterialThickness';


const TableHeadder = {
    head: [
      "Sl.No",
      "Material name",
      "Thickness",
      "Price",
      "Cutting price",
      "Actions",
    ],
  };

const MaterialThickness = () => {
    const navigate = useNavigate();

    const [materialThickness, setMaterialThickness] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getMaterialThickness = async() => {
        try {
          const res = await instance.get("/admin/materialThickness");
          setMaterialThickness(res.data)
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
          await instance.post("/admin/createMaterialThickness", data);
          getMaterialThickness();
          handleClose();
          Swal.fire({
            icon:'success',
            title: 'Material thickness added successfully!',
            confirmButtonText:"Okay",
            timer: 3000,
          })
        } catch (error) {
          Swal.fire({
            icon: 'warning',
            title: "Something went wrong!",
            text: "Please try again later.",
            confirmButtonText:"Okay!"
          }).then(()=> navigate("/materialThickness"))
        }
      };
    const handleDelete = async(id) => {
        try {
          await instance.delete(`/admin/materialThickness/delete/${id}`);
          
          Swal.fire({
            icon:'success',
            title: 'Material thickness deleted successfully!',
            confirmButtonText:"Okay",
            timer: 3000,
          })
          getMaterialThickness();
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
          await instance.put("/admin/materialThickness/update", item);
          getMaterialThickness();
          Swal.fire({
            icon:'success',
            title: 'Material thickness Updated Successfully!',
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
        getMaterialThickness();
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
                  <h1>Add Material Thickness</h1>
                </div>
              </div>
            </div>
            <MaterialThicknessComponent
              TableHeadder={TableHeadder}
              materialThickness={materialThickness}
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
          <Modal.Title>Add Material Thickness</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMaterialThickness handleSubmit={handleSubmit} />
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

export default MaterialThickness