import { Button,Input,Spin } from 'antd';
import React, { useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import { CloseOutlined } from '@mui/icons-material';
import { AddUser } from '../ApiConn/Api';

export default function AddNewUserModal(props) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("")
    const [loader,setLoader] = useState(false)
    const handleOnSubmit = async () => {
        let data = {
            name : name,
            password : password,
        }
        setLoader(true)
        await AddUser(data)
        setLoader(false)

    }
    return (
        <Modal show={props.show} handleclose={props.handleclose}>
            <Modal.Header >
                <Modal.Title>Add New User</Modal.Title>
                <div onClick={props.handleClose}><CloseOutlined /></div>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <span style={{ margin: "2px" }}>Name</span>
                        </div>
                        <div className="col-8">
                            <Input required onChange={(e) => setName(e.target.value)} style={{ width: '60%', margin: '2px' }} />                        
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <span style={{ margin: "2px" }}>Password</span>
                        </div>
                        <div className="col-8">
                            <Input type='password' required onChange={(e) => setPassword(e.target.value)} style={{ width: '60%', margin: '2px' }} />                        
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleOnSubmit} >
                    Add 
                    {loader ? <> &nbsp; <Spin size="small"/> </> : "" }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}