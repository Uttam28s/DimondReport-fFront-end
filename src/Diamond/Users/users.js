import styled from '@emotion/styled';
import { Button } from 'antd'
import React, { useState } from 'react'
import { MainTitle } from '../Common/common'
import AddNewUserModal from './AddNewUserModal';
import UserlistTable from './UserlistTable';

const AddNewUserBtnDiv = styled.div`
    text-align: end;
    margin: 10px;
` 
const Users = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
  return (
    <>
        <MainTitle />
        <AddNewUserBtnDiv>
            <Button onClick={handleShow}>Add New User</Button>
        </AddNewUserBtnDiv>
        <AddNewUserModal show={show} onHide={() => setShow(false)} handleClose={handleClose} />
        <UserlistTable />
    </>
  )
}

export default Users