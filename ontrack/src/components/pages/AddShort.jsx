import Header from "../HeaderSingleDay";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import { FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Footer from "../Footer";
import subDays from "date-fns/subDays";

function AddAbs()
{
    const [errorMessage, setErrorMessage] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [checkedP1, setCheckedP1] = useState(false);
    const [checkedP2, setCheckedP2] = useState(false);
    const [checkedP3, setCheckedP3] = useState(false);
    const [checkedP4, setCheckedP4] = useState(false);
    const [names, setNames] = useState([]);
    const [teacher, setTeacher] = useState(1);
    const [teacherFirstName, setTeacherFirstName] = useState()
    const [teacherLastName, setTeacherLastName] = useState()
    var status;
    let data = {Staff: teacher, AbsDate: startDate, P1: checkedP1, P2: checkedP2, P3: checkedP3, P4: checkedP4};

    const handleSelect=(e)=>{
        setTeacher(e);
        fetch('/user', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        }).then(response => {
          return response.json();
        }).then(data =>
          {
            for(var i = 0; i < data.names.length; i++){
              if(data.names[i].staff_id === parseInt(e)){
                setTeacherFirstName(data.names[i].first_name)
                setTeacherLastName(data.names[i].last_name)
              }
            }
        })     
    }

    const handleToggle=(e)=>{
        fetch('/user', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        }).then(response => {
          return response.json();
        }).then(data =>
          {
            setNames(data.names)
            
          })
    }
    
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  
      <button
        className="select-teacher"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
        Select Teacher
        &nbsp;
        &#x25bc;
        <div className="teacher-container">
          <p>
          {teacherFirstName}
          {' '}
          {teacherLastName}
          </p>
        </div>
      </button>

    ));
    
    const CustomMenu = React.forwardRef(
      ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
        const [value, setValue] = useState("");
    
        return (
          <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
          >
            <FormControl
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Type to filter..."
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <ul className="list-unstyled">
              {React.Children.toArray(children).filter(
                (child) =>
                  !value || child.props.children.toLowerCase().startsWith(value)
              )}
            </ul>
          </div>
        );
      }
    );

    const handleCheck = (e) => {
        if (e.target.name == "P1")
        {
            setCheckedP1(!checkedP1);
        }
        else if (e.target.name == "P2")
        {
            setCheckedP2(!checkedP2);
        }
        else if (e.target.name == "P3")
        {
            setCheckedP3(!checkedP3);
        }
        else if (e.target.name == "P4")
        {
            setCheckedP4(!checkedP4);
        }
    }
    
    const onSubmit = (event) => {
        fetch('/short', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
           } 
          }).then(function(response) {
            return response.json();
          }).then(data => {
            status = data.status;
            if (status === 'inserted'){
              setIsSubmitted(true)
            }
            else {
              setErrorMessage(true)
            }
          }); 
        event.preventDefault();
        
    }


    return (
        
      <div >
          <Header />
          <h1 className="pageHeader">Enter Single-Day Absence</h1>
          
          <div className="padding-top-16 container-vertical"> 
           
            <div className="container-horizontal">
            
              <Dropdown onSelect={handleSelect} onToggle={handleToggle}>
                  <Dropdown.Toggle 
                    as={CustomToggle} id="dropdown-custom-components">
                  </Dropdown.Toggle>

                  <Dropdown.Menu as={CustomMenu}>
                      {names.map(stuff =>(
                          <Dropdown.Item eventKey={stuff.staff_id}>{stuff.first_name + " " + stuff.last_name}</Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
              </Dropdown>
              
              &nbsp;
              &nbsp;

              <div className="padding-top-16">
                <p className="select-date-container"> 
                  Select Date
                  <DatePicker 
                    selected={startDate} onChange={(date) => setStartDate(date)} minDate={subDays(new Date(),-1)} className="select-date"
                  />               
                </p>
              </div>
            </div>
          </div>
          
          
          <div>
            <div className="container-vertical">
              <p className="checkbox-container">
                  Select Periods
                <div className="container-horizontal">
                  <div className="container-vertical">
                    P1
                    <input type="checkbox" name="P1" onChange={handleCheck} className="checkbox"/>  
                  </div> 

                  <div className="container-vertical">
                    P2
                    <input type="checkbox" name="P2" onChange={handleCheck} className="checkbox"/>
                  </div> 

                  <div className="container-vertical">
                    P3
                    <input type="checkbox" name="P3" onChange={handleCheck} className="checkbox"/>
                  </div>  

                  <div className="container-vertical">
                    P4
                    <input type="checkbox" name="P4" onChange={handleCheck} className="checkbox"/>
                  </div> 
                      
                </div> 
              </p>
            </div>
          </div>

          <div className="padding-top-8">  
            <div className="abs-button-container">
              <button className="button-submit" as="input" type="submit" value="Submit" onClick={onSubmit}>Submit</button>{' '}
            </div>
          </div> 

        <div className="container-vertical padding-top-16">
          
            {isSubmitted ?
            <div className="success-message">
              <p>
                Absence Successfully Submitted
              </p>
            </div> 
              :
              <p></p>  
            }
            {errorMessage ?
              <div className="error-message">
                <p>
                  Error Submitting Absence
                </p>
              </div>
              :
              <p></p>
            }
          
        </div>
        <Footer />
        </div>
      );
    
}

export default AddAbs;
