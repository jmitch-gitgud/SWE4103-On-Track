import React from "react";
import { Space, Table, Tag } from 'antd';
import 'antd/dist/antd.css';

function Calendar(props) {

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


  const year = new Date().getFullYear();
  
  return (
    <div>
    <Table 
        style={{ width: '1000px', paddingTop: '30px'}} 
        dataSource={props.data.names} 
        columns={columns} 
        bordered/>
    </div>
    
  );
}

export default Calendar;



