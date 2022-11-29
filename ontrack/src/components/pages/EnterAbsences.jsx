import Header from "../HeaderEnterAbs";
import React from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function EnterAbsences()
{
    return (
      
        <div>
            <Header />
            <h1 className="pageHeader">Enter Work-Related Absences</h1>
        
            <div className="padding-top-64">
                <div className="abs-button-container">
                    <Link to="/add-single-day">
                        <button className="abs-button">
                            <p className="abs-button-text">
                                Enter Single-Day Absence
                            </p>
                        </button>
                    </Link>
                </div>
            </div>


            <div className="padding-top-32">
                <div className="abs-button-container">
                    <Link to="/add-multi-day">
                        <button className="abs-button">
                            <p className="abs-button-text">
                                Enter Multi-Day Absence
                            </p>
                        </button>
                    </Link>
                </div>
            </div>  
            <div className="padding-top-64">   
            <Footer />
            </div> 
        </div>
    );   
}

export default EnterAbsences;