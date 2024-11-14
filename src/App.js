import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AllRoutes from "./components/Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <BrowserRouter basename="/">
        <AllRoutes />
      </BrowserRouter>
    </Fragment>
  );
}
export default App;
