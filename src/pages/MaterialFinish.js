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
import AddMaterialFinish from './AddMaterialFinish';
import MaterialFinishComponent from '../components/MaterialFinish/MaterialFinishComponent';

const TableHeadder = {
    head: [
      "Sl.No",
      "Material name",
      "Finish Name",
      "Actions",
    ],
  };

const MaterialFinish = () => {
    const navigate = useNavigate();

    const [materialFinish, setMaterialFinish] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getMaterialFinish = async() => {
        try {
          const res = await instance.get("/admin/materialFinish");
          setMaterialFinish(res.data)
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
          await instance.post("/admin/createMaterialFinish", data);
          getMaterialFinish();
          handleClose();
          Swal.fire({
            icon:'success',
            title: 'Material finish added successfully!',
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
          await instance.delete(`/admin/materialFinish/delete/${id}`);
          
          Swal.fire({
            icon:'success',
            title: 'Material finish deleted successfully!',
            confirmButtonText:"Okay",
            timer: 3000,
          })
          getMaterialFinish();
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
          await instance.put("/admin/materialFinish/update", item);
          getMaterialFinish();
          Swal.fire({
            icon:'success',
            title: 'Material finish Updated Successfully!',
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
        getMaterialFinish();
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
                  <h1>Add Material Finish</h1>
                </div>
              </div>
            </div>
            <MaterialFinishComponent
              TableHeadder={TableHeadder}
              materialFinish={materialFinish}
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
          <Modal.Title>Add Material Finish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMaterialFinish handleSubmit={handleSubmit} />
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

export default MaterialFinish