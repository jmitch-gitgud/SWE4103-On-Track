import Header from "../HeaderHome";
import Footer from "../Footer";
import React from "react";


function FullTime(){
    return(
        <div>
            <Header />
          
            <div className="login-header padding-top-64">
                <h1 className="pageHeader">Welcome Full Time Teacher</h1>
            </div>
            <Footer />
        </div>
    );
}

export default FullTime;