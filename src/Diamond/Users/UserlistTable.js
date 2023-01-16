import { Button, notification, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DeleteUser, getUsers, LoginConfirm, updateFlag } from "../ApiConn/Api";

const ButtonforchangeFlag = styled(Button)`
  color: red;
`;
const UserlistTable = (props) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const handlePaidButton = async (_id, status) => {
    if (window.confirm("Are You sure want to change the status")) {
      await updateFlag({ id: _id, status: status }).then((res) => {
        setReload(!reload);
      });
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are You sure want to Delete the User")) {
      await DeleteUser(id).then((res) => {
        setReload(!reload);
      });
    }
  };

  const handleLogIn = async (name, password) => {
    setLoader(true);
    await LoginConfirm({ password: password, name: name })
      .then((res) => {
        localStorage.setItem("authLogin", true);
        localStorage.setItem("role", res?.data?.role);
        localStorage.setItem("AdminId", res?.data?._id);
        notification["success"]({
          message: res?.message,
        });

        // props.setAuthLogin(true);
        let role = localStorage.getItem("role");
        if (role === "SuperAdmin") {
          navigate("/diamond/user");
        } else {
          navigate("/diamond");
        }
        setLoader(false);
      })
      .catch((e) => {
        console.log("🚀 ~ file: UserlistTable.js:51 ~ handleLogIn ~ e", e)
        notification["error"]({
          message: e?.response?.data?.message,
        });
        setLoader(false);
      });
  };
  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "_id",
      width: "5%",
      fixed: "center",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "User",
      dataIndex: "name",
      key: "_id",
      width: "12%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "_id",
      width: "12%",
    },
    {
      title: "Flag",
      dataIndex: "flag",
      key: "_id",
      width: "10%",
      render: (text, record, index) => {
        return record.flag === true ? (
          <ButtonforchangeFlag
            disabled={record.role === "SuperAdmin"}
            onClick={() => handlePaidButton(record?._id, false)}
          >
            True
          </ButtonforchangeFlag>
        ) : (
          <ButtonforchangeFlag
            disabled={record.role === "SuperAdmin"}
            onClick={() => handlePaidButton(record?._id, true)}
          >
            False
          </ButtonforchangeFlag>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "flag",
      key: "_id",
      width: "10%",
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
    {
      title: "LogIn",
      dataIndex: "flag",
      key: "_id",
      width: "10%",
      render: (text, record, index) => {
        return (
          <Button
            disabled={record.role === "SuperAdmin"}
            type="button"
            onClick={() => handleLogIn(record.name,record.password)}
          >
            LogIn
            {loader ? (
              <>
                &nbsp;
                <Spin size="small" />{" "}
              </>
            ) : (
              ""
            )}
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    getUsers().then((res) => {
      setData(res.data);
    });
  }, [props.reFetch, reload]);
  return (
    <>
      <div className="semiTitle">Users List</div>
      <Table
        style={{ margin: "10px" }}
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
        pagination={false}
      />
    </>
  );
};

export default UserlistTable;
