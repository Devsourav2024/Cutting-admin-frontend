import React, { useEffect, useState } from "react";
import axios from "axios";
import OrdersTable from "../components/Orders/OrdersTable";
import Sidebar from "../components/sidebar/Sidebar";
import Topnav from "../components/topnav/TopNav";
import instance from "../helpers/axios";
import Swal from "sweetalert2";

const Orders = () => {
  const [orders, setOrders] = useState("");
  const TableHeadder = {
    head: [
      "Sl.No",
      "Order ID",
      "User",
      "Shipping Method",
      "Shipping Address",
      "Total Cost",
      "Price",
      "Payment Method",
      "Payment Status",
      "Created At",
      "Actions",
    ],
  };

  const getOrders = async () => {
    try {
      const { data } = await instance.get("/admin/orders");
      setOrders(data);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Something went wrong!",
        timer: 3000,
      });
    }
  };
  const handleDelete = async (id) => {
    const data = {
      order_id: id,
    };
    const res = await axios.delete(
      "http://14.140.119.44:8000/order/delete-order",
      data
    );
    if (res.data === "Successfully Deleted") {
      getOrders();
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <div className={`layout theme-mode-dark`}>
        <Sidebar />
        <div className="layout__content">
          <Topnav />
          <div className="layout__content-main">
            <OrdersTable
              TableHeadder={TableHeadder}
              orders={orders}
              handleDelete={handleDelete}
              getOrders={getOrders}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
