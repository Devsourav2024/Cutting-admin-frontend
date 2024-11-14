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
import {useNavigate} from "react-router-dom"
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import {BiMailSend} from "react-icons/bi";
import { FcAbout } from "react-icons/fc";

import "./style.css";
import styles from "./Users.module.css";
import ManualCheck from "../../pages/ManualCheck";

const ManualChecks = ({
  TableHeadder,
  items,
  orders,
  handleSend,
  handleUpdate,
}) => {

    const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [manualTask, setManualTask] = useState("");
  const [downloadBtn, setDownloadBtn] = useState(false);
  const btnRef = useRef();
  const handleClick = (item) => {
    setManualTask(item)
    onOpen();
  };

  const handleSubmit= (e)=>{
    e.preventDefault();
    onClose();
    handleUpdate(manualTask)
  }
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
        <form onSubmit={(e)=>handleSubmit(e)}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Material Details</DrawerHeader>

          <DrawerBody>
         
            <Stack spacing={3}>
              <label style={{ color: "white" }}>Linear Meter</label>
              <Input
                placeholder="Enter the linear meter in mm"
                defaultValue={manualTask.linear_meter}
                size="md"
                type="number"
                onChange={(e) =>
                  setManualTask({...manualTask, linear_meter:e.target.value}
                  )
                }
              />
              <label style={{ color: "white" }}>Price</label>
              <Input
                placeholder="Enter the total price"
                defaultValue={manualTask.price}
                size="md"
                type="number"
                onChange={(e) =>
                  setManualTask({...manualTask, price:e.target.value}
                  )
                }
              />
              <label style={{ color: "white" }}>Price for one</label>
              <Input
                placeholder="Enter price for one order"
                defaultValue={manualTask.price_for_one}
                size="md"
                type="number"
                onChange={(e) =>
                  setManualTask({...manualTask, price_for_one:e.target.value}
                  )
                }
              />
              <label style={{ color: "white" }}>Quantity</label>
              <Input
                placeholder="Thickness of the material"
                defaultValue={manualTask.quantity}
                size="md"
                type="number"
                onChange={(e) =>
                  setManualTask({...manualTask, quantity:e.target.value}
                  )
                }
              />
              <label style={{ color: "white" }}>Color</label>
              <Input
                placeholder="Color of the material"
                defaultValue={manualTask.color}
                size="md"
                type="text"
                onChange={(e) =>
                  setManualTask({...manualTask, color:e.target.value}
                  )
                }
              />
              <label style={{ color: "white" }}>Finish</label>
              <Input
                placeholder="Finish of the material"
                defaultValue={manualTask.finish}
                size="md"
                type="text"
                onChange={(e) =>
                  setManualTask({...manualTask, finish:e.target.value}
                  )
                }
              />
              <label style={{ color: "white" }}>Material</label>
              <Input
                placeholder="Material name"
                defaultValue={manualTask.material}
                size="md"
                type="text"
                onChange={(e) =>
                  setManualTask({...manualTask, material:e.target.value}
                  )
                }
              />
              
              
              <label style={{ color: "white" }}>Thickness</label>
              <Input
                placeholder="Thickness of the material"
                defaultValue={manualTask.thickness}
                size="md"
                type="number"
                onChange={(e) =>
                  setManualTask({...manualTask, thickness:e.target.value}
                  )
                }
              />
            </Stack>
           
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              ///onClick={() => handleUpdate(manualTask)}
            >
              Update
            </Button>
          </DrawerFooter>
        </DrawerContent>
        </form>
      </Drawer>
      <div className="card">
        <div className="card__header">
          <h3>Manual Check</h3>
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
              {items &&
                items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.customer_id}</td>
                      <td style={{cursor:"pointer"}} onClick={()=> window.open(item.uploaded_image_link
, "_blank")}>{item.uploaded_image_link
}</td>
                      <td>{item.status === "under_review" ? "Under Review": item.status}</td>
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
                          <BiMailSend
                            onClick={() => handleSend(item)}
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

export default ManualChecks;
