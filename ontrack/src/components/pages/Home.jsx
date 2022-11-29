import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import React from "react";

function Home() {
  return (
    <div>
      <Header />
      <div className="login-header padding-top-128">
        
        <h1 className="padding-bottom-16">On Track</h1>
        <p className="padding-bottom-32">Stay on task with On Track!</p>
        <nav>
          <Link to="/login">
            <button className="login-button" type="button">
              Sign In
            </button>
          </Link>
        </nav>
        
      </div>
      <Footer />
    </div>
  );
}

export default Home;
