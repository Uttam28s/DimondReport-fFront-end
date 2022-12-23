import { Button, notification, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChangePaidStatus } from "../../ApiConn/Api";
import { dummyData } from "../../Common/common";
import { useDiamondTypeHook } from "../../Hooks/getDiamondType";


const PaidDiv = styled.p`
  color : green;
  text-align : center;
`
const PendingButton = styled(Button)`
  color : red;
`
const handlePaidButton = async (workerid) => {
    let params = {
        month: moment().month(),
        workerid: workerid,
    }
    await ChangePaidStatus(params).then((res) => {
        notification["success"]({
            message: 'Status Updated Successfully'
        })
        window.location.reload(false)
    }).catch((err) => {
        notification["error"]({
            message: "Something Went Wrong"
        })   
    })
}

const leftSideColumns = [
  {
      title: 'Index',
      dataIndex: 'index',
      key: '_id',
      width: '5%',
      fixed: 'center',
      render: (text, record, index) => {
          return index + 1
        },
    },
    {
      title: 'Name',
      dataIndex: 'workerName',
      key: '_id',
      width: "12%",
    },
];

const rightSideColumns = [
  {
    title: 'Salary',
    dataIndex: 'total',
    key: '_id',
    width: "10%",
  },
  {
    title: 'Uppad',
    dataIndex: 'uppad',
    key: '_id',
    width: "10%",
  },
  {
    title: 'Jama',
    dataIndex: 'jama',
    key: '_id',
    width: "10%",
  },
  {
    title: 'Total',
    dataIndex: 'salary',
    key: '_id',
    width: "10%",
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: '_id',
    width: "10%",
    render: (text, record, index) => {
        return (
            (record.status === 'paid') ? 
            <PaidDiv>Paid</PaidDiv>
            :
            <PendingButton onClick={() => handlePaidButton(record?.workerid)}>Pending</PendingButton>
        );
      },
  }
]
const LastMonthReportTable = (props) => {
  const { diamondTypeList } = useDiamondTypeHook();
  const [columns, setColumns] = useState([])
  useEffect(() => {
    let arr = []
    diamondTypeList.map((ele) => {
      arr.push(
        {
          title: `${ele} Pcs` ,
          dataIndex: `${ele}pcs`,
          key: '_id',
          width: "10%",
        },
      )
    })
    setColumns(leftSideColumns.concat(arr,rightSideColumns))

  },[diamondTypeList])
  
  return (
    <>
      <div className="semiTitle">{props.title}</div>
      <Table
        style={{ margin: "10px" }}
        columns={columns}
        // showHeader={empty ? false : true}
        dataSource={props.data}
        bordered
        size="middle"
        pagination={false}
      />
      
    </>
  );
};

export default LastMonthReportTable;
