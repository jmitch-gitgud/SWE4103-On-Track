import Header from "../HeaderSingleDay";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import { FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";

function AddAbs()
{
    const [startDate, setStartDate] = useState(new Date());
    const [checkedP1, setCheckedP1] = useState(false);
    const [checkedP2, setCheckedP2] = useState(false);
    const [checkedP3, setCheckedP3] = useState(false);
    const [checkedP4, setCheckedP4] = useState(false);
    const [names, setNames] = useState([]);
    const [teacher, setTeacher] = useState(1);
    var status;
    let data = {Staff: teacher, AbsDate: startDate, P1: checkedP1, P2: checkedP2, P3: checkedP3, P4: checkedP4};

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
            alert(status);
          }); 
        event.preventDefault();
    }

    return (
        <div>
            <Header />

            PICK DATE<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <Dropdown style={{ paddingLeft: '200px', paddingTop: '50px'}} onSelect={handleSelect} onToggle={handleToggle}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    Select Teacher
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
          
                    {names.map(stuff =>(
                        <Dropdown.Item eventKey={stuff.staff_id}>{stuff.first_name + " " + stuff.last_name}</Dropdown.Item>
                    ))}
          
                </Dropdown.Menu>
            </Dropdown>
            P1<input type="checkbox" name="P1" onChange={handleCheck}/>
            P2<input type="checkbox" name="P2" onChange={handleCheck}/>
            P3<input type="checkbox" name="P3" onChange={handleCheck}/>
            P4<input type="checkbox" name="P4" onChange={handleCheck}/>
            <p></p>
            <Button as="input" type="submit" value="Submit" onClick={onSubmit}/>{' '}
        </div>
      );
    
}

export default AddAbs;