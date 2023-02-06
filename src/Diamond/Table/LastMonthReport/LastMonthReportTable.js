import { Button, notification, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChangePaidStatus } from "../../ApiConn/Api";
import AlertModal from "../../Common/AlertModal";
import { useDiamondTypeHook } from "../../Hooks/getDiamondType";

const PaidDiv = styled.p`
  color: green;
  text-align: left;
`;

const LastMonthReportTable = (props) => {
  const [columns, setColumns] = useState([]);

  
  const [statusFlag,setStatusFlag] = useState(false) 
  const [id,setId] = useState("")
  const handleCloseData = () => setStatusFlag(false)

  const leftSideColumns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "_id",
      width: "5%",
      fixed: "center",
      render: (text, record, index) => {
        return <span>{record?.workerName === "Total" ? "" : index + 1}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "workerName",
      key: "_id",
      width: "12%",
      render: (text, record, index) => {
        return (
          <span>
            {record?.workerName === "Total" ? (
              <b className="color-red">{record?.workerName}</b>
            ) : (
              record?.workerName
            )}
          </span>
        );
      },
    },
  ];

  const rightSideColumns = [
    {
      title: "Salary",
      dataIndex: "total",
      key: "_id",
      width: "10%",
      render: (text, record, index) => {
        return (
          <span>
            {record?.workerName === "Total" ? (
              <b className="color-red">{record?.total}</b>
            ) : (
              record?.total
            )}
          </span>
        );
      },
    },
    {
      title: "Uppad",
      dataIndex: "uppad",
      key: "_id",
      width: "10%",
      render: (text, record, index) => {
        return (
          <span>
            {record?.workerName === "Total" ? (
              <b className="color-red">{record?.uppad}</b>
            ) : (
              record?.uppad
            )}
          </span>
        );
      },
    },
    {
      title: "Jama",
      dataIndex: "jama",
      key: "_id",
      width: "10%",
      render: (text, record, index) => {
        return (
          <span>
            {record?.workerName === "Total" ? (
              <b className="color-red">{record?.jama}</b>
            ) : (
              record?.jama
            )}
          </span>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "salary",
      key: "_id",
      width: "10%",
      render: (text, record, index) => {
        return (
          <span>
            {record?.workerName === "Total" ? (
              <b className="color-red">{record?.salary}</b>
            ) : (
              record?.salary
            )}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "_id",
      width: "10%",
      render: (text, record, index) => {
        return record?.workerName === "Total" ? (
          ""
        ) : record.status === "paid" ? (
          <PaidDiv>Paid</PaidDiv>
        ) : (
          <Button className="color-red" onClick={() => { 
            // handlePaidButton(record?.workerid)
            setId(record?.workerid)
            setStatusFlag(true)
          }
          }
          >
            Pending
          </Button>
        );
      },
    },
  ];
  useEffect(() => {
    let arr = [];
    props?.diamondTypeList?.map((ele) => {
      arr.push({
        title: `${ele} Pcs`,
        dataIndex: `${ele}pcs`,
        key: "_id",
        width: "10%",
        render: (text, record, index) => {
          return (
            <span>
              {record?.workerName === "Total" ? (
                <b className="color-red">{record?.[`${ele}pcs`]}</b>
              ) : (
                record?.[`${ele}pcs`]
              )}
            </span>
          );
        },
      });
    });
    setColumns(leftSideColumns.concat(arr, rightSideColumns));
  }, [props.diamondTypeList]);

  const handlePaidButton = async (workerid) => {
    let params = {
      month: moment().month(),
      workerid: workerid,
    };
    setStatusFlag(false)

    await ChangePaidStatus(params)
      .then((res) => {
        notification["success"]({
          message: "Status Updated Successfully",
        });
        props?.setStatus()
      })
      .catch((err) => {
        notification["error"]({
          message: "Something Went Wrong",
        });
      });
  };

  const callchangeStatus = () => handlePaidButton(id)
  return (
    <>
      <div className="semiTitle">{props.title}</div>


      <AlertModal statusFlag={statusFlag} handleCloseData={handleCloseData} callchangeStatus={callchangeStatus} />
    
      
      <Table
        style={{ margin: "10px" }}
        columns={columns}
        scroll={{ x: true }}
        dataSource={props.data}
        bordered
        size="middle"
        pagination={false}
      />
    </>
  );
};

export default LastMonthReportTable;
