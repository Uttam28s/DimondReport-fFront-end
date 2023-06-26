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
  }
`;

const LastMonthReportTable = (props) => {
  const [columns, setColumns] = useState([]);
  const [statusFlag, setStatusFlag] = useState(false);
  const [id, setId] = useState("");
  const handleCloseData = () => setStatusFlag(false);

  const leftSideColumns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "_id",
      width: "5%",
      render: (text, record, index) => {
        return <span>{record?.workerName === "Total" ? "" : index + 1}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "workerName",
      width: "10%",
      key: "_id",
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
      width: "5%",
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
      width: "5%",
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
      width: "5%",
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
      width: "5%",
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
          <PrintCell>
            <PaidDiv>Paid</PaidDiv>
          </PrintCell>
        ) : (
          <PrintCell>
            <Button
              disabled={moment().month() > props?.month}
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
                <b className="color-red">{record?.[`${ele}pcs`]}</b>
              ) : (
                record?.[`${ele}pcs`]
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
      month: moment().month(),
      workerid: workerid,
    };
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
        {props.title}{" "}
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
        size="middle"
        pagination={false}
      />
      </div>
    </Container>
  );
};

export default LastMonthReportTable;
