import React from "react";

import TableStructure from "../components/UniversalTable/TableStructure";

const form = [
  {
    label: "Thickness in mm",
    type: "number",
    placeholder: "Enter thickness",
    name: "thickness",
  }
];
const data = {};
const AddThickness = ({ handleSubmit }) => {
  return (
    <>
      <div className="layout__content-main">
        <TableStructure form={form} handleSubmit={handleSubmit} data={data} />
      </div>
    </>
  );
};

export default AddThickness;
