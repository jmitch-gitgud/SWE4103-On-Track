import Header from "../Header";
import Footer from "../Footer";
import React from "react";


function Supply(){
    return(
        <div>
            <Header />
            <div className="login-header padding-top-64">
                <h1 className="padding-bottom-24">Welcome Supply Teacher</h1>
            </div>
            <Footer />
        </div>
    );
}

export default Supply;