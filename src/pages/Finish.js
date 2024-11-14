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
import FinishComponent from '../components/Finish/FinishComponent';
import AddFinish from './AddFinish';


const TableHeadder = {
    head: [
      "Sl.No",
      "Finish name",
      "Actions",
    ],
  };

const Finish = () => {
    const navigate = useNavigate();

    const [finish, setFinish] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getFinish = async() => {
        try {
          const res = await instance.get("/admin/finish");
          setFinish(res.data)
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
          await instance.post("/admin/createFinish", data);
          getFinish();
          handleClose();
          Swal.fire({
            icon:'success',
            title: 'Finish added successfully!',
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
          await instance.delete(`/admin/finish/delete/${id}`);
          
          Swal.fire({
            icon:'success',
            title: 'Finish deleted successfully!',
            confirmButtonText:"Okay",
            timer: 3000,
          })
          getFinish();
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
          await instance.put("/admin/finish/update", item);
          getFinish();
          Swal.fire({
            icon:'success',
            title: 'Finish Updated Successfully!',
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
        getFinish();
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
                  <h1>Add Finish</h1>
                </div>
              </div>
            </div>
            <FinishComponent
              TableHeadder={TableHeadder}
              finish={finish}
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
          <Modal.Title>Add Finish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddFinish handleSubmit={handleSubmit} />
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

export default Finish