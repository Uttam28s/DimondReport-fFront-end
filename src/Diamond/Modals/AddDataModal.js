import { Button, DatePicker, Input, notification, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { CloseOutlined } from '@mui/icons-material';
import Modal from 'react-bootstrap/Modal';
import { addReport } from '../ApiConn/Api'
import moment from 'moment';
import { useDiamondTypeHook } from '../Hooks/getDiamondType';
import { useWorkerHook } from '../Hooks/getWorker';
export default function AddDataModal(props) {
    const { Option } = Select;
    const [empName, setEmpName] = useState("")
    const [process, setProcess] = useState("")
    const [date, setDate] = useState();
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState({})
    const { diamondTypeList } = useDiamondTypeHook();
    const { empList } = useWorkerHook(); 

    const setProcessId = [{ process: "taliya",id:1 },{ process: "mathala",id:2 } ,{ process: "pel",id:3 },{ process: "russian",id:4 },{ process: "table",id:5 }]

    useEffect(() => {
        setEmpName("")
        setProcess("")
        setDate("")
        setData({})
    }, [props.show])

    const handleChange = async () => {
        let total = 0
        Object.keys(data).map((ele) => {
            total = total + Number(data[ele])
        })
        let params = {
            "workerid": empName,
            "adminId" : localStorage.getItem("AdminId"),
            "process": process,
            "date": date,
            "total": total,
        }
        setLoader(true)
        await addReport(params,data).then(
            notification["success"]({
                message: 'Report Added Successfully'
            })
        ).catch(() => {
            notification["error"]({
                message: 'Something Went Wrong'
            })
        })  
        localStorage.setItem("process",params['process'])
        props.onDataSubmit()
        let id = 0
        setProcessId.map((ele) => {
            if(ele.process === params['process']){
                id = ele.id
            }
        })
        props.onDataSubmit(id)
        setLoader(false)
        props.handleCloseData()
    }

    const employeechange = (value) => {
        setEmpName(value)
        const result = empList?.filter((emp) => {
            return emp._id === value;
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
                                    {empList?.map((ele, index) => {
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
                        {
                            diamondTypeList?.map((ele) => {
                                return (
                                    <div className='row mt-3'>
                                        <div className='col-6'>  {ele} : </div>
                                        <div className='col-6'><Input type='number' onChange={(e) => setData({...data,[ele]: e.target.value})} /><br /></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseData}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleChange}>
                    Add {loader ? <> &nbsp; <Spin size="small"/></> : "" }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
