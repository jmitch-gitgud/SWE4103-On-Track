import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FormControl } from "react-bootstrap";
import Calendar from '../Calendar'
import { Link } from "react-router-dom";
import Footer from "../Footer";
import "./ChangeDate.css";

import Header from "../HeaderChangeDate";

function ChangeDate(){

  const [names, setNames] = useState([]);
  const [data, setData] = useState([]);
  const [teacherFirstName, setTeacherFirstName] = useState()
  const [teacherLastName, setTeacherLastName] = useState()

  const handleSelect=(e)=>{
    fetch(`/user?staff_id=${e}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      return response.json();
    }).then(data =>
      {
        console.log(data);
        setData(data);
      })

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
    <div className="theme-text padding-left-128"
          
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
                   
          <button className="abs-button">
            <p>
              {teacherFirstName ?
              (teacherFirstName + ' ' + teacherLastName)
              :
              'Select Teacher'
              }
              &nbsp;
              &#x25bc;
            </p>
            
          </button>
        </div>
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

  return (
    <div>

      <Header />
      
      <Dropdown onSelect={handleSelect} onToggle={handleToggle}>

        <div className="padding-top-16">

          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          </Dropdown.Toggle>

          <Dropdown.Menu as={CustomMenu}>
            
            {names.map(stuff =>(
              <Dropdown.Item eventKey={stuff.staff_id}>{stuff.first_name + " " + stuff.last_name}</Dropdown.Item>
            ))}
            
          </Dropdown.Menu>
        </div>

        <div className = "container-vertical">
          <Calendar data= {data} />
          {/* <Link to="/login" state={{ name : names }}>
          <button className = "addAbsenceButton">Add Absence</button>
          </Link> */}
        
        </div>

      </Dropdown>
      
    </div>
  );
}
export default ChangeDate;