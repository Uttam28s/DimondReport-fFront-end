import { Button, DatePicker, Input, notification, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { CloseOutlined } from '@mui/icons-material';
import Modal from 'react-bootstrap/Modal';
import { addReport, getWorkerList } from '../ApiConn/Api'
import moment from 'moment';
export default function AddDataModal(props) {
    const { Option } = Select;
    const [empName, setEmpName] = useState("")
    const [process, setProcess] = useState("")
    const [date, setDate] = useState();
    const [patla, setPatla] = useState("")
    const [zada, setZada] = useState("")
    const [extraZada, setExtraZada] = useState("")
    const [empList, setEmpList] = useState([])
    useEffect(() => {
        getWorkerList().then(x => {
            setEmpList(x.data.data)
        });
    }, [])

    useEffect(() => {
        setEmpName("")
        setProcess("")
        setDate("")
        setPatla("")
        setZada("")
        setExtraZada("")
    }, [props.show])

    const handleChange = () => {
        let params = {
            "workerid": empName,
            "process": process,
            "date": date,
            "patla": patla,
            "jada": zada,
            "extraJada": extraZada,
            "total": Number(patla) + Number(zada) + Number(extraZada),
        }

        addReport(params).then(
            notification["success"]({
                message: 'Report Added Successfully'
            })
        ).catch(() => {
            notification["error"]({
                message: 'Something Went Wrong'
            })
        })  
        // window.location.reload(false)

        props.handleCloseData()
    }

    const employeechange = (value) => {
        setEmpName(value)
        const result = empList.filter((emp) => {
            return emp._id == value;
        });
        setProcess(result[0].process)
    }
    return (
        <Modal show={props.show} handlecloseuppad={props.handlecloseData}>
            <Modal.Header>
                <Modal.Title>Add New Data</Modal.Title>
                <div onClick={props.handleCloseData}><CloseOutlined /></div>

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
                                    onChange={(value) => employeechange(value)}
                                    optionFilterProp="children"
                                >
                                    {empList.map((ele, index) => {
                                        return <Option key={index} value={ele._id}>{ele.name}</Option>
                                    })}
                                </Select>
                            </div>
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
                            Process Name:
                        </div>
                        <div className="col-6">
                            <Select
                                showSearch
                                style={{ width: '100%', margin: "3px" }}
                                placeholder="Select Process"
                                onChange={(value) => setProcess(value)}
                                value={process}
                                optionFilterProp="children"
                                filterOption={(input, option) => option.children.includes(input)}
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                <Option value="taliya">Taliya</Option>
                                <Option value="mathala">Mathala</Option>
                                <Option value="pel">Pel</Option>
                                <Option value="russian">Russian</Option>
                                <Option value="table">Table</Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <hr />

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            Diamond Quantity (size/type):
                        </div>
                    </div>
                </div>
                <hr />
                <div className="container">
                    <div style={{ fontSize: "12px" }}>
                        <div className='row '>
                            <div className='col-6'>  Patla : </div>
                            <div className='col-6'><Input type='number' onChange={(e) => setPatla(e.target.value)} /><br /></div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-6'>   Zada :</div>
                            <div className='col-6'><Input type='number' onChange={(e) => setZada(e.target.value)} /><br /></div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-6'>     Extra-Zada  :</div>
                            <div className='col-6'><Input type='number' onChange={(e) => setExtraZada(e.target.value)} /><br /></div>
                        </div>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseData}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleChange}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
