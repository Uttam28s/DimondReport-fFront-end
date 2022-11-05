import { Button, DatePicker, Input, notification, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { CloseOutlined } from '@mui/icons-material';
import Modal from 'react-bootstrap/Modal';
import { GetMonthReport, getWorkerList } from '../ApiConn/Api'
const MonthName = {
    1:'January',
   2: 'February',
    3:'March',
    4:'April',
    5:'May',
    6:'June',
    7:'July',
    8:'August',
    9:'September',
    10:'October',
    11:'November',
    12:'December',
}


export default function MonthReport(props) {
    const { Option } = Select;
    const [empName, setEmpName] = useState("")
    const [fromdate, setFromdate] = useState();
    const [toDate,setToDate] = useState("")
    const [month, setMonth] = useState('');
    const [report, setReport] = useState();
    console.log("🚀 ~ file: MonthleyReport.js ~ line 13 ~ MonthReport ~ report", report)


    const [empList,setEmpList] = useState([])

    useEffect(() => {
        getWorkerList().then(x => { 
            setEmpList(x.data.data)
            console.log("Inside the get WorkerList",x.data.data)
        });
    }, [])

    useEffect(()=>{
        setEmpName("")
        setFromdate("")
        setToDate("")
    },[props.show])
    
    const handleChange =async () => {
        console.log("Data Submitted")

        let params =  {
            // "from": fromdate, 
            // 'to':toDate,
            month:month,
            workerid:empName,

        }
        const result =   await GetMonthReport(params)
   
        result.status &&  setReport(result.data.data)

        props.handleCloseMonthReport()
    }

    const employeechange = (value) =>{
        setEmpName(value)
        console.log("emplist",empList)
        console.log("value isValid",value)
        const result = empList.filter((emp) => {
            return emp._id == value;
          });
    }
    return (
        <>
        <Modal show={props.show} handlecloseuppad={props.handleCloseMonthReport}>
            <Modal.Header>
                <Modal.Title>Add New Data</Modal.Title>
                <div onClick={props.handleCloseMonthReport}><CloseOutlined /></div>

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
                                Select Month :
                            </div>
                            <div className="col-6">
                                <Select
                                    showSearch
                                    style={{ width: '100%', margin: "3px" }}
                                    placeholder="slect month"
                                    onChange={(value) => setMonth(value)}
                                    optionFilterProp="children"
                                    // filterOption={(input, option) => option.children.includes(input)}
                                    // filterSort={(optionA, optionB) =>
                                    //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    // }
                                >
                                    {[1,2,3,4,5,6,7,8,9,10,11,12].map((ele,index) =>{
                                        return <Option key={index} value={index}>{MonthName[ele]}</Option>
                                    })}
                                </Select>
                            </div>
                        </div>
                    </div>

                {/* <div className="container">
                    <div className="row">
                        <div className="col-6">
                           To Date:
                        </div>
                        <div className="col-6">
                            <DatePicker style={{ width: '100%', margin: "3px" }} onChange={(date,dateString) => setFromdate(dateString) }/>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6">
                           From Date:
                        </div>
                        <div className="col-6">
                            <DatePicker style={{ width: '100%', margin: "3px" }} onChange={(date,dateString) => setToDate(dateString) }/>
                        </div>
                    </div>
                </div> */}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseMonthReport}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleChange}>
                    Report
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={report}>
        <Modal.Header>
                <Modal.Title>Monthley Report</Modal.Title>
                <div onClick={()=>setReport(false)}><CloseOutlined /></div>
            </Modal.Header>
            <Modal.Body>
                { report?.salary?.length ?  <div>
                  <div className='row'>  <div className='col-4'>Worker Name</div><div className='col-3'><h5>:{empList?.find(d=>d._id == report?.workerid)?.name}</h5></div></div>
                  <hr/>
                  <div className='row'>   <div className='col-4'>Salary</div></div>
                    <hr/>
                    {report?.salary?.map(data=>{
                    return (
                        // <div className='row'>
                        <> 
                                <div className='row'>  <div className='col-5'>Month</div><div className='col-7'>:{MonthName[data.month]}</div></div>
                                <div className='row'>    <div className='col-5'>Upad</div><div className='col-7'>:{data.upad}</div></div>
                                <div className='row'>    <div className='col-5'>This Month Earned</div><div className='col-7'>:{data.total}</div></div>
                              {data.jama ?  <div className='row'>    <div className='col-5'> Previous Month Jama</div><div className='col-7'>:{data.jama}</div></div>:''}

                                </>
                        // </div>
                        )
                    })}
                </div>:  <div className='text-center'>No Salary For This Month</div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>setReport(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

        </>
    )
}