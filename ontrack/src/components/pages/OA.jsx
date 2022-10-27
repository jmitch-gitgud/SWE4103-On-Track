import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";


const options = [
    {
      label: "No File Selected",
      value: '',
    }
  ];

class OA extends Component {

    state = {
        selectedFile1: '',
        selectedFile2: '',
        selectedSheet: options[0]
    };

    handleChange = event => {
        this.setState({ selectedSheet: event.target.value });
      }

    onAbsenceFile= event => {
        event.preventDefault();
        this.setState({ selectedFile1: event.target.files[0] });
        
        if (event.target.files[0] !== undefined)
        {
            for(let i = 0; i < options.length; i++)
            {
                options.shift();
            }

            options[0] = ({ label: "Select Sheet", value: '' });

            var status;
            var file = event.target.files[0];

            let data = {filename: file};

            //console.log(file);
            fetch('/SheetNames', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json'
                } 
            }).then(function(response) {
                return response.json();
            }).then(data => {
                status = data.status;
                if (status === "Success") {
                    options[0] = ({ label: "Select Sheet", value: "none" });
                    for(let i = 0; i < data.sheets.length; i++)
                    {
                        options.push(...data.sheets);
                    }
                } else {
                    console.log(status);
                }   
            });
        }
    };

    onScheduleFile = event => {
        this.setState({ selectedFile2: event.target.files[0] });
    };

    onAbsenceUpload = event => {
        event.preventDefault();
        if (this.state.selectedFile1 !== '' && this.state.selectedSheet.value !== '')
        {
            var file = this.state.selectedFile1.name;
            var index = this.state.selectedSheet;
            let data = {filename: file, sheetIndex: index};
        
            fetch('/WorkAbs', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json'
                } 
            }).then(function(response) {
                return response.json();
            }).then(data => {
                if (data.status === "File Successfully Inserted") {
                    console.log(data.status);
                } else {
                    console.log(data.status);
                }    
            });
            event.preventDefault();
        }
        else if(this.state.selectedFile1 === '')
        {
            console.log("No File Chosen");
        }
        else
        {
            console.log("No Sheet Chosen");
        }
    }

    onScheduleUpload = event => {
        event.preventDefault();
        if (this.state.selectedFile2 !== '')
        {
            var file = this.state.selectedFile2.name;
            let data = {filename : file};

            fetch('/SendTerm', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json'
                } 
            }).then(function(response) {
                return response.json();
            }).then(data => {
                if (data.status === "File Successfully Inserted") {
                    console.log(data.status);
                } else {
                    console.log(data.status);
                }    
            });
            event.preventDefault();
        }
        else
        {
            console.log("No File Selected")
        }
    }

    deleteAbsenceFile = () => {
        let randomString = Math.random().toString(36);
        this.setState({
            inputKey1: randomString,
            selectedFile1: ''
        })

        for(let i = 0; i < options.length; i++)
        {
            options.shift();
        }

        options[0] = { label: "No File Selected", value: '' };
    }

    
    deleteScheduleFile = () => {
        let randomString = Math.random().toString(36);
        this.setState({
            inputKey2: randomString,
            selectedFile2: ''
        })
    }
    
    
    render(){
        return(
            <div>
                <Header />
                <div className="login-header padding-top-64">
                    <h1 className="padding-bottom-24">Welcome Office Administrator</h1>
                    <h3 className="upload padding-top-64">Upload Work Related Absences</h3>
                    <input className="file" type="file" key={this.state.inputKey1} onChange={this.onAbsenceFile} />
                    <button onClick={this.onAbsenceUpload}>Upload</button>
                    &nbsp;
                    <button onClick = {this.deleteAbsenceFile}>Remove File</button>
                    <select value = {this.state.selectedSheet} onChange = {this.handleChange}>
                        {options.map((option) => (
                        <option value = {option.value}>{option.label}</option>
                    ))}
                    </select>
                    <h3 className="upload padding-top-64">Upload Term Schedule</h3>
                    <input className="file" type="file" key={this.state.inputKey2} onChange={this.onScheduleFile} />
                    <button onClick={this.onScheduleUpload}>Upload</button>
                    &nbsp;
                    <button onClick={this.deleteScheduleFile}>Remove File</button>
                </div>
                <Footer />
            </div>
        );
    }
}

export default OA;