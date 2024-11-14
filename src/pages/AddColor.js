import React from "react";

import TableStructure from "../components/UniversalTable/TableStructure";

const form = [
  {
    label: "Color name",
    type: "text",
    placeholder: "Enter color name",
    name: "color_name",
  }
];
const data = {};
const AddColor = ({ handleSubmit }) => {
  return (
    <>
      <div className="layout__content-main">
        <TableStructure form={form} handleSubmit={handleSubmit} data={data} />
      </div>
    </>
  );
};

export default AddColor;
