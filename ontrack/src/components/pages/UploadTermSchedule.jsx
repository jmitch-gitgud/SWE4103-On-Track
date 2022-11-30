import Header from "../HeaderUploadTermSchedule";
import React, { Component }  from "react";
import Footer from "../Footer";
 
const options = [
    {
      label: "No File Selected",
      value: '',
    }
  ];
  const emptyRender = (
    <div>
    </div>
  );

var selectedfilename = "No File Selected";

class UploadTermSchedule extends Component{

    state = {
        selectedFile1: '',
        selectedFile2: '',
        selectedSheet: options[0],


        isNoFileSelected: false,
        isSuccess: false,
        isFailure: false
    };

    handleChange = event => {
        this.setState({ selectedSheet: event.target.value });
      }

    onScheduleFile = event => {
        this.setState({ selectedFile2: event.target.files[0] });
        selectedfilename = event.target.files[0].name;
    };

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

                    this.setState({ isNoFileSelected: false});
                    this.setState({ isSuccess: true });
                    this.setState({ isFailure: false});
                    selectedfilename = "No File Selected";

                } else {

                    this.setState({ isNoFileSelected: false});
                    this.setState({ isSuccess: false });
                    this.setState({ isFailure: true});
                   
                }    
                
            });
            event.preventDefault();
        }
        else
        {
            this.setState({ isNoFileSelected: true});
            this.setState({ isSuccess: false });
            this.setState({ isFailure: false});
        }

        let randomString = Math.random().toString(36);
        this.setState({
            inputKey2: randomString,
            selectedFile2: ''
        })
    }
    
    deleteScheduleFile = () => {
        let randomString = Math.random().toString(36);
        this.setState({
            inputKey2: randomString,
            selectedFile2: ''
        })
        selectedfilename = "No File Selected"
    }

   
    render(){
    return(
        <div>
            <Header />
          
            <div className="login-header padding-top-32">
            <h1 className="pageHeader">Upload Term Schedule</h1>
            </div>

            <div className="padding-top-64">
                <div className="abs-button-container">
                        <label className="uploadfiletext" for="file-upload">Choose File</label>
                </div>
            </div>


            <div className="padding-top-8">
                <div className="abs-button-container">
                    <div className="file-text">
                        {selectedfilename}
                    </div>
                </div>
            </div>

            <div className="padding-top-32">
                <div className="abs-button-container">
                    <div className="item">
                        <button className="upload-button"onClick={this.onScheduleUpload}>
                            <p className="abs-button-text">
                            Upload
                            </p>
                        </button>
                        <div className="upload-buffer"></div>
                        <button className="upload-button"onClick={this.deleteScheduleFile}>
                            <p className="abs-button-text">
                            Cancel
                            </p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="padding-top-32">
                <div className="abs-button-container">
                    {this.state.isNoFileSelected ?                    
                        <div className="error-message">{"No File Selected"}</div>
                    : emptyRender
                    }
                    {this.state.isFailure ?                    
                        <div className="error-message">{"Failed to Upload File"}</div>
                    : emptyRender
                    }
                    {this.state.isSuccess ?                    
                        <div className="success-message">{"File Inserted"}</div>
                    : emptyRender
                    }
                </div>
           </div>
           <input className="file" name="file-upload" id="file-upload"type="file"  key={this.state.inputKey2} onChange={this.onScheduleFile} />    
           <Footer />               
        </div>        
               
        );
    }
}
export default UploadTermSchedule;