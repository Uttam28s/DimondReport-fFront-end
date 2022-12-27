import styled from "@emotion/styled";
import { Button } from "antd";
import React, { useState } from "react";
import { MainTitle } from "../Common/common";
import AddNewUserModal from "./AddNewUserModal";
import UserlistTable from "./UserlistTable";

const AddNewUserBtnDiv = styled.div`
  text-align: end;
  margin: 10px;
`;
const Users = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <MainTitle hidden={true} />
      <AddNewUserBtnDiv>
        <Button onClick={() => setShow(true)}>Add New User</Button>
      </AddNewUserBtnDiv>
      {show && <AddNewUserModal show={show} setShow={setShow} />}
      <UserlistTable reFetch={show} />
    </>
  );
};

export default Users;
