import { Button, Input, notification, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { addBulkReport, getWorkerListBulk } from "../../ApiConn/Api";
import { useDiamondTypeHook } from "../../Hooks/getDiamondType";

const BulkTable = (props) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [columns, setColumns] = useState([])
  const { diamondTypeList } = useDiamondTypeHook();
 
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
    }).catch(() => {
        notification["error"]({
            message: "Somthing went Wrong",
          });
    })
  };

  useEffect(() => {
    getWorkerListBulk(props.process).then((x) => {
      setData([...x.data.data]);
    });
  }, []);

  useEffect(() => {
    let arr =[]
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
    diamondTypeList?.map((ele) => {
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
    const rightColumns = [
      {
        title: "Total Pcs.",
        dataIndex: "total",
        key: "index",
        width: 40,
        render: (text, record, index) => {
          if(index === record.index){
            return (
              <Input
                  type="number"
                  value={record?.total}
                 
                />
            )
  
          }
        },
      },
    ];
    setColumns(leftColumns.concat(arr,rightColumns))
  },[diamondTypeList,data])

  const onChangeHandler = (name, value, id) => {
    let newname = name;
    data[id][newname] = value;
    data[id]["total"] = 0
    diamondTypeList?.map((ele) => {
      data[id]["total"] = data[id]["total"] + Number(data[id][ele]) 
    })
    setData([...data])
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
