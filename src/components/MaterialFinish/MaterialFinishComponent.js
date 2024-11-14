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

const MaterialFinishComponent = ({
  TableHeadder,
  materialFinish,
  handleDelete,
  handleUpdate,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [payload, setPayload] = useState({});
  const [finish, setFinish] = useState([]);
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
  const getFinish = async () => {
    const finishData = await instance.get("/admin/finish");
    setFinish(finishData.data);
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setPayload({...payload, [id]: value});
  };
  console.log(payload);
  useEffect(() => {
    getMaterials();
    getFinish();
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
          <DrawerHeader>Material Finish</DrawerHeader>

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
              <label style={{ color: "white" }}>Finish Name</label>
              <Select
              id="finish_id"
                bg="whiteAlpha"
                borderColor="black"
                placeholder="Select color"
                onChange={handleChange}
              >
                {finish?.map((item) => (
                  <option
                    key={item.finish_id}
                    value={item.finish_id}
                    selected={item.finish_id === payload.finish_id}
                  >
                    {item.finish_name}
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
          <h3>Material Finish</h3>
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
              {materialFinish?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.material_finish_id}</td>
                      <td>{item.material_name}</td>
                      <td>{item.finish_name}</td>
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
                            onClick={() => handleDelete(item.material_finish_id)}
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

export default MaterialFinishComponent;
