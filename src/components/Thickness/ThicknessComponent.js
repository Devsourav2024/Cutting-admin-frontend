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
} from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

import "./style.css";
import styles from "./Users.module.css";

const ThicknessComponent = ({
  TableHeadder,
  thickness,
  handleDelete,
  handleUpdate,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [payload, setPayload] = useState("");
  const btnRef = useRef();
  const handleClick = (item) => {
    setPayload(item);
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
          <DrawerHeader>Machine Details</DrawerHeader>

          <DrawerBody>
            <Stack spacing={3}>
              <label style={{ color: "white" }}>Machine Name</label>
              <Input
                placeholder="Thickness"
                defaultValue={payload.thickness}
                size="md"
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    thickness: e.target.value,
                  })
                }
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
          <h3>Thickness</h3>
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
              {thickness &&
                thickness.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.thickness_id}</td>
                      <td>{item.thickness} mm</td>
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
                            onClick={() => handleDelete(item.thickness_id)}
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

export default ThicknessComponent;
