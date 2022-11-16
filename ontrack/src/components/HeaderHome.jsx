import React from "react";
import { Link } from "react-router-dom";

function HeaderHome() {
  return (
    <header>
      <h2>
          On Track   <Link to="/">
                    <button className="logout-button" type="button">
                    Sign Out
                    </button>
                    </Link></h2>

        
                    
                  

                    <h3>
                   
                      
                      Home</h3>   
                   


    </header>
  );
}

export default HeaderHome;
