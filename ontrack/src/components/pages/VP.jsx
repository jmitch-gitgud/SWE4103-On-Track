import Header from "../HeaderHome";
import Footer from "../Footer";
import React, { useState } from "react";
import { Link } from "react-router-dom";


function VP(){

    
    return(
        <div>
            <Header />
          
            <div className="login-header padding-top-64">
                <h1 className="padding-bottom-24">Welcome Vice Principal</h1>
                <h3 className="upload padding-top-test">Generate Oncalls</h3>
                  <Link to="/GenOncalls">
                  <button>Generate Oncalls</button>
                  </Link>
            </div>
            
            <Footer />
        </div>
    );
}

export default VP;