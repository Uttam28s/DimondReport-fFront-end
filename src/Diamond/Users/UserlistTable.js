import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DeleteUser, getUsers, updateFlag } from "../ApiConn/Api";


const ButtonforchangeFlag = styled(Button)`
  color : red;
`
const handlePaidButton = async (_id,status) => {
  await updateFlag({ id : _id, status :status})
}
const UserlistTable = (props) => {
  const [data,setData] = useState([])

  const handleDelete = async (id) => {
    await DeleteUser(id)
  } 
  const columns = [
    {
        title: 'Index',
        dataIndex: 'index',
        key: '_id',
        width: '5%',
        fixed: 'center',
        render: (text, record, index) => {
            return index + 1
          },
      },
      {
        title: 'User',
        dataIndex: 'name',
        key: '_id',
        width: "12%",
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: '_id',
        width: "12%",
      },
      {
        title: 'Flag',
        dataIndex: 'flag',
        key: '_id',
        width: "10%",
        render: (text, record, index) => {
            return (
              record.flag === true ? 
              <ButtonforchangeFlag disabled={record.role ==="SuperAdmin"} onClick={() => handlePaidButton(record?._id,false)}>True</ButtonforchangeFlag>
              :<ButtonforchangeFlag disabled={record.role ==="SuperAdmin"} onClick={() => handlePaidButton(record?._id,true)}>False</ButtonforchangeFlag>
            );
          },
      },
      {
        title: 'Delete',
        dataIndex: 'flag',
        key: '_id',
        width: "10%",
        render: (text, record, index) => {
            return (
                <Button disabled={record.role ==="SuperAdmin"} type='button' onClick={() => handleDelete(record._id)} >Delete</Button>
            );
          },
      }
      
  ];

  useEffect(() => {
    getUsers().then((res) => {
      setData(res.data)
    })
  },[])
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
