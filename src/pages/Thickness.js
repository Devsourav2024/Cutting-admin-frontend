import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Topnav from '../components/topnav/TopNav'
import styles from "./Users.module.css";
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import instance from '../helpers/axios';
import AddThickness from './AddThickness';
import { useNavigate } from 'react-router-dom';
import ThicknessComponent from '../components/Thickness/ThicknessComponent';


const TableHeadder = {
    head: [
      "Sl.No",
      "Thickness",
      "Actions",
    ],
  };

const Thickness = () => {
    const navigate = useNavigate();

    const [thickness, setThickness] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getThickness = async() => {
        try {
          const res = await instance.get("/admin/thickness");
          setThickness(res.data)
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
          console.log(data)
          await instance.post("/admin/createThickness", data);
          getThickness();
          handleClose();
          Swal.fire({
            icon:'success',
            title: 'Thickness added successfully!',
            confirmButtonText:"Okay",
            timer: 3000,
          })
        } catch (error) {
          Swal.fire({
            icon: 'warning',
            title: "Something went wrong!",
            text: "Please try again later.",
            confirmButtonText:"Okay!"
          }).then(()=> navigate("/Materials"))
        }
      };
    const handleDelete = async(id) => {
        try {
          await instance.delete(`/admin/thickness/delete/${id}`);
          
          Swal.fire({
            icon:'success',
            title: 'Thickness deleted successfully!',
            confirmButtonText:"Okay",
            timer: 3000,
          })
          getThickness();
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
          await instance.put("/admin/thickness/update", item);
          getThickness();
          Swal.fire({
            icon:'success',
            title: 'Thickness Updated Successfully!',
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
        getThickness();
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
                  <h1>Add Thickness</h1>
                </div>
              </div>
            </div>
            <ThicknessComponent
              TableHeadder={TableHeadder}
              thickness={thickness}
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
          <Modal.Title>Add Thickness</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddThickness handleSubmit={handleSubmit} />
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

export default Thickness