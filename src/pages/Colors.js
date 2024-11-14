import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Topnav from '../components/topnav/TopNav'
import styles from "./Users.module.css";
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import instance from '../helpers/axios';
import { useNavigate } from 'react-router-dom';
import ColorsComponent from '../components/Colors/ColorsComponent';
import AddColor from './AddColor';


const TableHeadder = {
    head: [
      "Sl.No",
      "Color name",
      "Actions",
    ],
  };

const Colors = () => {
    const navigate = useNavigate();

    const [colors, setColors] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getColors = async() => {
        try {
          const res = await instance.get("/admin/colors");
          setColors(res.data)
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
          await instance.post("/admin/createColors", data);
          getColors();
          handleClose();
          Swal.fire({
            icon:'success',
            title: 'Color added successfully!',
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
          await instance.delete(`/admin/color/delete/${id}`);
          
          Swal.fire({
            icon:'success',
            title: 'Thickness deleted successfully!',
            confirmButtonText:"Okay",
            timer: 3000,
          })
          getColors();
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
          await instance.put("/admin/color/update", item);
          getColors();
          Swal.fire({
            icon:'success',
            title: 'Color Updated Successfully!',
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
        getColors();
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
                  <h1>Add Color</h1>
                </div>
              </div>
            </div>
            <ColorsComponent
              TableHeadder={TableHeadder}
              colors={colors}
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
          <Modal.Title>Add Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddColor handleSubmit={handleSubmit} />
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

export default Colors