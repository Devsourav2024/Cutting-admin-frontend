import React, { useRef, useState } from "react";
import { Table } from "react-bootstrap";

import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

import "./style.css";
import styles from "./Users.module.css";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Select, Stack, useDisclosure } from "@chakra-ui/react";

const PercentageComponent = ({
  TableHeadder,
  percentages,
  handleDelete,
  handleUpdate,
}) => {
  const btnRef = useRef();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [payload, setPayload] = useState({});
  const handleClick = (item) => {
    setPayload(item);
    onOpen();
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setPayload({...payload, [id]: value});
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
          <DrawerHeader>Update percentage</DrawerHeader>

          <DrawerBody>
            <Stack spacing={3}>
              <label style={{ color: "white" }}>Percentage Name</label>
              <Input
                id="percentage_name"
                placeholder="Percentage name"
                defaultValue={payload.percentage_name}
                type="text"
                size="md"
                disabled
              />
              <label style={{ color: "white" }}>Percentage</label>
              <Input
                id="percentage"
                placeholder="Percentage"
                defaultValue={payload.percentage}
                type="number"
                size="md"
                onChange={handleChange}
              />
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={() => handleUpdate(payload)}>
              Update
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="card">
        <div className="card__header">
          <h3>Percentages</h3>
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
              {percentages &&
                percentages.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.percentage_name}</td>
                      <td>{item.percentage} %</td>
                      <div className={styles.actionBtnContainer}>
                        <button
                          className={styles.usersActionBtn}
                          ref={btnRef}
                          colorScheme="teal"
                          onClick={() => handleClick(item)}
                        >
                          <BiEdit />
                        </button>

                        {/* <button className={styles.usersActionBtn}>
                          <MdDeleteForever
                            onClick={() => handleDelete(item.percentage_id)}
                          />
                        </button> */}
                      </div>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PercentageComponent;
