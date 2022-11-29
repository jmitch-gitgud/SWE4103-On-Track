import React from "react";
import { Link } from "react-router-dom";

function HeaderChangeDate() {
  return (
    <div>
      <header>
        <h2>

            On Track
            
            <Link to="/">
            <button className="logout-button" type="button">
            Sign Out
            </button>
            </Link>

        </h2>
      </header>   

      <h3 className="link-container">          

          <Link className="link" to="/oa">
          Home 
          </Link>  
          <Link className="link" to="/changeDate">
            {" > "}View Absences
          </Link>               
          
      </h3>   
    </div>   
                    
                     
  );
}

export default HeaderChangeDate;