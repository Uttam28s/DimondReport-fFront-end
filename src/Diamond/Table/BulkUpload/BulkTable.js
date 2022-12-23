import { Button, Input, notification, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { addBulkReport, getWorkerListBulk } from "../../ApiConn/Api";
import { useDiamondTypeHook } from "../../Hooks/getDiamondType";

const BulkTable = (props) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(false);
  const [columns, setColumns] = useState([])
  const { diamondTypeList } = useDiamondTypeHook();

  const leftColumns = [
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
    }
  ]
  const rightColumns = [
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
    console.log("🚀 ~ file: BulkTable.js:49 ~ data.map ~ data", data)
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
      // window.location.reload(false)
    }).catch(() => {
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

  useEffect(() => {
    let arr =[]
    diamondTypeList.map((ele) => {
      arr.push(
        {
          title: `${ele}Pcs.`,
          dataIndex: `${ele}`,
          key: "index",
          width: 40,
          render: (text, record, index) => {
            return (
              <Input
                type="number"
                onChange={(e) => {
                  onChangeHandler(`${ele}`, e.target.value, record.index);
                }}
              />
            );
          },
        }
      )
    })
    setColumns(leftColumns.concat(arr,rightColumns))
  },[diamondTypeList])

  const onChangeHandler = (name, value, id) => {
    let newname = name;
    console.log("🚀 ~ file: BulkTable.js:97 ~ onChangeHandler ~ newname", newname)
    data[id][newname] = value;
    data[id]["total"] = 0
    console.log("🚀 ~ file: BulkTable.js:102 ~ diamondTypeList.map ~ diamondTypeList", diamondTypeList)
    diamondTypeList.map((ele) => {
      data[id]["total"] = data[id]["total"] + Number(data[id][ele]) 
    })
    console.log("🚀 ~ file: BulkTable.js:102 ~ diamondTypeList.map ~ ", data[id]["total"])
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
            &nbsp; <Spin size="small" />
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
