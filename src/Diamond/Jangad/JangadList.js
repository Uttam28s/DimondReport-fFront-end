import React, { useEffect, useRef, useState } from "react";
import { BillTemplate, MainTitle } from "../Common/common";
import { Button, Table, message } from "antd";
import { getJangadList, removeJangad } from "../ApiConn/Api";
import ReactToPrint from "react-to-print";
import { useNavigate } from "react-router-dom";
import {
  DeleteIconButton,
  EditIconButton
} from "../Common/button";
import { Print } from "@mui/icons-material";

const JangadList = () => {
  const [data, setData] = useState([]);
  const billRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getJangadList()
      .then((res) => {
        setData(res?.data);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    if(window.confirm("Are you sure want to delete?")){
      removeJangad(id)
        .then((res) => {
          setLoading(false);
          message.success("Jangad Deleted Successfully");
        })
        .catch((e) => {
          setLoading(false);
          message.error(e.message);
        });

    }
  };

  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      render: (text, record, index) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "JangadNumber",
      dataIndex: "jangadNo",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Process",
      dataIndex: "process",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record, index) => {
        return <p>{record?.date?.slice(0, 10)}</p>;
      },
    },
    {
      title: "Total Diamond",
      dataIndex: "totalDiamond",
    },
    {
      title: "Total Weight",
      dataIndex: "totalWeight",
    },

    {
      title: "Action",
      key: "_id",
      align : "center",
      render: (text, record, index) => {
        return (
          <div className="d-flex justify-content-center">
            <EditIconButton 
              handleClick={() => {
                navigate(`/diamond/jangad/${record._id}`, { state: record });
              }}
            />
            <DeleteIconButton
              handleClick={() => handleDelete(record._id)}
              disabled={record.role === "SuperAdmin" ? true : loading}
            />
            <div>
              {
                <div className="w-full flex justify-center ">
                  <div className="print-only">
                    <div ref={(ref) => (billRef.current[index] = ref)}>
                      <BillTemplate data={record} />
                    </div>
                  </div>
                  <ReactToPrint
                    trigger={() => <Button className="border-0"><Print /></Button>}
                    content={() => billRef.current[index]}
                  />
                  <style>
                    {`
                        .print-only {
                        display :none;
                        }
                        @media print {
                        .print-only {
                        display : block;
                        }}
                    `}
                  </style>
                </div>
              }
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <MainTitle />
      <div className="semiTitle">Jangad List</div>
      <div className="d-flex justify-content-end mr-5">
        <Button onClick={() => navigate("/diamond/jangad")}>
          Add New Jangad
        </Button>
      </div>
      <div style={{ margin: "30px" }}>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default JangadList;
