import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDiamondTypeHook } from "../Hooks/getDiamondType";

const columns = [
  {
    title: "Index",
    dataIndex: "index",
    key: "_id",
    width: 60,
    fixed: "center",
  },
  {
    title: "Date",
    dataIndex: "date",
    width: 60,
    fixed: "center",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "_id",
    width: 100,
    fixed: "center",
  },
];

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
];

const TableAll = (props) => {
  const { diamondTypeList } = useDiamondTypeHook();
  const [column, setColumns] = useState([]);
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
    });
    setColumns(columns.concat(obj, total));
  }, [diamondTypeList]);
  return (
    <>
      <div className="semiTitle">{props.title}</div>
      <Table columns={column} dataSource={props.data} bordered size="middle" />
    </>
  );
};

export default TableAll;
