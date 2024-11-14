import React from "react";

import TableStructure from "../components/UniversalTable/TableStructure";

const form = [
  {
    label: "Material Name",
    type: "text",
    placeholder: "Enter material name",
    name: "material_name",
  }
];
const data = {
  material_name: ""
};
const AddMaterial = ({ handleSubmit }) => {
  return (
    <>
      <div className="layout__content-main">
        <TableStructure form={form} handleSubmit={handleSubmit} data={data} />
      </div>
    </>
  );
};

export default AddMaterial;
