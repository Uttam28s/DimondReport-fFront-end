import { Button, notification, Table } from "antd";
import React, { useEffect, useState } from "react";
import { deleteReport } from "../ApiConn/Api";
import { useDiamondTypeHook } from "../Hooks/getDiamondType";
import AddDataModal from "../Modals/AddDataModal";

const columns = [
  {
    title: "Index",
    dataIndex: "index",
    key: "_id",
    width: 60,
    fixed: 'left',
  },
  {
    title: "Date",
    dataIndex: "date",
    width: 100,
    fixed: 'left',
    
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "_id",
    width: 100,
    fixed: 'left',
  },
];


const TableAll = (props) => {
  const { diamondTypeList } = useDiamondTypeHook();
  const [column, setColumns] = useState([]);
  const [dataAdd, setDataAdd] = useState(false);
  const [id, setId] = useState("");
  const handleClose = () => setDataAdd(false);
  
  const handleDelete = async (id) => {
    await deleteReport(id).then((res) => {
      notification["success"]({
        message: "Report Deleted SuccessFully"
      });
    })
    props.onDataSubmit(props?.tableShow)
  }
  const total = [
    {
      title: "Total Pcs.",
      dataIndex: "total",
      key: "_id",
      width: 40,
    },
    {
      title: "Total Salary",
      dataIndex: "dailywork",
      key: "_id",
      width: 40,
    },
    {
      title: "Edit",
      key: "_id",
      width: "8%",
      render: (text, record, index) => {
        return (
          <Button
            type="button"
            onClick={() => {
              setId(record._id)
              setDataAdd(true)
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      key: "_id",
      width: "8%",
      render: (text, record, index) => {
        return (
          <Button
            disabled={record.role === "SuperAdmin"}
            type="button"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];
  useEffect(() => {
    let obj = [];
    diamondTypeList?.map((ele) => {
      obj.push({
        title: ele,
        fixed: "center",
        width: 130,
        children: [
          {
            title: "Pcs.",
            dataIndex: ele,
            key: "_id",
            width: 40,
            render: (text, record, index) => {
              return <span>{record?.[ele] || "-"}</span>;
            },
          },
          {
            title: "Price",
            dataIndex: `${ele}Price`,
            key: "_id",
            width: 40,
            render: (text, record, index) => {
              return <span>{record?.[`${ele}Price`] || "-"}</span>;
            },
          },
        ],
      });
      return ''
    });
    setColumns(columns.concat(obj, total));
  }, [diamondTypeList]);
  return (
    <>
    {dataAdd && (
        <AddDataModal
          show={dataAdd}
          id={id}
          onDataSubmit={props.onDataSubmit}
          onHide={() => setDataAdd(false)}
          handleCloseData={handleClose}
        />
      )}
      <div className="semiTitle">{props.title}</div>
      <Table 
        columns={column}
        scroll={{ x: true }}
        dataSource={props.data} 
        bordered size="middle" 
      />
    </>
  );
};

export default TableAll;
