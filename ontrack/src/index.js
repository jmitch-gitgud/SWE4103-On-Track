import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import OA from "./components/pages/OA";
import Operations from "./components/pages/Operations";
import Supply from "./components/pages/Supply";
import FullTime from "./components/pages/FullTime";
import VP from "./components/pages/VP";

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="oa" element={<OA />} />
            <Route path="operations" element={<Operations />} />
            <Route path="supply" element={<Supply />} />
            <Route path="fulltime" element={<FullTime />} />
            <Route path="vp" element={<VP />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById("root"));