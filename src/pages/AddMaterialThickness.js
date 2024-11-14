import React, { useEffect, useState } from "react";

import TableStructure from "../components/UniversalTable/TableStructure";
import { Button, Form } from "react-bootstrap";
import styles from "./Form.module.css";
import instance from "../helpers/axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const form = [
  {
    label: "Material name",
    type: "select",
    placeholder: "Select material",
    name: "material_id",
  },
];
const data = {};
const AddMaterialThickness = ({ handleSubmit }) => {
  const [materials, setMaterials] = useState([]);
  const [thickness, setThickness] = useState([]);
  const [payload, setPayload] = useState({});
  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setPayload({ ...payload, [id]: value });
  };
  const getMaterials = async (req, res) => {
    const materialsData = await instance.get("/admin/materials");
    setMaterials(materialsData.data);
  };
  const getThickness = async () => {
    const thicknessData = await instance.get("/admin/thickness");
    setThickness(thicknessData.data);
  };
  useEffect(() => {
    getMaterials();
    getThickness();
  }, []);
  return (
    <>
      <div className="layout__content-main">
        <Form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(payload);
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Material</Form.Label>
            <Form.Select
              className={styles.inputBox}
              placeholder="Choose"
              onChange={(e) => handleChange(e)}
              id="material_id"
              required
            >
              <option value="" disabled selected>
                Choose one
              </option>
              {materials?.map((material) => (
                <option key={material.material_id} value={material.material_id}>
                  {material.material_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <label>Thickness</label>
            <Form.Select
              className={styles.inputBox}
              placeholder="Choose"
              onChange={(e) => handleChange(e)}
              id="thickness_id"
              required
            >
              <option value="" disabled selected>
                Choose one
              </option>
              {thickness?.map((item) => (
                <option key={item.thickness_id} value={item.thickness_id}>
                  {item.thickness} mm
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              id="price"
              step="0.01"
              className={styles.inputBox}
              as="input"
              type="number"
              placeholder="Enter price"
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Cutting price</Form.Label>
            <Form.Control
              id="cutting_price"
              step="0.01"
              className={styles.inputBox}
              as="input"
              type="number"
              placeholder="Enter cutting price"
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Group>
          <div class="col-md-12 text-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddMaterialThickness;
