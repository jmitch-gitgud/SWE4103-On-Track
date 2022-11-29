import React, { Component }  from "react";
import Header from "../HeaderHome";
import Footer from "../Footer";
import { Link } from "react-router-dom";

class OA extends Component {


    
    render(){
        return(
            <div>
                <Header />   
                <div className="login-header padding-top-64">


                    <h1 className="pageHeader">Welcome Office Administrator</h1>               
                    <div className="padding-top-32">
                        <div className="abs-button-container">
                            <Link to="/enter-work-related-absences">
                            <button className="abs-button">
                                <p className="abs-button-text">
                                Add Work Absences
                                </p>
                             </button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="padding-top-32">
                        <div className="abs-button-container">
                            <Link to="/changeDate">
                            <button className="abs-button">
                                <p className="abs-button-text">
                                View Work Absences
                                </p>
                             </button>
                            </Link>
                        </div>
                    </div>

                    <div className="padding-top-32">
                        <div className="abs-button-container">
                            <Link to="/upload-term-schedule">
                            <button className="abs-button">
                                <p className="abs-button-text">
                                Upload Term Schedule
                                </p>
                             </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OA;

