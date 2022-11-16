import Header from "../HeaderAddAbs";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import { FormControl } from "react-bootstrap";

function AddAbs()
{
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [names, setNames] = useState([]);
    const [teacher, setTeacher] = useState(1);
    var status;
    let data = {StartDate: startDate, EndDate: endDate, Staff: teacher};

    const handleSelect=(e)=>{
        setTeacher(e);
        
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
            alert(status);
          }); 
        event.preventDefault();
    }

    return (
      
        <div>
          <Header />
          <h3 className="addAbsHeader">Submit Long Term Absences</h3>
          
          <div className="addAbs">
            
            <div className="selectTeacher">
              <Dropdown onSelect={handleSelect} onToggle={handleToggle}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    Select Teacher
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>

                    {names.map(stuff =>(
                        <Dropdown.Item eventKey={stuff.staff_id}>{stuff.first_name + " " + stuff.last_name}</Dropdown.Item>
                    ))}
          
                </Dropdown.Menu>
              </Dropdown>
              <p>No Teacher Selected</p>
            </div>

            <div className="selectDate">
                Select Start Date<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                
                <div className="selectEndDate">
                Select End Date<DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                </div>

            </div>
            
          </div>

          <div className="addAbs">
            <Button as="input" type="submit" value="Submit" onClick={onSubmit}/>{' '}
          </div>

        </div>
      );   
}

export default AddAbs;