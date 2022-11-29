import Header from "../HeaderVp";
import Footer from "../Footer";
import React, { useState } from "react";
import { Link } from "react-router-dom";


function VP(){

    
    return(
        <div>
            <Header />
          
            <div className="login-header padding-top-32">
                <h1 className="pageHeader padding-bottom-24">Welcome Vice Principal</h1>
                <p className="want-to">
                    I Would Like To...
                </p>
                <div className="padding-top-16">
                  <Link to="/generate-oncalls">
                  <button className="abs-button abs-button-text">Generate Oncalls</button>
                  </Link>
                  </div>
            </div>
            <div className="padding-top-64">
            <Footer />
            </div>
        </div>
    );
}

export default VP;