import React, { useState, useRef } from "react";
import { Table } from "react-bootstrap";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import "./style.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import styles from "./Users.module.css";
import instance from "../../helpers/axios";
import Swal from "sweetalert2";

const FaqComponent = ({ TableHeadder, faqs, getFaqs }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [faq, setFaq] = useState("");
  const btnRef = useRef();
  const handleClick = (item) => {
    setFaq(item);
    onOpen();
  };
  const handleUpdate = async(item) => {
    try {
     await instance.put("/admin/faq/update", item);
     getFaqs();
     onClose();
     Swal.fire({
       icon:'success',
       title: `FAQ update successfully!`,
       timer: 3000,
     })
    } catch (error) {
     Swal.fire({
       icon: 'warning',
       text:'something went wrong!',
       confirmButtonText:"OK!",
       timer:3000
     })
    }
   };
const handleDelete = async(id) => {
  try {
    await instance.delete(`/admin/faq/delete/${id}`)
    getFaqs();
     onClose();
     Swal.fire({
       icon:'success',
       title: `FAQ delete successfully!`,
       timer: 3000,
     })
  } catch (error) {
    onClose();
    Swal.fire({
      icon: 'warning',
      text:'something went wrong!',
      confirmButtonText:"OK!",
      timer:3000
    })
  }
};
  return (
    <div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="md"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Faq Details</DrawerHeader>

          <DrawerBody>
            <Stack spacing={3}>
              <label style={{ color: "white" }}>Question ?</label>
              <Input
                placeholder="faq title"
                defaultValue={faq.faq_question}
                size="md"
                onChange={(e) =>
                  setFaq({
                    ...faq,
                    faq_question: e.target.value,
                  })
                }
              />
              <label style={{ color: "white" }}>Answer</label>
              <Input
                placeholder="Enter answer..."
                defaultValue={faq.faq_answer}
                size="md"
                onChange={(e) =>
                  setFaq({
                    ...faq,
                    faq_answer: e.target.value,
                  })
                }
              />
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={() => handleUpdate(faq)}>
              Update
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="card">
        <div className="card__header">
          <h3>Faq</h3>
        </div>
        <div className="card__body">
          <Table striped bordered hover className="table-dark">
            <thead>
              <tr>
                {TableHeadder.head.map((item, index) => {
                  return <th key={index}>{item}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {faqs &&
                faqs.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.faq_question}</td>
                      <td>{item.faq_answer}</td>
                      <div className={styles.actionBtnContainer}>
                        <button
                          className={styles.usersActionBtn}
                          ref={btnRef}
                          colorScheme="teal"
                          onClick={() => handleClick(item)}
                        >
                          <BiEdit />
                        </button>

                        <button className={styles.usersActionBtn}>
                          <MdDeleteForever
                            onClick={() => handleDelete(item.faq_id)}
                          />
                        </button>
                      </div>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default FaqComponent;
