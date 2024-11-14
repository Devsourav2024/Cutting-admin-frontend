import React from "react";
import { Form } from "react-bootstrap";
import styles from "./Form.module.css";

const AddPercentage = ({ handleChange, handleSubmit, margin }) => {
  return (
    <>
      <div className="layout__content-main">
        <Form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Percentage Name</Form.Label>
            <Form.Control
              className={styles.inputBox}
              type="text"
              name="percentage_name"
              id="percentage_name"
              placeholder="Define percentage name ....."
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Percentage</Form.Label>
            <Form.Control
              className={styles.inputBox}
              type="number"
              id="percentage"
              name="percentage"
              step="0.01"
              placeholder="Define percentage ....."
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default AddPercentage;
