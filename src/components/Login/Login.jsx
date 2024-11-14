import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from '../../helpers/axios';
import { AuthContext } from "../../context/authContextProvider";
import Form from "../form/Form";
import undraw_mobile_login_re_9ntv from "../../assets/images/undraw_mobile_login_re_9ntv.svg";
import Swal from "sweetalert2";


const Login = () => {
  const navigate = useNavigate();
  const { toggleAuth } = useContext(AuthContext);
  const handleClick = async(username, password) => {
    try {
      const payload = {
        email: username,
        password: password,
      };
      const response = await axios.post("/admin/login", payload);
      console.log("Login Response: ----> ", response);
      toggleAuth(response.data.admin);
      window.localStorage.setItem("admin-token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'warning',
        title: error?.data?.message || "",
        timer: 3000
      })
    }

    // fetch("http://14.140.119.44:8000/admin/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.msg === "Wrong Password!") {
    //       alert("Wrong Password!");
    //     } else {
    //       toggleAuth(res[0]);
    //       navigate("/dashboard");
    //     }
    //   })
    //   .catch((err) => console.log("Login Error: ", err));
  };
  return (
    <>
      <div className={`layout theme-mode-dark`}>
        <div className="layout__content">
          <div className="layout__content-main">
            <div>
              <div className="col-8">
                <img
                  src={undraw_mobile_login_re_9ntv}
                  alt=""
                  style={{ width: " 100%", height: "200px", margin: "20px" }}
                />
                <div className="card">
                  <div className="card__body">
                    <Form
                      field={["Username/Email", "Password"]}
                      handleClick={handleClick}
                    />
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

export default Login;
