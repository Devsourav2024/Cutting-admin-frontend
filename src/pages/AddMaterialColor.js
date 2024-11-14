import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./Form.module.css";
import instance from "../helpers/axios";

const AddMaterialColor = ({ handleSubmit }) => {
  const [materials, setMaterials] = useState([]);
  const [colors, setColors] = useState([]);
  const [payload, setPayload] = useState({});
  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setPayload({ ...payload, [id]: value });
  };
  const getMaterials = async () => {
    const materialsData = await instance.get("/admin/materials");
    setMaterials(materialsData.data);
  };
  const getColors = async () => {
    const colorsData = await instance.get("/admin/colors");
    setColors(colorsData.data);
  };
  useEffect(() => {
    getMaterials();
    getColors();
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
            <Form.Label>Material Color</Form.Label>
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
              id="color_id"
              required
            >
              <option value="" disabled selected>
                Choose one
              </option>
              {colors?.map((item) => (
                <option key={item.color_id} value={item.color_id}>
                  {item.color_name}
                </option>
              ))}
            </Form.Select>
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

export default AddMaterialColor;
