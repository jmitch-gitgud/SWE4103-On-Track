import Header from "../HeaderHome";
import Footer from "../Footer";
import React from "react";

function VP(){
    return(
        <div>
            <Header />
          
            <div className="login-header padding-top-64">
                <h1 className="padding-bottom-24">Welcome Vice Principal</h1>
            </div>
            <Footer />
        </div>
    );
}

export default VP;