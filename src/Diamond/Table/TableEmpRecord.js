import { DatePicker, notification, Select, Spin, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getEmployeeReport, getWorkerList } from '../ApiConn/Api';
import {MainTitle} from '../Common/common';
import { useDiamondTypeHook } from '../Hooks/getDiamondType';
import PrintComponenEmployee, { ComponentToPrint } from './EmpReportPrint';

const columns = [
    {
        title: 'Index',
        dataIndex: 'index',
        key: '_id',
        width: 60,
        fixed: 'center'
    },
    {
        title: 'Date',
        dataIndex: 'date',
        width: 60,
    },  
    {
        title: 'Name',
        dataIndex: 'name',
        key: '_id',
        width: 100,
        fixed: 'center',
    },
];

const total = [
    {
        title: 'Total Pcs.',
        dataIndex: 'total',
        key: '_id',
        width: 40,
    },
    {
        title: 'Total Work',
        dataIndex: 'dailywork',
        key: '_id',
        width: 40,
    },
]



const TableEmpRecord = (props) => {
    const { Option } = Select;
    const [data, setData] = useState([])
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [empList, setEmpList] = useState([])
    const [employee, setEmployee] = useState()
    const [totalSalary, setTotalSalary] = useState(0)
    const [column, setColumns] = useState(0)
    const [totalPcs, setTotalPcs] = useState({})
    const [price, setPrice] = useState({})
    const [loader,setLoader] = useState(false)
    const { diamondTypeList } = useDiamondTypeHook();

    useEffect(() => {
        let id = localStorage.getItem("AdminId")
        getWorkerList(id).then((x) => {
          setEmpList(x.data.data);
        });
    }, [])

    useEffect(() => {
        let arr = []
        diamondTypeList.map((ele) => {
            arr.push(
                {
                    title: ele,
                    fixed: 'center',
                    width: 130,
                    children: [
                        {
                            title: 'Pcs.',
                            dataIndex: `${ele}`,
                            key: '_id',
                            width: 40,
                        },
                    ],
                }
            )
        })
        setColumns(columns.concat(arr,total))
    },[diamondTypeList])

    useEffect(() => {
        let salary = 0
        let obj = {}
        diamondTypeList.map((ele) => {
            obj[`${ele}pcs`] = 0
        })
        let pricePcs = {}
        diamondTypeList.map((type) => {
            data.map((ele) => {
                obj[`${type}pcs`] = obj[`${type}pcs`] + Number(ele.pcs[type])
            })
        })
        console.log("🚀 ~ file: TableEmpRecord.js:102 ~ data.map ~ obj", obj)
        diamondTypeList.map((ele) => {
            pricePcs[`${ele}Price`] = 0
        })
        diamondTypeList.map((type) => {
            data.map((ele) => {
                pricePcs[`${type}Price`] = pricePcs[`${type}Price`] + ele[type] * ele[`${type}Price`]  
            })
        })
        data.map((ele) => {
            salary = salary + ele.dailywork
        })
        setTotalSalary(salary)
        setTotalPcs(obj)
        setPrice(pricePcs)
    }, [data])

    const getData = (params) => {
        if(!params.emp_id || !params.from || !params.to){
            notification["error"]({
                message: 'Please Select Employee,From Date,To Date First',
            })
            return
        }
        setLoader(true)
        getEmployeeReport(params).then(x => {
            const report = x.data
            if(report.length === 0){
                notification["error"]({
                    message: 'No Data Found',
                })
            }
            let id = localStorage.getItem("AdminId")
            getWorkerList(id).then(x => {
                let data = x.data.data
                for (let j = 0; j < report.length; j++) {
                    for (let i = 0; i < data.length; i++) {
                        if (report[j].workerid === data[i]._id) {
                            report[j].index = j + 1
                            report[j].name = data[i].name
                            report[j].date = (report[j].date).slice(0,10)
                        }
                    }
                }
                console.log("🚀 ~ file: TableEmpRecord.js:149 ~ getWorkerList ~ report", report)
                let pcs = {}
                let price= {}
                let arr =[]
                report.map((ele) => {
                    Object.keys(ele.pcs).map((i) => {
                        pcs[i] = ele.pcs[i]
                        ele[i] = ele.pcs[i]
                    })
                    Object.keys(ele.price).map((i) => {
                        price[i] = ele.price[i]
                    })
                    let obj = {
                        ...ele,
                        ...pcs,
                        ...price
                    }
                    arr.push(obj)
                })
                setData(arr);
                // setData(report)
            });
        });
        setLoader(false)

    }

    return (
        <>
            <MainTitle />
            <div className='semiTitle'>Emp Record</div>
            <div className="p-2 bd-highlight" style={{ display: "flex" }}>
                <DatePicker disabledDate={(current) => current.isAfter(moment())} onChange={(date, dateString) => { setStart(dateString) }} style={{ margin: "10px" }} />
                <DatePicker disabledDate={(current) => current.isAfter(moment())} onChange={(date, dateString) => {
                    setEnd(dateString)
                }} style={{ margin: "10px" }} />

                <Select
                    showSearch
                    style={{ marginTop: "10px", height: "20%", paddingTop: "5px"}}
                    placeholder="Search Employee"
                    onChange={(value) => setEmployee(value)}
                    optionFilterProp="children"
                >
                    {empList.map((ele, index) => {
                        return <Option key={index} value={ele._id}>{ele.name}</Option>
                    })}
                </Select>

                <button type="button" className="btn btn-secondary funcbtn" onClick={() => getData({
                    from: start,
                    to: end,
                    emp_id: employee
                })}>search {loader ? <> &nbsp; <Spin size="small" color='white' /> </> : "" }</button>
            </div>

            <Table
                columns={column}
                dataSource={data}
                bordered
                size="middle"
            />
             <ComponentToPrint diamondTypeList={diamondTypeList} price={price} totalSalary={totalSalary} totalPcs={totalPcs} />
             {data.length > 0 && <PrintComponenEmployee diamondTypeList={diamondTypeList} totalPcs={totalPcs} EmployeeName={empList?.find(d => d._id === employee)?.name} price={price} totalSalary={totalSalary} from={start} to={end} />}
        </>

    )
};



export default TableEmpRecord;