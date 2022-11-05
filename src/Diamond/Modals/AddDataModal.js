import { Button, DatePicker, Input, notification, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { CloseOutlined } from '@mui/icons-material';
import Modal from 'react-bootstrap/Modal';
import { addReport, getWorkerList } from '../ApiConn/Api'
export default function AddDataModal(props) {
    const { Option } = Select;
    const [empName, setEmpName] = useState("")
    const [process,setProcess] = useState("")
    const [date, setDate] = useState();
    const [patla,setPatla] = useState("")
    const [zada,setZada] = useState("")
    const [extraZada,setExtraZada] = useState("")
    const [empList,setEmpList] = useState([])
    const [valid,isValid] = useState(false)
    useEffect(() => {
        getWorkerList().then(x => { 
            setEmpList(x.data.data)
            console.log("Inside the get WorkerList",x.data.data)
        });
    }, [])
    
    const handleChange = () => {
        console.log("Data Submitted")

        let params =  {
            "workerid": empName, 
            "process": process, 
            "date": date, 
            "patla": patla, 
            "jada": zada, 
            "extraJada": extraZada,
            "total": Number(patla)+Number(zada)+Number(extraZada),
            // "dailywork":10,
            // "price":[2,2,3]
        }

        addReport(params).then(
            notification["success"]({
                message: 'Report Added Successfully',
            })
        )
        props.handleCloseData()
    }

    const employeechange = (value) =>{
        setEmpName(value)
        console.log("emplist",empList)
        console.log("value isValid",value)
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
                                    // filterOption={(input, option) => option.children.includes(input)}
                                    // filterSort={(optionA, optionB) =>
                                    //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    // }
                                >
                                    {empList.map((ele,index) =>{
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
                            <DatePicker style={{ width: '100%', margin: "3px" }} onChange={(date,dateString) => setDate(dateString) }/>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            Process Name:
                        </div>
                        <div className="col-6">
                        <Input style={{ width: '100%', margin: "5px" }} disabled value={process} onChange={(e)=>setPatla(e.target.value)}/><br />

                            {/* <Select
                                showSearch
                                style={{ width: '100%', margin: "3px" }}
                                placeholder="Select Process"
                                onChange={(value) => setProcess(value)}
                                optionFilterProp="children"
                                filterOption={(input, option) => option.children.includes(input)}
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                <Option value="taliya">Taliya</Option>
                                <Option value="pel">Pel</Option>
                                <Option value="mathala">Mathala</Option>
                                <Option value="russian">Russian</Option>
                            </Select> */}
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            Type:
                        </div>
                        <div className="col-10">    
                            <div style={{ fontSize: "12px" }}>
                                Patla :<Input style={{ width: '50%', margin: "5px",marginLeft:"44px" }}  onChange={(e)=>setPatla(e.target.value)}/><br />
                                Zada : <Input style={{ width: '50%', margin: "5px",marginLeft:"44px" }}  onChange={(e)=>setZada(e.target.value)}/><br />
                                Extra-Zada : <Input style={{ width: '50%', margin: "5px" }}  onChange={(e)=>setExtraZada(e.target.value)} />
                            </div>
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