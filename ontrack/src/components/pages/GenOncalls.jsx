import Header from "../HeaderGenOnCalls";
import Footer from "../Footer";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function GenOncalls(){

    const [avail, setAvail] = useState([]);
    const [abs, setAbs] = useState([]);
    const [oncalls, setOncalls] = useState([]);

    const onSubmit=(e)=>{
        fetch('/avail', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        }).then(response => {
          return response.json();
        }).then(data =>
          {
            setAvail(data.Avail);
          })
        fetch('/absences', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then(data =>
            {
              setAbs(data.Absences);
            })
        let data = {Avail: avail, Abs: abs};
        fetch('/oncall', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
             } 
        }).then(function(response) {
              return response.json();
        }).then(data => {
          setOncalls(data.Oncalls);
        })
    }

    return(
        <div>
            <Header />
            <p></p>
            <button onClick={onSubmit}>Generate Oncalls</button>
            <p></p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Absent Teacher</th>
                  <th>Available Teacher</th>
                  <th>Period</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {oncalls.map(item => {
                  return (
                    <tr>
                      <td>{ item[0] }</td>
                      <td>{ item[1] }</td>
                      <td>{ item[2] }</td>
                      <td>{ item[3] }</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Footer />
        </div>
    );
}

export default GenOncalls;