import { DatePicker, notification, Select, Spin, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getEmployeeReport, getWorkerList } from '../ApiConn/Api';
import {MainTitle} from '../Common/common';
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
    {
        title: 'Patla',
        fixed: 'center',
        width: 130,
        children: [
            {
                title: 'Pcs.',
                dataIndex: 'patla',
                key: '_id',
                width: 40,
            },
        ],
    },
    {
        title: 'Zada',
        fixed: 'center',
        children: [
            {
                title: 'Pcs.',
                dataIndex: 'jada',
                key: '_id',
                width: 40,
            },
        ],
    },
    {
        title: 'Extra Zada',
        fixed: 'center',
        children: [
            {
                title: 'Pcs.',
                dataIndex: 'extraJada',
                key: '_id',
                width: 40,
            },
        ],
    },
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
];




const TableNew = (props) => {
    const { Option } = Select;
    const [data, setData] = useState([])
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [empList, setEmpList] = useState([])
    const [employee, setEmployee] = useState()
    const [totalSalary, setTotalSalary] = useState(0)
    const [patlaPcs, setPatlaPcs] = useState(0)
    const [extraJadaPcs, setExtraJadaPcs] = useState(0)
    const [zadaPcs, setZadaPcs] = useState(0)
    const [price, setPrice] = useState({
        zadaTotal: 0,
        patlaTotal: 0,
        extraZadaTotal: 0
    })
    const [loader,setLoader] = useState(false)
    useEffect(() => {
        let id = localStorage.getItem("AdminId")
        getWorkerList(id).then((x) => {
          setEmpList(x.data.data);
        });
    }, [])

    useEffect(() => {
        let salary = 0
        let patlaPcs = 0
        let zadaPcs = 0
        let extraJadaPcs = 0
        let pricePcs = {}
        data.map((ele) => {
            salary = salary + ele.dailywork
            patlaPcs = patlaPcs + ele.patla
            extraJadaPcs = extraJadaPcs + ele.extraJada
            zadaPcs = zadaPcs + ele.jada
            pricePcs = {
                zadaTotal: zadaPcs * ele.price[0].jadaPrice,
                patlaTotal: patlaPcs * ele.price[0].patlaPrice,
                extraZadaTotal: extraJadaPcs * ele.price[0].extrajadaPrice
            }
        })
        setTotalSalary(salary)
        setExtraJadaPcs(patlaPcs)
        setPatlaPcs(patlaPcs)
        setZadaPcs(zadaPcs)
        setPrice(price => ({
            ...price,
            ...pricePcs
        })
        )
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
                setData(report)
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
                columns={columns}
                dataSource={data}
                bordered
                size="middle"
            />
             <ComponentToPrint price={price} totalSalary={totalSalary} patlaPcs={patlaPcs} extraJadaPcs={extraJadaPcs} zadaPcs={zadaPcs} />
             {data.length > 0 && <PrintComponenEmployee EmployeeName={empList?.find(d => d._id === employee)?.name} price={price} totalSalary={totalSalary} patlaPcs={patlaPcs} extraJadaPcs={extraJadaPcs} zadaPcs={zadaPcs} from={start} to={end} />}
        </>

    )
};



export default TableNew;