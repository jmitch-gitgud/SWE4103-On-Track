import React from "react";
import { Link } from "react-router-dom";

function HeaderChangeDate() {
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
          <Link className="link" to="/changeDate">
            {" > "}Abscences
          </Link>               
         
      </h3>   
        
    </header>                     
                     
  );
}

export default HeaderChangeDate;