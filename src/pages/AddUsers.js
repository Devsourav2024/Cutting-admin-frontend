import React from "react";

import TableStructure from "../components/UniversalTable/TableStructure";

const form = [
  {
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    name: "first_name",
  },
  {
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
    name: "last_name",
  },
  {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    name: "email",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    name: "password",
  },
  {
    label: "Contact Number",
    type: "number",
    placeholder: "Enter your Contact Number",
    name: "contact_number",
  },
  {
    label: "Address",
    type: "text",
    placeholder: "Enter your Address",
    name: "address",
  },
];
const data = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  contact_number: "",
  address: "",
};
const AddUsers = ({ handleSubmit }) => {
  return (
    <>
      <>
        <div>
          <TableStructure form={form} handleSubmit={handleSubmit} data={data} />
        </div>
      </>
    </>
  );
};

export default AddUsers;
