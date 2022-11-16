import Header from "../Header2";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import ShowAndHidePassword from "./show-and-hide-password/ShowAndHidePassword";

function Login() {

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNextPageFullTime, setIsNextPageFullTime] = useState(false);
  const [isNextPageSupply, setIsNextPageSupply] = useState(false);
  const [isNextPageOA, setIsNextPageOA] = useState(false);
  const [isNextPageVP, setIsNextPageVP] = useState(false);
  const [isNextPageOM, setIsNextPageOM] = useState(false);

  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);


  let nextPage;
  
  const errors = {
    "Invalid": "Invalid Username or Password",
    "Error": "ERROR: looks like something went wrong..."
  };

  const togglePassword = (event) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  }
  
  const handleSubmit = (event) => {
    var { uname, pass } = document.forms[0];
    var status;
    let data = {Username: uname.value, Password: pass.value};

    
    fetch('/check', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json'
       } 
      }).then(function(response) {
        return response.json();
      }).then(data => {
        status = data.status;
        nextPage = data.page;
        

        if (status === "Logged in") {
          setIsSubmitted(true);
          nextPage = data.page;

          if(nextPage === '/fulltime'){
            setIsNextPageFullTime(true);
          }
          if(nextPage === '/supply'){
            setIsNextPageSupply(true);
          }
          if(nextPage === '/oa'){
            setIsNextPageOA(true);
          }
          if(nextPage === '/vp'){
            setIsNextPageVP(true);
          }
          if(nextPage === '/operations'){
            setIsNextPageOM(true);
          }

        } else if (status === "Invalid credentials") {
          setErrorMessages({ name: "Invalid", message: errors.Invalid });
        } else {
          setErrorMessages({ name: "Error", message: errors.Error });
        }    
      });
    event.preventDefault();
  };
  
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  
    const renderForm = (
      
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="input-label">Username: </label>
            <input type="text" name="uname" required placeholder="Enter your username"/>
          </div>
          <div>
            <label className="input-label">Password: </label>
            <div>

            <div class='input-label'>
            <input  type={passwordShown ? "text" : "password"} name="pass" required placeholder="Enter your password" />



            <button className= "passToggle" type="button" onClick={togglePassword}><img src="https://vectorified.com/images/password-eye-icon-8.png" 
            alt="eye" width="20" height="25"></img></button>

            </div>

                      
          
           


          </div>
            {renderErrorMessage("Invalid")}
            {renderErrorMessage("Error")}
          </div>
          <div className="button-container">
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
      
    );

  const emptyRender = (
    <div>
    </div>
  );

  return (
    <div>
      <Header />
      <div className="login-form">
        <div className="login-header padding-top-64">
          <h1>Sign In</h1>
        </div>
        {isSubmitted ? 
          <div className="login-success">
          
          {isNextPageFullTime ?
            navigate('/fulltime') : emptyRender
          }

          {isNextPageSupply ?
            navigate('/supply') : emptyRender
          }

          {isNextPageOA ?
            navigate('/oa') : emptyRender
          }

          {isNextPageVP ?
            navigate('/vp') : emptyRender
          }

          {isNextPageOM ?
            navigate('/operations') : emptyRender
          }
          
        </div> : renderForm}
      </div>
      <Footer />
    </div>
  );
}

export default Login;
