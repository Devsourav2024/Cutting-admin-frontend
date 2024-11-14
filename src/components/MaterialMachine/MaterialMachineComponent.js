import React, { useState, useRef, useEffect } from "react";
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
  useDisclosure,
  Stack,
  Select
} from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

import "./style.css";
import styles from "./Users.module.css";
import instance from "../../helpers/axios";

const MaterialMachineComponent = ({
  TableHeadder,
  materialMachines,
  handleDelete,
  handleUpdate,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [payload, setPayload] = useState({});
  const [machines, setMachines] = useState([]);
  const [materials, setMaterials] = useState([]);
  const btnRef = useRef();
  const handleClick = (item) => {
    setPayload(item);
    onOpen();
  };
  const getMaterials = async (req, res) => {
    const materialsData = await instance.get("/admin/materials");
    setMaterials(materialsData.data);
  };
  const getMachines = async () => {
    const machineData = await instance.get("/admin/machines");
    setMachines(machineData.data);
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setPayload({...payload, [id]: value});
  };
  console.log(payload);
  useEffect(() => {
    getMaterials();
    getMachines();
  }, []);
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
          <DrawerHeader>Material Machine</DrawerHeader>

          <DrawerBody>
            <Stack spacing={3}>
              <label style={{ color: "white" }}>Material Name</label>
              <Select
              id="material_id"
                bg="whiteAlpha"
                borderColor="black"
                placeholder="Select material"
                onChange={handleChange}
              >
                {materials?.map((material) => (
                  <option
                    key={material.material_id}
                    value={material.material_id}
                    selected={material.material_id === payload.material_id}
                  >
                    {material.material_name}
                  </option>
                ))}
              </Select>
              <label style={{ color: "white" }}>Machine Name</label>
              <Select
              id="machine_id"
                bg="whiteAlpha"
                borderColor="black"
                placeholder="Select color"
                onChange={handleChange}
              >
                {machines?.map((item) => (
                  <option
                    key={item.machine_id}
                    value={item.machine_id}
                    selected={item.machine_id === payload.machine_id}
                  >
                    {item.machine_name}
                  </option>
                ))}
              </Select>
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
          <h3>Material Machine</h3>
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
              {materialMachines?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.material_machine_id}</td>
                      <td>{item.material_name}</td>
                      <td>{item.machine_name}</td>
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
                            onClick={() => handleDelete(item.material_machine_id)}
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

export default MaterialMachineComponent;
