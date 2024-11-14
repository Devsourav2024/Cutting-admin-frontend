import React from "react";

import TableStructure from "../components/UniversalTable/TableStructure";

const form = [
  {
    label: "Machine Name",
    type: "text",
    placeholder: "Enter machine name",
    name: "machineName",
  }
];
const data = {};
const AddMachine = ({ handleSubmit }) => {
  return (
    <>
      <div className="layout__content-main">
        <TableStructure form={form} handleSubmit={handleSubmit} data={data} />
      </div>
    </>
  );
};

export default AddMachine;
