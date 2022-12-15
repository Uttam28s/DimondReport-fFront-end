import { Button, DatePicker, notification, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import Header from './Header';
import { getReport, getWorkerList, } from './ApiConn/Api'
import TableAll from './Table/TableAll';
import moment from 'moment';
import styled from 'styled-components';


const Loader = styled.div`
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
`
const DiamondIndex = () => {
    const [start, setStart] = useState()
    const [tableShow, setTableShow] = useState(1)
    const [data, setData] = useState([])
    const [process, setProcess] = useState()
    const [loader, setLoader] = useState(true)
    let params = {}

    useEffect(() => {
        if (tableShow === 1) {
            params = { process: "taliya", from: "", to: "" }
            setProcess('taliya')
        }
        setLoader(true)
        
        getReport(params).then(x => {
            const report = x.data.data
            getWorkerList().then(x => {
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
                setLoader(false)

            });
        }).catch((err) => {
            notification["error"]({
                message: 'Something Went Wrong',
            })
        })

    }, [])

    const handleReport = (params) => {
        setLoader(true)
        getReport(params).then(x => {
            const report = x.data.data
            getWorkerList().then(x => {
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
                setLoader(false)
            })
        }).catch((err) => {
            notification["error"]({
                message: 'Something Went Wrong',
            })
        })
    }
    
    const onClickHandle = (a) => {
        if (a === 1) {
            params = { process: "taliya" }
        } else if (a === 2) {
            params = { process: "mathala" }
        } else if (a === 3) {
            params = { process: "pel" }
        } else if (a === 4) {
            params = { process: "russian" }
        } else {
            params = { process: "table" }
        }
        params['from'] = ""
        params['to'] = ""
        setProcess(params['process'])
        handleReport(params)
        setTableShow(a)
    }

    const list = [{ 'id': 1, 'type': 'Talyu','process':'taliya' }, { 'id': 2, 'type': 'Mathalu','process':'mathala' }, { 'id': 3, 'type': 'Pel','process':'pel' }, 
    { 'id': 4, 'type': 'Russian','process':'russian' }, { 'id': 5, 'type': 'Table','process':'table' }]
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <h4 style={{ margin: "10px" }}>Diamond</h4>
            </nav>
            <div style={{ margin: "10px", textAlign: "end" }}>
                <ul style={{ display: "inline-block" }} className="navbar-nav">
                    {
                        list.map((ele, index) => {
                            return (
                                <li key={index} style={{ display: "inline-block" }}>
                                    <Button style={{ margin: "2px", width: "80px" }} disabled={process===ele.process} onClick={() => { onClickHandle(ele.id) }}>{ele.type}</Button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="p-2 bd-highlight col-lg-4 col-sm-6">
                <DatePicker disabledDate={(current) => current.isAfter(moment())} onChange={(date, dateString) => { setStart(dateString) }} style={{ margin: "10px" }} />
                <DatePicker disabledDate={(current) => current.isAfter(moment())} onChange={(date, dateString) => {
                    let params = {
                        'from': start,
                        'to': dateString,
                        'process': process
                    }
                    handleReport(params)
                    
                }} style={{ margin: "10px" }} />
            </div>
            <Header />
            {loader ?
             <Loader > &nbsp; <Spin size="large"/></Loader>
            :
            <div style={{ margin: "10px" }}>
                {(tableShow === 1) ? <TableAll data={data} title="Taliya Data" /> : ""}
                {(tableShow === 2) ? <TableAll data={data} title="Mathala Data" /> : ""}
                {(tableShow === 3) ? <TableAll data={data} title="Pel Data" /> : ""}
                {(tableShow === 4) ? <TableAll data={data} title="Russian Data" /> : ""}
                {(tableShow === 5) ? <TableAll data={data} title="Table Data" /> : ""}
                
            </div>
            }

        </>
    );
}

export default DiamondIndex