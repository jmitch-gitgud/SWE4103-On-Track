import Header from "../Header";
import Footer from "../Footer";
import React from "react";
import { Link } from "react-router-dom";


function Operations(){
    return(
        <div>
            <Header />
            <div>
                <Link to="/">
                    <button className="logout-button" type="button">
                    Sign Out
                    </button>
                    </Link>
                </div>
            <div className="login-header padding-top-64">
                <h1 className="padding-bottom-24">Welcome Operations Manager</h1>
            </div>
            <Footer />
        </div>
    );
}

export default Operations;