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
import MaterialColorComponent from '../components/MaterialColor/MaterialColorComponent';
import AddMaterialColor from './AddMaterialColor';

const TableHeadder = {
    head: [
      "Sl.No",
      "Material name",
      "Color Name",
      "Actions",
    ],
  };

const MaterialColor = () => {
    const navigate = useNavigate();

    const [materialColors, setMaterialColors] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getMaterialColors = async() => {
        try {
          const res = await instance.get("/admin/materialColor");
          setMaterialColors(res.data)
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
          await instance.post("/admin/createMaterialColor", data);
          getMaterialColors();
          handleClose();
          Swal.fire({
            icon:'success',
            title: 'Material color added successfully!',
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
          await instance.delete(`/admin/materialColor/delete/${id}`);
          
          Swal.fire({
            icon:'success',
            title: 'Material color deleted successfully!',
            confirmButtonText:"Okay",
            timer: 3000,
          })
          getMaterialColors();
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
          await instance.put("/admin/materialColor/update", item);
          getMaterialColors();
          Swal.fire({
            icon:'success',
            title: 'Material color Updated Successfully!',
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
        getMaterialColors();
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
                  <h1>Add Material Color</h1>
                </div>
              </div>
            </div>
            <MaterialColorComponent
              TableHeadder={TableHeadder}
              materialColors={materialColors}
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
          <Modal.Title>Add Material Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMaterialColor handleSubmit={handleSubmit} />
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

export default MaterialColor