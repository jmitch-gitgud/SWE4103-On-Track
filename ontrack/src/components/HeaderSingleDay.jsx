import React from "react";
import { Link } from "react-router-dom";

function HeaderSingleDay() {
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
              {" > "}Work-Related Absences
            </Link> 

            <Link className="link" to="/add-single-day">
              {" > "}Single-Day
            </Link>                       

          </h3>   
        
    </header>  

  );
}

export default HeaderSingleDay;