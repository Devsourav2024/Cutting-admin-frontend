import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./Form.module.css";
import instance from "../helpers/axios";

const AddMaterialFinish = ({ handleSubmit }) => {
  const [materials, setMaterials] = useState([]);
  const [finish, setFinish] = useState([]);
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
  const getFinish = async () => {
    const finishData = await instance.get("/admin/finish");
    setFinish(finishData.data);
  };
  useEffect(() => {
    getMaterials();
    getFinish();
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
            <Form.Label>Material name</Form.Label>
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
            <label>Finish name</label>
            <Form.Select
              className={styles.inputBox}
              placeholder="Choose"
              onChange={(e) => handleChange(e)}
              id="finish_id"
              required
            >
              <option value="" disabled selected>
                Choose one
              </option>
              {finish?.map((item) => (
                <option key={item.finish_id} value={item.finish_id}>
                  {item.finish_name}
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

export default AddMaterialFinish;
