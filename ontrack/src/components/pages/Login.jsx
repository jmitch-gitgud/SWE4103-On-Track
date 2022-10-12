import Header from "../Header";
import Footer from "../Footer";

import React, { useState } from "react";

function Login() {

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const errors = {
    "Invalid": "Invalid Username or Password",
    "Error": "ERROR: looks like something went wrong..."
  };
  
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
          <input type="password" name="pass" required />
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
        {isSubmitted ? <div className="login-success">User is successfully logged in [insert home page here]</div> : renderForm}
      </div>
      <Footer />
    </div>
  );
}

export default Login;