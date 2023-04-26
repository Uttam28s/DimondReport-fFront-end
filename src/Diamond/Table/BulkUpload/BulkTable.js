import { Button, Input, notification, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { addBulkReport, getWorkerListBulk } from "../../ApiConn/Api";
import { useDiamondTypeHook } from "../../Hooks/getDiamondType";
import styled from "styled-components";
import { typeList } from "antd/lib/message";
import { useNavigate } from "react-router-dom";


const Loader = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
`;

const BulkTable = (props) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [columns, setColumns] = useState([]);
  const [tableLoader, setTableLoader] = useState(false)
  const [typeList,setTypeList] = useState([])
  const navigate = useNavigate()
  const { activeTypeList } = useDiamondTypeHook()
  const onClickhandler = () => {
    var today = new Date();
    data.map((ele, index) => {
      ele.workerid = ele._id;
      ele.process = props.process;
      ele.date = today;
    });

    setLoader(true);
    addBulkReport(data, props.process)
      .then((res) => {
        setLoader(false);
        notification["success"]({
          message: res?.data?.message,
        });
        navigate('/diamond')
      })
      .catch(() => {
        notification["error"]({
          message: "Somthing went Wrong",
        });
      });
  };

  useEffect(() => {
    setTableLoader(true)
    let typeLst = localStorage.getItem("typeList")
    setTypeList(JSON.parse(typeLst))
    getWorkerListBulk(props.process).then((x) => {
      setData([...x.data.data]);
      setTableLoader(false)

    });
  }, []);

  useEffect(() => {
    let arr = [];
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
      },
    ];
    let list = []
    if(activeTypeList?.length === 0){
      list = typeList
    }else{
      list = activeTypeList
    }
    list?.map((ele) => {
      arr.push({
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
      });
    });
    const rightColumns = [
      {
        title: "Total Pcs.",
        dataIndex: "total",
        key: "index",
        width: 40,
        render: (text, record, index) => {
          if (index === record.index) {
            return <Input type="number" value={record?.total} />;
          }
        },
      },
    ];
    setColumns(leftColumns.concat(arr, rightColumns));
  }, [activeTypeList, data, typeList]);

  const onChangeHandler = (name, value, id) => {
    let newname = name;
    data[id][newname] = value;
    data[id]["total"] = 0;
    typeList?.map((ele) => {
      data[id]["total"] = data[id]["total"] + Number(data[id][ele]);
    });
    setData([...data]);
  };
  return (
    <>
      <Button
        style={{ float: "right", margin: "10px" }}
        onClick={onClickhandler}
        disabled={loader}
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
      {tableLoader ? (
        <Loader>
          {" "}
          &nbsp; <Spin size="large" />
        </Loader>
      ) : (
      <Table
        style={{ margin: "10px" }}
        scroll={{ x: true }}
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
      />)}
    </>
  );
};

export default BulkTable;
