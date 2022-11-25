import React from "react";
import { Link } from "react-router-dom";

function HeaderEnterAbs() {
  return (
    <header>
        <h2>
            On Track
            <Link to="/">
            <button className="logout-button" type="button">
            Sign Out
            </button>
            </Link>
        </h2>

        <h3>          
            <Link className="link" to="/oa">
                Home 
            </Link>  
            <Link className="link" to="/enter-work-related-absences">
                {" > "} Work-Related Absences
            </Link>                
        </h3> 
           
    </header>               
  );
}

export default HeaderEnterAbs;