import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@chakra-ui/react";
import FaqComponent from "../components/Faq/FaqComponent";
import Sidebar from "../components/sidebar/Sidebar";
import Topnav from "../components/topnav/TopNav";
import AddFaq from "./AddFaq";

import styles from "./Users.module.css";
import instance from "../helpers/axios";
import Swal from "sweetalert2";

const Faq = () => {
  const TableHeadder = {
    head: ["Sl.No", "Question?", "Answer", "Actions"],
  };

  const [faqs, setFaqs] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async(data) => {
    try {
      await instance.post("/admin/faq/add", data);
      getFaqs();
      handleClose();
      Swal.fire({
        icon:'success',
        title: `FAQ added successfully!`,
        timer: 3000,
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text:'something went wrong!',
        confirmButtonText:"OK!",
        timer:3000
      })
    }
  };

  const getFaqs = async () => {
    try {
      const {data} = await instance.get("/admin/faqs");
      setFaqs(data);
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        text:'something went wrong!',
        confirmButtonText:"OK!",
        timer:3000
      })
    }
  };

  useEffect(() => {
    getFaqs();
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
                  <h1>Add Faq</h1>
                </div>
              </div>
            </div>
            <FaqComponent
              TableHeadder={TableHeadder}
              faqs={faqs}
              getFaqs={getFaqs}
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
          <Modal.Title>Add Faq</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddFaq handleSubmit={handleSubmit} />
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

export default Faq;
