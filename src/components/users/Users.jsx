import React, { useEffect, useState, useRef } from "react";
import { Table, Modal } from "react-bootstrap";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";

import Sidebar from "../sidebar/Sidebar";
import Topnav from "../topnav/TopNav";
import AddUsers from "../../pages/AddUsers";

import "./style.css";
import styles from "./Users.module.css";
import instance from "../../helpers/axios";
import Swal from "sweetalert2";

const TableHeadder = {
  head: [
    "User Id",
    "First Name",
    "Last Name",
    "Email",
    "Phone Number",
    "Address",
    "Actions",
  ],
};

const Users = () => {
  const [users, setUsers] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [userDetails, setUserDetails] = useState("");
  const [show, setShow] = useState(false);
  const btnRef = useRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (data) => {
    try {
      await instance.post("/admin/user/create", data);
      Swal.fire({
        title:'success',
        text:"User created successfully!",
        icon:'success',
        confirmButtonText: 'Ok',
        timer:3000
      }).then(()=> handleClose());
    } catch (error) {
      console.log(error)
      Swal.fire({
        title:'Error',
        text:error.data?.error || "Something went wrong",
        icon:'error',
        confirmButtonText: 'Ok',
        timer:3000
      })
    }
  };
  const getUsers = async() => {
    try {
      const {data} = await instance.get("/admin/users/all")
      setUsers(data);
    } catch (error) {
      console.log(error)
      Swal.fire({
        title:'Error',
        text:"Something went wrong!",
        icon:'error',
        confirmButtonText: 'Ok',
        timer:3000
      })
    }
  };
  const handleClick = (item) => {
    setUserDetails(item);
    onOpen();
  };
  const handleDelete = async (id) => {
    try {
      await instance.delete(`/admin/user/delete/${id}`);
      getUsers();
      Swal.fire({
        title:'success',
        text:"Deleted successfully!",
        icon:'success',
        confirmButtonText: 'Ok',
        timer:3000
      })
    } catch (error) {
      Swal.fire({
        title:'Error',
        text:"Something went wrong!",
        icon:'error',
        confirmButtonText: 'Ok',
        timer:3000
      })
    }
  };
  const handleUpdate = async(id) => {
    try {
      await instance.put(`/admin/user/update/${id}`, userDetails);
      getUsers();
      Swal.fire({
        title:'success',
        text:"Updated successfully!",
        icon:'success',
        confirmButtonText: 'Ok',
        timer:3000
      })
    } catch (error) {
      Swal.fire({
        title:'Error',
        text:"Something went wrong!",
        icon:'error',
        confirmButtonText: 'Ok',
        timer:3000

      })
    }
  };
  useEffect(() => {
    getUsers();
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
                  <h1>Add User</h1>
                </div>
              </div>
            </div>
            <div>
              <div className="card">
                <div className="card__header">
                  <h3>Users</h3>
                </div>
                <div className="card__body">
                  <Table striped bordered hover className="table-dark">
                    <thead>
                      <tr>
                        {TableHeadder.head.map((item, index) => {
                          return <th key={index}>{item}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.first_name}</td>
                              <td>{item.last_name}</td>
                              <td>{item.email}</td>
                              <td>{item.contact_number}</td>
                              <td>{item.address}</td>
                              <td>
                                <div className={styles.actionBtnContainer}>
                                  <button
                                    className={styles.usersActionBtn}
                                    ref={btnRef}
                                    colorScheme="teal"
                                    onClick={() => handleClick(item)}
                                  >
                                    <BiEdit />
                                  </button>
                                  <>
                                    <Drawer
                                      isOpen={isOpen}
                                      placement="right"
                                      onClose={onClose}
                                      size="md"
                                      finalFocusRef={btnRef}
                                    >
                                      <DrawerOverlay />
                                      <DrawerContent>
                                        <DrawerCloseButton />
                                        <DrawerHeader>
                                          User Details
                                        </DrawerHeader>

                                        <DrawerBody>
                                          <Stack spacing={3}>
                                            <label style={{ color: "white" }}>
                                              Firstname
                                            </label>
                                            <Input
                                              placeholder="medium size"
                                              defaultValue={
                                                userDetails.first_name
                                              }
                                              size="md"
                                              onChange={(e) =>
                                                setUserDetails({
                                                  ...userDetails,
                                                  first_name: e.target.value,
                                                })
                                              }
                                            />
                                            <label style={{ color: "white" }}>
                                              Lastname
                                            </label>
                                            <Input
                                              placeholder="medium size"
                                              defaultValue={
                                                userDetails.last_name
                                              }
                                              size="md"
                                              onChange={(e) =>
                                                setUserDetails({
                                                  ...userDetails,
                                                  last_name: e.target.value,
                                                })
                                              }
                                            />
                                            <label style={{ color: "white" }}>
                                              Email
                                            </label>
                                            <Input
                                              placeholder="medium size"
                                              defaultValue={userDetails.email}
                                              size="md"
                                              onChange={(e) =>
                                                setUserDetails({
                                                  ...userDetails,
                                                  email: e.target.value,
                                                })
                                              }
                                            />
                                            <label style={{ color: "white" }}>
                                              Contact Number
                                            </label>
                                            <Input
                                              placeholder="medium size"
                                              defaultValue={
                                                userDetails.contact_number
                                              }
                                              size="md"
                                              onChange={(e) =>
                                                setUserDetails({
                                                  ...userDetails,
                                                  contact_number:
                                                    e.target.value,
                                                })
                                              }
                                            />
                                            <label style={{ color: "white" }}>
                                              Address
                                            </label>
                                            <Input
                                              placeholder="medium size"
                                              defaultValue={userDetails.address}
                                              size="md"
                                              onChange={(e) =>
                                                setUserDetails({
                                                  ...userDetails,
                                                  address: e.target.value,
                                                })
                                              }
                                            />
                                          </Stack>
                                        </DrawerBody>

                                        <DrawerFooter>
                                          <Button
                                            variant="outline"
                                            mr={3}
                                            onClick={onClose}
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            colorScheme="blue"
                                            onClick={() =>
                                              handleUpdate(
                                                userDetails.user_id
                                              )
                                            }
                                          >
                                            Update
                                          </Button>
                                        </DrawerFooter>
                                      </DrawerContent>
                                    </Drawer>
                                  </>
                                  <button
                                    className={styles.usersActionBtn}
                                    onClick={() =>
                                      handleDelete(item.customer_id)
                                    }
                                  >
                                    <MdDeleteForever />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
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
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddUsers handleSubmit={handleSubmit} />
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

export default Users;
