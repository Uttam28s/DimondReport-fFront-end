import { Button,Input,notification,Spin } from 'antd';
import React, { useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import { CloseOutlined } from '@mui/icons-material';
import { AddUser } from '../ApiConn/Api';

export default function AddNewUserModal(props) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("")
    const [loader,setLoader] = useState(false)
    const [error, setError] = useState({})

    const validate = () => {
        let temp ={}
        if(name === ""){
            temp['name'] = "Name not should be Empty"
        }
        if(password === "" || password.length < 8){
            temp['password'] = "Password must be 8 character long"
        }
        setError(temp)
        if(Object.keys(temp).length === 0){
            return true
        } 
        return false
    }
    const handleOnSubmit = async () => {
        let isValid = validate()
        if(isValid){
            let data = {
                name : name,
                password : password,
            }
            setLoader(true)
            await AddUser(data).then((res) => {
                notification["success"]({
                    message : "User Created Successfully"
                })
            })
            setLoader(false)
            props.setShow(false)
            setError({})
        }
    }
    return (
        <Modal show={props.show} handleclose={props.handleclose}>
            <Modal.Header >
                <Modal.Title>Add New User</Modal.Title>
                <div onClick={() => props.setShow(false)}><CloseOutlined /></div>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <span style={{ margin: "2px" }}>Name</span>
                        </div>
                        <div className="col-8">
                            <Input required onChange={(e) => setName(e.target.value)} style={{ width: '60%', margin: '2px' }} />
                            <p style={{ color:'red', fontSize:"13px"}}>{error?.name}</p>                        
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
                            <p style={{ color:'red', fontSize:"13px"}}>{error?.password}</p>                        
                       </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setShow(false)}>
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