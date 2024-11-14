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

const SheetTable = ({ TableHeadder, sheets, handleDelete, handleUpdate }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [sheet, setSheet] = useState("");
  const btnRef = useRef();
  const handleClose = () => onClose();

  const handleClick = (item) => {
    setSheet(item);
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
          <DrawerHeader>Sheet Details</DrawerHeader>

          <DrawerBody>
            <Stack spacing={3}>
              <label style={{ color: "white" }}>Height</label>
              <Input
                placeholder="height of the sheet"
                defaultValue={sheet.height}
                size="md"
                onChange={(e) =>
                  setSheet({
                    ...sheet,
                    height: e.target.value,
                  })
                }
              />
              <label style={{ color: "white" }}>Width</label>
              <Input
                placeholder="height of the sheet"
                defaultValue={sheet.width}
                size="md"
                onChange={(e) =>
                  setSheet({
                    ...sheet,
                    width: e.target.value,
                  })
                }
              />
              <label style={{ color: "white" }}>Cost per sheet</label>
              <Input
                placeholder="height of the sheet"
                defaultValue={sheet.cost_per_sheet}
                size="md"
                onChange={(e) =>
                  setSheet({
                    ...sheet,
                    cost_per_sheet: e.target.value,
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
              onClick={() => {
                handleClose();
                handleUpdate(sheet);
              }}
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
              {sheets &&
                sheets.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.height}</td>
                      <td>{item.width}</td>
                      <td>{item.cost_per_sheet}</td>

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

                          <button className={styles.usersActionBtn}>
                            <MdDeleteForever
                              onClick={() => handleDelete(item.sheet_id)}
                            />
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
  );
};

export default SheetTable;
