import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";

class OA extends Component {

    state = {
        selectedFile: null
    };

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = () => {
        console.log("hello dawg");
        
        //send file to backend
    }

    delete1 = () => {
        let randomString = Math.random().toString(36);
        this.setState({
            inputKey1: randomString
        })
    }

    
    delete2 = () => {
        let randomString = Math.random().toString(36);
        this.setState({
            inputKey2: randomString
        })
    }
    
    
    render(){
        return(
            <div>
                <Header />
                <div className="login-header padding-top-64">
                    <h1 className="padding-bottom-24">Welcome Office Administrator</h1>
                    <h3 className="upload padding-top-64">Upload Work Related Absences</h3>
                    <input className="file" type="file" key={this.state.inputKey1} onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>Upload</button>
                    &nbsp;
                    <button onClick={this.delete1}>Remove File</button>
                    <h3 className="upload padding-top-64">Upload Term Schedule</h3>
                    <input className="file" type="file" key={this.state.inputKey2} onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>Upload</button>
                    &nbsp;
                    <button onClick={this.delete2}>Remove File</button>
                </div>
                <Footer />
            </div>
        );
    }
}

export default OA;