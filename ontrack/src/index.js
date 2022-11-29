import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import AddAbs from "./components/pages/AddAbs";
import AddShort from "./components/pages/AddShort";
import OA from "./components/pages/OA";
import Operations from "./components/pages/Operations";
import Supply from "./components/pages/Supply";
import FullTime from "./components/pages/FullTime";
import VP from "./components/pages/VP";
import ChangeDate from "./components/pages/ChangeDate";
import GenOncalls from "./components/pages/GenOncalls";
import EnterAbs from "./components/pages/EnterAbsences";
import UploadTermSchedule from "./components/pages/UploadTermSchedule";
import "bootstrap/dist/css/bootstrap.min.css";

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
            <Route path="changeDate" element={<ChangeDate />} />
            <Route path="add-multi-day" element={<AddAbs />} />
            <Route path="add-single-day" element={<AddShort />} />
            <Route path="enter-work-related-absences" element={<EnterAbs />} />
            <Route path="upload-term-schedule" element={<UploadTermSchedule />} />
            <Route path="generate-oncalls" element={<GenOncalls />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById("root"));