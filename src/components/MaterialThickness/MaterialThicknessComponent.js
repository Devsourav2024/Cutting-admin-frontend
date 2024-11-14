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
  Input,
  useDisclosure,
  Stack,
  Select,
} from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

import "./style.css";
import styles from "./Users.module.css";
import instance from "../../helpers/axios";

const MaterialThicknessComponent = ({
  TableHeadder,
  materialThickness,
  handleDelete,
  handleUpdate,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [payload, setPayload] = useState({});
  const [thickness, setThickness] = useState([]);
  const [materials, setMaterials] = useState([]);
  const btnRef = useRef();
  const handleClick = (item) => {
    console.log("Material Thickness: ---> ", item);
    setPayload(item);
    onOpen();
  };
  const getMaterials = async (req, res) => {
    const materialsData = await instance.get("/admin/materials");
    setMaterials(materialsData.data);
  };
  const getThickness = async () => {
    const thicknessData = await instance.get("/admin/thickness");
    setThickness(thicknessData.data);
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setPayload({...payload, [id]: value});
  };
  console.log(payload);
  useEffect(() => {
    getMaterials();
    getThickness();
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
          <DrawerHeader>Material Thickness</DrawerHeader>

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
              <label style={{ color: "white" }}>Material Name</label>
              <Select
              id="thickness_id"
                bg="whiteAlpha"
                borderColor="black"
                placeholder="Select material"
                onChange={handleChange}
              >
                {thickness?.map((item) => (
                  <option
                    key={item.thickness_id}
                    value={item.thickness_id}
                    selected={item.thickness_id === payload.thickness_id}
                  >
                    {item.thickness} mm
                  </option>
                ))}
              </Select>
              <label style={{ color: "white" }}>Price</label>
              <Input
              id="price"
                placeholder="Price"
                defaultValue={payload.price}
                type="number"
                size="md"
                onChange={handleChange}
              />
              <label style={{ color: "white" }}>Cutting price</label>
              <Input
              id="cutting_price"
                placeholder="Cutting price"
                defaultValue={payload.cutting_price}
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
          <h3>Material Thickness</h3>
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
              {materialThickness?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.material_thickness_id}</td>
                      <td>{item.material_name}</td>
                      <td>{item.thickness}</td>
                      <td>{item.price}</td>
                      <td>{item.cutting_price}</td>
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
                            onClick={() => handleDelete(item.material_thickness_id)}
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

export default MaterialThicknessComponent;
