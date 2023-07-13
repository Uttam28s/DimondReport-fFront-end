import { Button, notification, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChangePaidStatus } from "../../ApiConn/Api";
import AlertModal from "../../Common/AlertModal";

const PaidDiv = styled.p`
  color: green;
  text-align: left;
`;

const PrintCell = styled.div`
  &.margin-left {
    margin-left: 20px;
  }
`;

const Container = styled.div`
  // .fullPage {
  //   height: 100vh;
  // }
  @media print {
    ${PrintCell} {
      display: none;
    }
    .fullPage {
      page-break-after: always;
    }
    .ant-table-thead {
      font-size: x-large;
    }
    .font-large {
      font-weight: 600;
      font-size: x-large;
    }
  }
`;

const LastMonthReportTable = (props) => {
  const [columns, setColumns] = useState([]);
  const [statusFlag, setStatusFlag] = useState(false);
  const [id, setId] = useState("");
  const handleCloseData = () => setStatusFlag(false);

  const leftSideColumns = [
    {
      title: "No",
      dataIndex: "index",
      key: "_id",
      // width: "5%",
      render: (text, record, index) => {
        return (
          <span className="font-large">
            {record?.workerName === "Total" ? "" : index + 1}
          </span>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "workerName",
      width: "20%",
      key: "_id",
      render: (text, record, index) => {
        return (
          <span>
            {record?.workerName === "Total" ? (
              <b className="color-red font-large">{record?.workerName}</b>
            ) : (
              <p className="font-large">{record?.workerName}</p>
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
      width: "5%",
      render: (text, record, index) => {
        return (
          <span>
            {record?.workerName === "Total" ? (
              <b className="color-red font-large">{record?.total?.toFixed(2)}</b>
            ) : (
              <p className="font-large">{record?.total?.toFixed(2)}</p>
            )}
          </span>
        );
      },
    },
    {
      title: "Uppad",
      dataIndex: "uppad",
      key: "_id",
      width: "5%",
      render: (text, record, index) => {
        return (
          <span>
            {record?.workerName === "Total" ? (
              <b className="color-red font-large">{record?.uppad?.toFixed(2)}</b>
            ) : (
              <p className="font-large">{record?.uppad?.toFixed(2)}</p>
            )}
          </span>
        );
      },
    },
    {
      title: "Jama",
      dataIndex: "jama",
      key: "_id",
      width: "5%",
      render: (text, record, index) => {
        return (
          <span>
            {record?.workerName === "Total" ? (
              <b className="color-red font-large">{record?.jama?.toFixed(2) }</b>
            ) : (
              <p className="font-large">{record?.jama?.toFixed(2)}</p>
            )}
          </span>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "salary",
      key: "_id",
      width: "5%",
      render: (text, record, index) => {
        return (
          <span>
            {record?.workerName === "Total" ? (
              <b className="color-red font-large">{record?.salary?.toFixed(2)}</b>
            ) : (
              <p className="font-large">{record?.salary?.toFixed(2)}</p>
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
          <PrintCell>
            <PaidDiv>Paid</PaidDiv>
          </PrintCell>
        ) : (
          <PrintCell>
            <Button
              // disabled={moment().month() > props?.month}
              className="color-red"
              onClick={() => {
                setId(record?.workerid);
                setStatusFlag(true);
              }}
            >
              Pending
            </Button>
          </PrintCell>
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
        render: (text, record, index) => {
          return (
            <span>
              {record?.workerName === "Total" ? (
                <b className="color-red font-large">{record?.[`${ele}pcs`]}</b>
              ) : (
                <p className="font-large">{record?.[`${ele}pcs`]}</p>
              )}
            </span>
          );
        },
      });
      return "";
    });
    setColumns(leftSideColumns.concat(arr, rightSideColumns));
  }, [props?.diamondTypeList]);

  const handlePaidButton = async (workerid) => {
    let params = {
      month: props?.month,
      workerid: workerid,
    };
    if(params.month === moment().month()){
      params['type'] = true
    }
    setStatusFlag(false);

    await ChangePaidStatus(params)
      .then((res) => {
        notification["success"]({
          message: "Status Updated Successfully",
        });
        props?.setStatus();
      })
      .catch((err) => {
        notification["error"]({
          message: "Something Went Wrong",
        });
      });
  };

  const callchangeStatus = () => handlePaidButton(id);
  return (
    <Container>
      <div className="semiTitle">
        <p className="font-large">{props.title} </p>
        {/* <PrintCell className="margin-left">
          <Button onClick={printItems}>Print</Button>
        </PrintCell> */}
      </div>
      <AlertModal
        statusFlag={statusFlag}
        handleCloseData={handleCloseData}
        callchangeStatus={callchangeStatus}
      />
      <div className="fullPage">
        <Table
          style={{ margin: "10px" }}
          columns={columns}
          scroll={{ x: true }}
          dataSource={props.data}
          bordered
          size="small"
          pagination={false}
        />
      </div>
    </Container>
  );
};

export default LastMonthReportTable;
