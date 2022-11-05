import { Table } from 'antd';
import React, { useState } from 'react';

const columns = [
  {
    title: 'Index',
    dataIndex: 'index',
    key: '_id',
    width: 60,
    fixed: 'center'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: '_id',
    width: 100,
    fixed: 'center',
  },
  {
    title: 'Patla',
    fixed: 'center',
    width: 130,
    children: [
      {
        title: 'Pcs.',
        dataIndex: 'patla',
        key: '_id',
        width: 40,
      },
    ],
  },
  {
    title: 'Zada',
    fixed: 'center',
    children: [
      {
        title: 'Pcs.',
        dataIndex: 'jada',
        key: '_id',
        width: 40,
      },
      // {
      //   title: 'Price',
      //   dataIndex: 'price',
      //   key: '_id',
      //   width: 40,
      // }
    ],
  },
  {
    title: 'Extra Zada',
    fixed: 'center',
    children: [
      {
        title: 'Pcs.',
        dataIndex: 'extraJada',
        key: '_id',
        width: 40,
      },
      // {
      //   title: 'Price',
      //   dataIndex: 'price[]',
      //   key: '_id',
      //   width: 40,
      // }
    ],
  },
  {
    title: 'Total Pcs.',
    dataIndex: 'total',
    key: '_id',
    width: 40,
  },
  {
    title: 'Total Salary',
    dataIndex: 'dailywork',
    key: '_id',
    width: 40,
  },    
  {
    title: 'Total Uppad',
    dataIndex: 'dailywork',
    key: '_id',
    width: 40,
  }
];

const TableAll = (props) => {
  const [data, setData] = useState(props.data)
  return (
    <>
      <div className='semiTitle'>{props.title}</div>
      <Table
        columns={columns}
        dataSource={props.data}
        bordered
        size="middle"
      // scroll={{
      //   x: 'calc(700px + 50%)',
      //   y: 240,
      // }}
      />
    </>

  )
};



export default TableAll;