import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FormControl } from "react-bootstrap";
//import Form from 'react-bootstrap/Form';
//import { render } from 'react-dom';
import Calendar from '../Calendar'
import { Link } from "react-router-dom";
//import Header from "../Header";
import Footer from "../Footer";
import "./ChangeDate.css";

import Header from "../HeaderChangeDate";

function ChangeDate(){

  const [names, setNames] = useState([]);
  const [data, setData] = useState([]);

  const handleSelect=(e)=>{
    fetch(`/user?staff_id=${e}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      return response.json();
    }).then(data =>
      {
        setData(data);
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
    <a
      href="a"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
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

      <Dropdown className = "tableSize" onSelect={handleSelect} onToggle={handleToggle}>

        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          Select Teacher
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
          
          {names.map(stuff =>(
            <Dropdown.Item eventKey={stuff.staff_id}>{stuff.first_name + " " + stuff.last_name}</Dropdown.Item>
          ))}
          
        </Dropdown.Menu>
        <Calendar data= {data} />
        {/* <Link to="/login" state={{ name : names }}>
        <button className = "addAbsenceButton">Add Absence</button>
        </Link> */}
      </Dropdown>
    </div>
  );
}
export default ChangeDate;