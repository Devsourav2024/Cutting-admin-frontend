import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./Form.module.css";

const TableStructure = ({ form, handleSubmit, data, margin }) => {
  const [userDetails, setUserDetails] = useState(data);
  const handleChange = (e) => {
    const { value, name } = e.target;
    if (margin && margin.length !== 0) {
      setUserDetails({ ...userDetails, [name]: value, id: margin[0].id });
    } else {
      setUserDetails({ ...userDetails, [name]: value });
    }
  };
  return (
    <>
      <Form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(userDetails);
        }}
      >
        {form.map((item, index) => {
          return (
            <Form.Group
              className="mb-3"
              controlId="formBasicPassword"
              key={index}
            >
              <Form.Label>{item.label}</Form.Label>
              <Form.Control
                className={styles.inputBox}
                type={item.type}
                name={item.name}
                step={item.label === "Margin" || item.step ? "0.01" : null}
                placeholder={item.placeholder}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          );
        })}
        <div class="col-md-12 text-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default TableStructure;
