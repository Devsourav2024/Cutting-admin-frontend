import React, { useState, useRef } from "react";
import { Table } from "react-bootstrap";
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
} from "@chakra-ui/react"
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { FcAbout } from "react-icons/fc";

import "./style.css";
import styles from "./Users.module.css";

const Materials = ({
  TableHeadder,
  materials,
  orders,
  handleDelete,
  handleUpdate,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [materialDetails, setMaterialDetails] = useState("");

  const btnRef = useRef();
  const handleClick = async(item) => {
    console.log("Edit material: ----> ", item);
    setMaterialDetails(item);
    onOpen();
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
          <DrawerHeader>Material Details</DrawerHeader>

          <DrawerBody>
            <Stack spacing={3}>
              <label style={{ color: "white" }}>Material Name</label>
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
          <h3>Materials</h3>
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
                      <td>{item.order_date}</td>
                      <td>{item.delivery_date}</td>
                      <td>{item.total_cost}</td>
                      <td>{item.payment_method}</td>
                      <td>{item.payment_status}</td>
                      <td>{item.shipping_method}</td>
                      <td>{item.status}</td>

                      <div className={styles.actionBtnContainer}>
                        <button
                          className={styles.usersActionBtn}
                          ref={btnRef}
                          colorScheme="teal"
                          onClick={() => handleClick(item)}
                        >
                          <FcAbout color="white" />
                        </button>

                        <button className={styles.usersActionBtn}>
                          <MdDeleteForever
                            onClick={() => handleDelete(item.material_id)}
                          />
                        </button>
                      </div>
                    </tr>
                  );
                })}
              {materials &&
                materials.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.material_id}</td>
                      <td>{item.material_name}</td>
                      <div className={styles.actionBtnContainer}>
                        <button
                          className={styles.usersActionBtn}
                          ref={btnRef}
                          colorScheme="teal"
                          onClick={() => handleClick(item)}
                        >
                          <BiEdit />
                        </button>

                        <button className={styles.usersActionBtn}>
                          <MdDeleteForever
                            onClick={() => handleDelete(item.material_id)}
                          />
                        </button>
                      </div>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Materials;
