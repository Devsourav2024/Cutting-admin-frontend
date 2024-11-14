import React, { useState, useRef } from "react";
import { Table, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
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
import { MdDeleteForever } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import Swal from "sweetalert2";
import OrderDetails from "../OrderDetails/OrderDetails";

import "./style.css";
import styles from "./Users.module.css";
import axios from "axios";

const OrdersTable = ({
  TableHeadder,
  materials,
  orders,
  handleDelete,
  handleUpdate,
  getOrders,
}) => {
  const { isOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const [materialDetails, setMaterialDetails] = useState("");
  const [ID, setID] = useState("");
  const btnRef = useRef();
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setID(id);
    setShow(true);
  };
  const handleStatus = async (item) => {
    try {
      const data = {
        status: "completed",
      };
      const res = await axios.put(
        `https://thecuttingcenter.com/cuttingBackend/admin/update-order-payment-status/${item.order_id}`,
        data
      );
      console.log("res", res);
      if (res?.data?.message === "Payment status Update successfully.") {
        getOrders();
        Swal.fire({
          icon: "success",
          title: res.data.message,
          timer: 3000,
        });
      }
    } catch (error) {}
  };
  return (
    <div>
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
          <DrawerHeader>Orders Details</DrawerHeader>

          <DrawerBody>
            <Stack spacing={3}>
              <Input
                placeholder="medium size"
                defaultValue={materialDetails.material_name}
                size="md"
                onChange={(e) =>
                  setMaterialDetails({
                    ...materialDetails,
                    material_name: e.target.value,
                  })
                }
              />
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => handleUpdate(materialDetails)}
            >
              Update
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="card">
        <div className="card__header">
          <h3>Orders</h3>
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
              {orders &&
                orders.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{`100` + item.order_id}</td>
                      <td>{item.first_name + " " + item.last_name}</td>
                      <td>{item.shipping_method}</td>
                      <td>{item.shipping_address}</td>
                      <td>{item.amount}</td>
                      <td>{item.selling_price}</td>
                      <td>{item.payment_method}</td>
                      {/* <td
                        role={item.payment_status == "pending" ? "button" : ""}
                        onClick={() =>
                          item.payment_status == "pending"
                            ? handleStatus(item)
                            : ""
                        }
                      >
                        {item.payment_status}
                      </td> */}
                      {item.payment_status === "pending" ? (
                        <td
                          title="Click to change status"
                          onClick={() =>
                            item.payment_status == "pending"
                              ? handleStatus(item)
                              : ""
                          }
                        >
                          {item.payment_status}
                        </td>
                      ) : (
                        <td>{item.payment_status}</td>
                      )}
                      <td>{new Date(item.created_at).toLocaleString()}</td>

                      <td>
                        <div className={styles.actionBtnContainer}>
                          <button
                            className={styles.usersActionBtn}
                            ref={btnRef}
                            colorScheme="teal"
                            onClick={() => handleShow(item.order_id)}
                          >
                            <FcAbout color="white" />
                          </button>

                          {/* <button className={styles.usersActionBtn}>
                            <MdDeleteForever
                              onClick={() => handleDelete(item.order_id)}
                            />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
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
          <Modal.Title>Order Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <AddFaq handleSubmit={handleSubmit} /> */}
          <OrderDetails id={ID} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrdersTable;
