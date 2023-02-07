import { Button, notification, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DeleteWorker, getWorkerList } from "../ApiConn/Api";
import { MainTitle } from "../Common/common";
import AddEmpModal from "../Modals/AddEmpModal";


const Loader = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
`;

const WorkerListTable = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState()
  const [update,setUpdate] = useState(false)
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleDelete = async (id) => {
    let adminId = localStorage.getItem('AdminId')
    if (window.confirm("Are You sure want to Delete the User")) {
      await DeleteWorker(id,adminId).then((res) => {
        notification["success"]({
            message: "Worker Deleted Successfully",
          });      
        });
    }
  };
  

  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "_id",
      fixed: "center",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "User",
      dataIndex: "name",
      key: "_id",
    },
    {
      title: "Process",
      dataIndex: "process",
      key: "_id",
    },
    {
      title: "Delete",
      dataIndex: "flag",
      key: "_id",
      render: (text, record, index) => {
        return (
          <Button
            disabled={record.role === "SuperAdmin"}
            type="button"
            onClick={() => {
                handleDelete(record._id)
            }}
          >
            Delete
          </Button>
        );
      },
    },
    {
        title: "Edit",
        key: "_id",
        render: (text, record, index) => {
          return (
            <Button
              type="button"
              onClick={() => {
                setId(record._id)
                handleShow()
              }}
            >
              Edit
            </Button>
          );
        },
      },
  ];

  useEffect(() => {
    setLoader(true);
    getWorkerList().then((res) => {
      setLoader(false);
      setData(res?.data.data);
    });
  }, [update]);
  
  return (
    <>
    
      <AddEmpModal
        show={show}
        id={id}
        hide={true}
        setUpdate ={() => setUpdate(!update)}
        onHide={() => setShow(false)}
        handleClose={handleClose}
      />
    
    <MainTitle  hidden={false} />
      {loader ? (
        <Loader>
          &nbsp;
          <Spin size="large" />{" "}
        </Loader>
      ) : (
        <>
          <div className="semiTitle">Worker List</div>
          <Table
            style={{ margin: "10px" }}
            columns={columns}
            dataSource={data}
            bordered
            size="middle"
            scroll={{ x: true }}
            pagination={false}
          />
        </>
      )} 
    </>
  );
};

export default WorkerListTable;
