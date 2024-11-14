import React from "react";

import TableStructure from "../components/UniversalTable/TableStructure";

const form = [
  {
    label: "Finish name",
    type: "text",
    placeholder: "Enter finish name",
    name: "finish_name",
  }
];
const data = {};
const AddFinish = ({ handleSubmit }) => {
  return (
    <>
      <div className="layout__content-main">
        <TableStructure form={form} handleSubmit={handleSubmit} data={data} />
      </div>
    </>
  );
};

export default AddFinish;
