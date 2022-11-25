import Header from "../HeaderHome";
import Footer from "../Footer";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function GenOncalls(){

    const [avail, setAvail] = useState([{absent: "N/A", avail: "N/A", period: "N/A", class: "N/A"}]);
    const [abs, setAbs] = useState([{staff_id: 2000}]);

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
        console.log(avail);    
    }

    return(
        <div>
            <Header />
            <Button as="input" value="Generate Oncalls" onClick={onSubmit}/>{' '}
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
                {avail.map(item => {
                  return (
                    <tr>
                      <td>{ item.absent }</td>
                      <td>{ item.avail }</td>
                      <td>{ item.period }</td>
                      <td>{ item.class }</td>
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