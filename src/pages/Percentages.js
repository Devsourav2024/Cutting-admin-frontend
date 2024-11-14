import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@chakra-ui/react";
import Sidebar from "../components/sidebar/Sidebar";
import Topnav from "../components/topnav/TopNav";

import styles from "./Users.module.css";
import PercentageComponent from "../components/MarginAndLabour/PercentageComponent";
import instance from "../helpers/axios";
import AddPercentage from "./AddPercentage";
import Swal from "sweetalert2";

const Percentages = () => {
  const [percentagesData, setPercentagesData] = useState("");
  const [showAddPercentageModal, setShowAddPercentageModal] = useState(false);
  const [payload, setPayload] = useState({});
  const TableHeadder = {
    head: ["Sl.No", "Percentage Name", "Percentage","Actions"],
  };
  const handleCloseShowAddPercentageModal = () => setShowAddPercentageModal(false);
  const handleShowAddPercentageModal = () => setShowAddPercentageModal(true);

  const handleSubmit = (data) => {
    const API = "http://14.140.119.44:8000/admin/update-margin";
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        getPercentages();
        setShowAddPercentageModal(false);
      })
      .catch((err) => console.log("SignUP Error: ", err));
  };

  const getPercentages = async() => {
    try {
      const {data} = await instance.get("/admin/percentages");
      setPercentagesData(data);
    } catch (error) {
      
    }
  };
  const handleDelete = (id) => {
    fetch("http://14.140.119.44:8000/product/deleteMaterial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ material_id: id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "Wrong Password!") {
          alert("Wrong Password!");
        } else {
          getPercentages();
        }
      })
      .catch((err) => console.log("Login Error: ", err));
  };
  const handleUpdate = async (item) => {
   try {
      await instance.put("/admin/percentage/update", item);
      getPercentages();
      Swal.fire({
        icon: 'success',
        title: "Update successfully",
        text: `${item.percentage_name} is updated successfully.`,
        confirmButtonText:"Okay!",
        timer:3000
      })
      
   } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Something went wrong!",
      text: "Please refresh the page.",
      confirmButtonText:"Okay!",
      timer:3000
    })
   }
  };
  const hadleAddPercentageChange= (event)=>{
    const {id, value} = event.target;
      setPayload({...payload, [id]: value })
  }
  useEffect(() => {
    getPercentages();
  }, []);
  return (
    <>
      <div className={`layout theme-mode-dark`}>
        <Sidebar />
        <div className="layout__content">
          <Topnav />
          <div className="layout__content-main">
            {/* <div>
              <div className="col-4">
                <div
                  className={styles.addUserContainer}
                  onClick={handleShowAddPercentageModal}
                >
                  <div className="status-card__icon">
                    <i className="bx bxs-user-plus"></i>
                  </div>
                  <div className={styles.iconText}>
                    <h1>
                       Add Percentage
                    </h1>
                  </div>
                </div>
              </div>
           </div> */}
            <PercentageComponent
              TableHeadder={TableHeadder}
              percentages={percentagesData}
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
        show={showAddPercentageModal}
        onHide={handleShowAddPercentageModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add percentage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPercentage handleChange = {hadleAddPercentageChange} handleSubmit={handleSubmit} margin={percentagesData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseShowAddPercentageModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Percentages;
