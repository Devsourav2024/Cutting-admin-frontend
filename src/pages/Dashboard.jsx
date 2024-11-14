import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Chart from "react-apexcharts";

import StatusCard from "../components/status-card/StatusCard";

import Table from "../components/table/Table";

import Badge from "../components/badge/Badge";
import Sidebar from "../components/sidebar/Sidebar";
import Topnav from "../components/topnav/TopNav";
import axios from "../helpers/axios";
import instance from "../helpers/axios";
import Swal from "sweetalert2";

const chartOptions = {
  series: [
    {
      name: "Online",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Store",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    color: ["#dde6da", "#dde6da"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};

const topCustomers = {
  head: ["user", "total orders", "total spending"],
  body: [
    {
      username: "john doe",
      order: "490",
      price: "$15,870",
    },
    {
      username: "frank iva",
      order: "250",
      price: "$12,251",
    },
    {
      username: "anthony baker",
      order: "120",
      price: "$10,840",
    },
    {
      username: "frank iva",
      order: "110",
      price: "$9,251",
    },
    {
      username: "anthony baker",
      order: "80",
      price: "$8,840",
    },
  ],
};

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const latestOrders = {
  header: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "shipping",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "pending",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "refund",
    },
  ],
};

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);
const statusCards = [
  {
    icon: "bx bx-receipt",
    count: "20",
    title: "Total Sales",
  },
];

const Dashboard = () => {
  const [userCard, setUserCard] = useState({
    icon: "bx bxs-user-account",
    count: "0",
    title: "Total Users",
  });
  const [orderCard, setOrderCard] = useState({
    icon: "bx bx-shopping-bag",
    count: "0",
    title: "Total Order",
  });
  const [totalSales, setTotalSales] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const getUsers = async() => {
    const {data} = await axios.get("/admin/users");
    setUserCard({ ...userCard, count: data.user_count });
  };
  const getOrders = async() => {
    try {
      const {data} = await instance.get("/admin/orders");
      setOrderCard({ ...orderCard, count: data.length });
    } catch (error) {
      Swal.fire({
        type: 'warning',
        text: error?.response?.data ||'something went wrong!',
        timer:3000
      })
    }
  };
  const getTotalIncome = async()=>{
    try {
      const {data} = await instance.get("/admin/orders/totalPrice");
      setTotalIncome(data[0].total_income)
    } catch (error) {
      
    }
  }
  const getTotalSales = async()=>{
    try {
      const {data} = await instance.get("/admin/orders/totalSales");
      setTotalSales(data[0].total_sales)
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getUsers();
    getOrders();
    getTotalIncome();
    getTotalSales();
  }, []);
  return (
    <>
      <div className={`layout theme-mode-dark`}>
        <Sidebar />
        <div className="layout__content">
          <Topnav />
          <div className="layout__content-main">
            <div>
              <h2 className="page-header">Dashboard</h2>
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-6">
                      <StatusCard
                        icon={userCard.icon}
                        count={userCard.count}
                        title={userCard.title}
                      />
                    </div>
                    <div className="col-6">
                      <StatusCard
                        icon={orderCard.icon}
                        count={orderCard.count}
                        title={orderCard.title}
                      />
                    </div>
                      <div className="col-6">
                        <StatusCard
                          icon="bx bx-dollar-circle"
                          count={totalIncome + " AED"}
                          title="Total income"
                        />
                      </div>
                      <div className="col-6">
                        <StatusCard
                          icon="bx bx-receipt"
                          count={totalSales}
                          title="Total Sales"
                        />
                      </div>
                  </div>
                </div>
                {/* <div className="col-6">
                  <div className="card full-height">
                   
                    <Chart
                      options={{
                        ...chartOptions.options,
                        theme: { mode: "dark" },
                      }}
                      series={chartOptions.series}
                      type="line"
                      height="100%"
                    />
                  </div>
                </div> */}
                {/* <div className="col-6">
                  <div className="card">
                    <div className="card__header">
                      <h3>top customers</h3>
                    </div>
                    <div className="card__body">
                      <Table
                        headData={topCustomers.head}
                        renderHead={(item, index) =>
                          renderCusomerHead(item, index)
                        }
                        bodyData={topCustomers.body}
                        renderBody={(item, index) =>
                          renderCusomerBody(item, index)
                        }
                      />
                    </div>
                    <div className="card__footer">
                      <Link to="/">view all</Link>
                    </div>
                  </div>
                </div> */}
                <div className="col-12">
                  <div className="card">
                    <div className="card__header">
                      <h3>latest orders</h3>
                    </div>
                    <div className="card__body">
                      <Table
                        headData={latestOrders.header}
                        renderHead={(item, index) =>
                          renderOrderHead(item, index)
                        }
                        bodyData={latestOrders.body}
                        renderBody={(item, index) =>
                          renderOrderBody(item, index)
                        }
                      />
                    </div>
                    <div className="card__footer">
                      <Link to="/">view all</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
