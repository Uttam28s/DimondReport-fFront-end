import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { mainReport } from "../../ApiConn/Api";

const columns = [
  {
    title: "Index",
    dataIndex: "id",
    key: "id",
    width: 60,
    fixed: "center",
  },
  {
    title: "AdminId",
    dataIndex: "AdminId",
    key: "index",
    width: 30,
    fixed: "center",
  },
  {
    title: "Name",
    dataIndex: "Name",
    width: 60,
    key: "index",
    fixed: "center",
  },
  {
    title: "Jama",
    dataIndex: "jama",
    width: 60,
    key: "index",
    fixed: "center",
  },
  {
    title: "Upad",
    dataIndex: "upad",
    width: 60,
    key: "index",
    fixed: "center",
  },
  {
    title: "Total",
    dataIndex: "Total",
    width: 60,
    key: "index",
    fixed: "center",
  },
];

const AdminRecordTable = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    mainReport().then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <>
      <div className="semiTitle">Data</div>
      <Table columns={columns} dataSource={data} bordered size="middle" />
    </>
  );
};

export default AdminRecordTable;
