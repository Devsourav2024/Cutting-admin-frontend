import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import instance from "../../helpers/axios";

const TableHeadder = {
  head: [
    "Sl.No",
    "Material",
    "Color",
    "Finish",
    "Thickness",
    "Quantity",
    "Design Image",
    "Status",
    "Actions",
  ],
};

const OrderDetails = ({ id }) => {
  const [image, setImage] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [show, setShow] = useState(false);
  const getItems = async () => {
    try {
      const { data } = await instance.get(`/admin/order/items?orderId=${id}`);
      console.log("Order Items: ---> ", data);
      setOrderItems(data);
    } catch (error) {}
  };
  const handleUpload = async (id) => {
    setShow(true);
    const formData = new FormData();
    formData.append("photo", image);
    formData.append("order_item_id", id);
    const res = await axios.post(
      "http://testmymobileapp.com:8000/order/upload-final-image",
      formData
    );
    if (res.data === "Data Inserted") {
      setShow(false);
      getItems();
    }
  };
  const handleClick = async (text, cart_id) => {
    const payload = {
      orderItemId: cart_id,
      status: text,
    };
    const { data } = await instance.put(
      "/admin/update-order-item-status",
      payload
    );
    console.log(data);
    if (data.status === "success") {
      getItems();
    }
  };
  const handleDelete = async (order_item_id) => {
    const res = await axios.delete(
      `http://testmymobileapp.com:8000/order/delete-final-image/${order_item_id}`
    );
    if (res.data === "Successfully Deleted") {
      setShow(false);
      getItems();
    }
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className="card">
      <div className="card__body" style={{ overflow: "scroll" }}>
        <Table striped bordered hover className="table-dark">
          <thead style={{ maxWidth: "100%" }}>
            <tr>
              {TableHeadder.head.map((item, index) => {
                return <th key={index}>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {orderItems?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.material_name}</td>
                  <td>{item.color_name}</td>
                  <td>{item.finish_name}</td>
                  <td>{item.thickness}</td>
                  <td>{item.quantity}</td>
                  <td
                    onClick={() => window.open(item.image_link, "_blank")}
                    style={{ cursor: "pointer" }}
                  >
                    {item.design_link}
                  </td>
                  <td>
                    {item.cancelled
                      ? "Cancelled"
                      : item.order_delivered
                      ? "Delivered"
                      : "On Process"}
                  </td>

                  <td>
                    <select
                      onChange={(event) =>
                        handleClick(event.target.value, item.order_item_id)
                      }
                      style={{
                        color: "black",
                        padding: "8px",
                        borderRadius: "5px",
                      }}
                      id="status"
                    >
                      <option selected="true" disabled defaultChecked>
                        Choose
                      </option>
                      <option value="delivered" selected={item.order_delivered}>
                        Delivered
                      </option>
                      <option value="pending">On Process</option>
                      <option value="cancelled" selected={item.cancelled}>
                        Cancelled
                      </option>
                    </select>
                    {/* <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Change Status
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              handleClick("Delivered", item.cart_item_id)
                            }
                          >
                            Deliverred
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              handleClick("Pending", item.cart_item_id)
                            }
                          >
                            Pending
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              handleClick("Cancelled", item.cart_item_id)
                            }
                          >
                            Cancelled
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown> */}
                  </td>
                  {/* {show ? (
                      <ThreeDots
                        height="30"
                        width="100%"
                        radius="9"
                        color="#4fa94d"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                      />
                    ) : item.final_image === null ? (
                      <td>
                        <input
                          type="file"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                        <button
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            padding: "10px",
                          }}
                          onClick={(e) => handleUpload(item.order_item_id)}
                        >
                          Upload
                        </button>
                      </td>
                    ) : (
                      <td style={{ cursor: "pointer" }}>
                        <li
                          onClick={() =>
                            window.open(item.final_image, "_blank")
                          }
                          style={{
                            cursor: "pointer",
                            listStyleType: "none",
                            listStyle: "none",
                          }}
                        >
                          {item.final_image}
                        </li>

                        <li
                          style={{
                            cursor: "pointer",
                            listStyleType: "none",
                            listStyle: "none",
                          }}
                        >
                          <button
                            style={{
                              backgroundColor: "white",
                              color: "black",
                              padding: "10px",
                            }}
                            onClick={(e) => handleDelete(item.order_item_id)}
                          >
                            Delete
                          </button>
                        </li>
                      </td>
                    )} */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default OrderDetails;
