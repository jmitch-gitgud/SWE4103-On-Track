import React from "react";
import { Link } from "react-router-dom";

function HeaderOnCalls() {
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


                    <Link className="link" to="/vp">
                    Home 
                   </Link>                  
                    /Generate On Calls
                    </h3>   
                  
                      </header>

                      
                     
  );
}

export default HeaderOnCalls;