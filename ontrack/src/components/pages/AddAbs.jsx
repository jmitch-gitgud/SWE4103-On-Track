import Header from "../HeaderMultiDay";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import { FormControl } from "react-bootstrap";
import subDays from "date-fns/subDays";

function AddAbs()
{
    const [errorMessage, setErrorMessage] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [names, setNames] = useState([]);
    const [teacher, setTeacher] = useState(1);
    const [teacherFirstName, setTeacherFirstName] = useState()
    const [teacherLastName, setTeacherLastName] = useState()
    var status;
    let data = {StartDate: startDate, EndDate: endDate, Staff: teacher};

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

    const onSubmit = (event) => {
        fetch('/long', {
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
              setIsSubmitted(true);
            }
            else {
              setErrorMessage(true);
            }
            
          }); 
        event.preventDefault();
    }

    return (
      
        <div>
          <Header />
          <h1 className="pageHeader">Enter Multi-Day Absence</h1>
          
          <div className="padding-top-32">
            <div className="abs-button-container">
              <div className="select">
                <Dropdown onSelect={handleSelect} onToggle={handleToggle}>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                      
                  </Dropdown.Toggle>

                  <Dropdown.Menu as={CustomMenu}>

                      {names.map(stuff =>(
                          <Dropdown.Item eventKey={stuff.staff_id}>{stuff.first_name + " " + stuff.last_name}</Dropdown.Item>
                      ))}
            
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>

          <div className="padding-top-16">
            <div className="abs-button-container">
              <div className="select-multi-dates-container">
                Select Start Date
                <DatePicker className="select-date" 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                minDate={subDays(new Date(),-1)}
                />
                Select End Date
                <DatePicker 
                className="select-date" 
                selected={endDate} 
                onChange={(date) => setEndDate(date)} 
                minDate={subDays(new Date(),-1)}
                />
              </div>
            </div>
          </div>

          <div className="padding-top-32">
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
