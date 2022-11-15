import React , { useEffect, useState } from "react";
import { Space, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import "./pages/ChangeDate.css";

function Calendar(props) {

const [page, setPage] = useState(0);


const handleForward=(e)=>{
  setPage(page + 1)
  populateTable()
}

const handleBackward=(e)=>{
  setPage(page -1)
  populateTable()
}

const columns = [
    {
      title: 'Date',
      dataIndex: 'absence_date',
      key: 'absence_date',
      render: text => (
        <div>{text.slice(0,10)}</div>
        ),
      width: '200px',
    },
    {
      title: 'Period 1',
      dataIndex: 'period1',
      key: 'period1',
    },
    {
      title: 'Period 2',
      dataIndex: 'period2',
      key: 'period2',
    },
    {
        title: 'Period 3',
        dataIndex: 'period3',
        key: 'period3',
    },
    {
        title: 'Period 4',
        dataIndex: 'period4',
        key: 'period4',
    },
  ];

  const populateTable=(e)=>{

    var curr = new Date;
    const skip = page * 7;
    curr.setDate(curr.getDate() + skip);
    var Monday = new Date(curr.setDate(curr.getDate() - curr.getDay()+1)).toString().slice(0,15);
    var Tuesday = new Date(curr.setDate(curr.getDate() - curr.getDay()+2)).toString().slice(0,15);
    var Wednesday = new Date(curr.setDate(curr.getDate() - curr.getDay()+3)).toString().slice(0,15);
    var Thursday = new Date(curr.setDate(curr.getDate() - curr.getDay()+4)).toString().slice(0,15);
    var Friday = new Date(curr.setDate(curr.getDate() - curr.getDay()+5)).toString().slice(0,15);

    let days = [
      {
        key: 1,
        absence_date: Monday,
        period1: null,
        period2: null,
        period3: null,
        period4: null
      },
      {
        key:2,
        absence_date: Tuesday,
        period1: null,
        period2: null,
        period3: null,
        period4: null
      },
      {
        key:3,
        absence_date: Wednesday,
        period1: null,
        period2: null,
        period3: null,
        period4: null
      },
      {
        key:4,
        absence_date: Thursday,
        period1: null,
        period2: null,
        period3: null,
        period4: null
      },
      {
        key:5,
        absence_date: Friday,
        period1: null,
        period2: null,
        period3: null,
        period4: null
      }
    ]

    if(!!props.data.names){
      for (let i = 0; i < props.data.names.length; i++) {
        let date = new Date(props.data.names[i].absence_date).toString().slice(0,15)
        
        for (let j = 0; j < 5; j++) {
          if(days[j].absence_date === date){
            days[j].period1 = props.data.names[i].period1
            days[j].period2 = props.data.names[i].period2
            days[j].period3 = props.data.names[i].period3
            days[j].period4 = props.data.names[i].period4
          };
        }
      }
    }

    return days
  }

  const back = "<"
  const forward = ">"
  return (
    <div>
    <Table 
        style={{ width: '1000px', paddingTop: '30px'}} 
        dataSource={populateTable()} 
        columns={columns} 
        bordered
        pagination = {false}
      />
      <button onClick = {handleBackward} className = "paginationButtons"> {back} </button>
      <button onClick = {handleForward} className = "paginationButtons forwards"> {forward} </button>
    </div>
    
  );
}

export default Calendar;



