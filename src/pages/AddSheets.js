import React from "react";

import TableStructure from "../components/UniversalTable/TableStructure";

const form = [
  {
    label: "Height",
    type: "text",
    placeholder: "Height of the sheet",
    name: "height",
  },
  {
    label: "Width",
    type: "text",
    placeholder: "Width of the sheet",
    name: "width",
  },
  {
    label: "Cost per sheet",
    type: "text",
    placeholder: "cost per sheet",
    name: "cost_per_sheet",
  },
];
const data = {};
const AddSheets = ({ handleSubmit }) => {
  return (
    <>
      <div className="layout__content-main">
        <TableStructure form={form} handleSubmit={handleSubmit} data={data} />
      </div>
    </>
  );
};

export default AddSheets;
