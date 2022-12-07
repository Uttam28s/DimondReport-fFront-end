import { Button, DatePicker, InputNumber, notification, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { CloseOutlined } from '@mui/icons-material';
import { addUppad, getWorkerList } from '../ApiConn/Api'
import moment from 'moment';

export default function AddUppadModal(props) {
    const { Option } = Select;
    const [empName, setEmpName] = useState("")
    const [date, setDate] = useState("");
    const [ammount, setAmmount] = useState("");
    const [empList, setEmpList] = useState([])

    useEffect(() => {
        getWorkerList().then(x => {
            setEmpList(x.data.data)
        });

    }, [])

    
    useEffect(() => {
        setDate("")
        setAmmount("")
        setEmpName("")
    }, [props.show])

    const handleSubmit = () => {
        addUppad(empName, ammount, date).then((res) => {
            if(res?.data?.error){
                notification["error"]({
                    message: res?.data?.error,
                })
            }else{
                notification["success"]({
                    message: 'Uppad Added Successfully',
                })
            }
        }
        )
        props.handleCloseUppad ()
    }

    return (
        <Modal show={props.show} > 
            <Modal.Header>
                <Modal.Title>Uppads</Modal.Title>
                <div onClick={props.handleCloseUppad}><CloseOutlined /></div>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                Select Employee :
                            </div>
                            <div className="col-6">
                                <Select
                                    showSearch
                                    style={{ width: '100%', margin: "3px" }}
                                    placeholder="Search Employee"
                                    onChange={(value) => setEmpName(value)}
                                    optionFilterProp="children"
                                    // filterOption={(input, option) => option.children.includes(input)}
                                    // filterSort={(optionA, optionB) =>
                                    //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    // }
                                >
                                    {empList.map((ele, index) => {
                                        return <Option key={index} value={ele._id}>{ele.name}</Option>
                                    })}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                Date:
                            </div>
                            <div className="col-6">
                                <DatePicker style={{ width: '100%', margin: "3px" }} disabledDate={(current) => current.isAfter(moment())} onChange={(date, dateString) => setDate(dateString)} />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                Amount:
                            </div>
                            <div className="col-6">
                                <InputNumber style={{ width: '100%', margin: "3px" }} onChange={(value) => setAmmount(value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseUppad}>
                    Close
                </Button>
                <Button variant="primary" disabled={empName == "" || date == "" || ammount == ""} onClick={handleSubmit}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    )
}