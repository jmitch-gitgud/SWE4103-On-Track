import Header from "../Header";
import Footer from "../Footer";
//import { GetRightPage } from "../GetRightPage";


import React, { useState } from "react";
import { Link } from "react-router-dom";





function Login() {

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [passwordShown, setPasswordShown] = useState(false); 

    let page = '/oa';
    
   

  const errors = {
    "Invalid": "Invalid Username or Password",
    "Error": "ERROR: looks like something went wrong..."
  };
  
const togglePassword = () => {
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
        if (status === "Logged in") {
          setIsSubmitted(true);
          
          page = data.page;

          console.log(page); 

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
          <input type="text" name="uname" required />
        </div>
        <div>
          <label className="input-label">Password: </label>
          <input type={passwordShown ? "text" : "password"} name="pass" required />
          <button onClick={togglePassword}> Show Password </button>

                    
          {renderErrorMessage("Invalid")}
          {renderErrorMessage("Error")}
        </div>        
        <div className="button-container">
          <input type="submit" value="Submit" />
        </div>
        </form>    
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

             <Link to={page}>
            <button className="login-button" type="button">
              Continue
            </button>
          </Link>


                       </div> : renderForm}
      </div>
      <Footer />
    </div>
  );
}

export default Login;

