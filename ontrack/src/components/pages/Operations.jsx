import Header from "../HeaderHome";
import Footer from "../Footer";
import React from "react";


function Operations(){
    return(
        <div>
            <Header />
          
            <div className="login-header padding-top-64">
                <h1 className="pageHeader">Welcome Operations Manager</h1>
            </div>
            <Footer />
        </div>
    );
}

export default Operations;