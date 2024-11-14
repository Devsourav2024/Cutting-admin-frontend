import React from "react";

import TableStructure from "../components/UniversalTable/TableStructure";

const form = [
  {
    label: "Question?",
    type: "text",
    placeholder: "Faq question?",
    name: "faq_question",
  },
  {
    label: "Answer",
    type: "text",
    placeholder: "Answer...",
    name: "faq_answer",
  },
];
const data = {};
const AddFaq = ({ handleSubmit }) => {
  return (
    <>
      <div className="layout__content-main">
        <TableStructure form={form} handleSubmit={handleSubmit} data={data} />
      </div>
    </>
  );
};

export default AddFaq;
