import { Button, notification, Table } from "antd";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import { ChangePaidStatus } from "../../ApiConn/Api";
import { dummyData } from "../../Common/common";


const PaidDiv = styled.p`
  color : green;
  text-align : center;
`
const PendingButton = styled(Button)`
  color : red;
`
const handlePaidButton = async (workerid) => {
    let params = {
        month: moment().month() - 1,
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

const LastMonthReportTable = (props) => {
  const columns = [
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
      {
        title: 'Patla Pcs.',
        dataIndex: 'patlapcs',
        key: '_id',
        width: "10%",
      },
      {
        title: 'Jada Pcs.',
        dataIndex: 'jadapcs',
        key: '_id',
        width: "10%",
      },
      {
        title: 'Extra Jada Pcs',
        dataIndex: 'extrajadapcs',
        key: '_id',
        width: "10%",
      },
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
      
  ];


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
