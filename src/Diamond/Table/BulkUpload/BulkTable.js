import { Button, Input, notification, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { addBulkReport, getWorkerListBulk } from "../../ApiConn/Api";

const BulkTable = (props) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(false);
  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
      width: 60,
      fixed: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "index",
      width: 100,
      fixed: "center",
    },
    {
      title: "Patla Pcs.",
      dataIndex: "patla",
      key: "index",
      width: 40,
      render: (text, record, index) => {
        return (
          <Input
            type="number"
            onChange={(e) => {
              onChangeHandler("patla", e.target.value, record.index);
            }}
          />
        );
      },
    },
    {
      title: "Jada Pcs.",
      dataIndex: "jada",
      key: "index",
      width: 40,
      render: (text, record, index) => {
        return (
          <Input
            onChange={(e) => {
              onChangeHandler("jada", e.target.value, record.index);
            }}
          />
        );
      },
    },
    {
      title: "Extra-Zada Pcs.",
      dataIndex: "extraJada",
      key: "index",
      width: 40,
      render: (text, record, index) => {
        return (
          <Input
            onChange={(e) => {
              onChangeHandler("extraJada", e.target.value, record.index);
            }}
          />
        );
      },
    },
    {
      title: "Total Pcs.",
      dataIndex: "total",
      key: "index",
      width: 40,
      render: (text, record, index) => {
        return <span>{total}</span>;
      },
    },
  ];

  const onClickhandler = () => {
    var today = new Date();
    data.map((ele, index) => {
      ele.workerid = ele._id;
      ele.process = props.process;
      ele.date = today;
    });
    setLoader(true);
    addBulkReport(data, props.process).then((res) => {
      setLoader(false);
      notification["success"]({
        message: res?.data?.message,
      });
    }).catch((err) => {
        notification["error"]({
            message: "Somthing went Wrong",
          });
    })
  };

  useEffect(() => {
    getWorkerListBulk(props.process).then((x) => {
      setData(x.data.data);
    });
  }, []);

  const onChangeHandler = (name, value, id) => {
    let newname = name;
    data[id][newname] = value;
    data[id]["total"] =
      Number(data[id]["extraJada"]) +
      Number(data[id]["jada"]) +
      Number(data[id]["patla"]);
    setTotal(data[id]["total"]);
  };
  return (
    <>
      <Button
        style={{ float: "right", margin: "10px" }}
        onClick={onClickhandler}
      >
        Submit{" "}
        {loader ? (
          <>
            {" "}
            &nbsp; <Spin size="small" />{" "}
          </>
        ) : (
          ""
        )}
      </Button>

      <div className="semiTitle">{props.title}</div>
      <Table
        style={{ margin: "10px" }}
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
      />
    </>
  );
};

export default BulkTable;
