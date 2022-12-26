import { Button, notification, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChangePaidStatus } from "../../ApiConn/Api";
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
          return <span>{record?.workerName === "Total" ? "" : index + 1}</span>

        },
    },
    {
      title: 'Name',
      dataIndex: 'workerName',
      key: '_id',
      width: "12%",
      render: (text, record, index) => {
        return <span>{record?.workerName === "Total" ? <b style={{ color: "red"}}>{record?.workerName}</b> : record?.workerName}</span>
      },
    },
];

const rightSideColumns = [
  {
    title: 'Salary',
    dataIndex: 'total',
    key: '_id',
    width: "10%",
    render: (text, record, index) => {
      return <span>{record?.workerName === "Total" ? <b style={{ color: "red"}}>{record?.total}</b> : record?.total}</span>
    },
  },
  {
    title: 'Uppad',
    dataIndex: 'uppad',
    key: '_id',
    width: "10%",
    render: (text, record, index) => {
      return <span>{record?.workerName === "Total" ? <b style={{ color: "red"}}>{record?.uppad}</b> : record?.uppad}</span>
    },
  },
  {
    title: 'Jama',
    dataIndex: 'jama',
    key: '_id',
    width: "10%",
    render: (text, record, index) => {
      return <span>{record?.workerName === "Total" ? <b style={{ color: "red"}}>{record?.jama}</b> : record?.jama}</span>
    },
  },
  {
    title: 'Total',
    dataIndex: 'salary',
    key: '_id',
    width: "10%",
    render: (text, record, index) => {
      return <span>{record?.workerName === "Total" ? <b style={{ color: "red"}}>{record?.salary}</b> : record?.salary}</span>
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: '_id',
    width: "10%",
    render: (text, record, index) => {
        return (
          record?.workerName === "Total" ? "" :
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
    diamondTypeList?.map((ele) => {
      arr.push(
        {
          title: `${ele} Pcs` ,
          dataIndex: `${ele}pcs`,
          key: '_id',
          width: "10%",
          render: (text, record, index) => {
            return <span>{record?.workerName === "Total" ? <b style={{ color: "red"}}>{record?.[`${ele}pcs`]}</b> : record?.[`${ele}pcs`]}</span>
          },
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
        dataSource={props.data}
        bordered
        size="middle"
        pagination={false}
      />
      
    </>
  );
};

export default LastMonthReportTable;
