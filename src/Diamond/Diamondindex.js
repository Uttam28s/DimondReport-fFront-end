import { Button, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react'
import Header from './Header';
import { getReport, getWorkerList, } from './ApiConn/Api'
import TableAll from './Table/TableAll';
import { findIndex } from 'lodash';
import moment from 'moment';

const DiamondIndex = () => {
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [tableShow, setTableShow] = useState(1)
    const [data, setData] = useState([])
    const [process, setProcess] = useState()
    let params = {}

    useEffect(() => {
        if (tableShow == 1) {
            params = { process: "taliya", from: "", to: "" }
            setProcess('taliya')
        }
        getReport(params).then(x => {
            const report = x.data.data
            getWorkerList().then(x => {
                let data = x.data.data
                for (let j = 0; j < report.length; j++) {
                    for (let i = 0; i < data.length; i++) {
                        if (report[j].workerid == data[i]._id) {
                            report[j].index = j + 1
                            report[j].name = data[i].name
                            report[j].date = (report[j].date).slice(0,10)
                        }       
                    }
                }
                setData(report)
            });
        });
    }, [])

    const handleReport = (params) => {
        getReport(params).then(x => {
            const report = x.data.data
            getWorkerList().then(x => {
                let data = x.data.data
                for (let j = 0; j < report.length; j++) {
                    for (let i = 0; i < data.length; i++) {
                        if (report[j].workerid == data[i]._id) {
                            report[j].index = j + 1
                            report[j].name = data[i].name
                            report[j].date = (report[j].date).slice(0,10)
                        }
                    }
                }
                setData(report)
            })
        });
    }
    
    const onClickHandle = (a) => {
        if (a == 1) {
            params = { process: "taliya" }
        } else if (a == 2) {
            params = { process: "mathala" }
        } else if (a == 3) {
            params = { process: "pel" }
        } else if (a == 4) {
            params = { process: "russian" }
        } else {
            params = { process: "table" }
        }
        params['from'] = ""
        params['to'] = ""
        setProcess(params['process'])
        handleReport(params)
        // getReport(params).then(x => {
        //     const report = x.data.data
        //     getWorkerList().then(x => {
        //         let data = x.data.data
        //         for (let j = 0; j < report.length; j++) {
        //             for (let i = 0; i < data.length; i++) {
        //                 if (report[j].workerid == data[i]._id) {
        //                     report[j].index = j + 1
        //                     report[j].name = data[i].name
        //                     report[j].date = (report[j].date).slice(0,10)
        //                 }
        //             }
        //         }
        //         setData(report)
        //     });
        // });
        setTableShow(a)
    }

    const list = [{ 'id': 1, 'type': 'Talyu' }, { 'id': 2, 'type': 'Mathalu' }, { 'id': 3, 'type': 'Pel' }, { 'id': 4, 'type': 'Russian' }, { 'id': 5, 'type': 'Table' }]
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
                                    <Button style={{ margin: "2px", width: "80px" }} onClick={() => { onClickHandle(ele.id) }}>{ele.type}</Button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="p-2 bd-highlight col-lg-4 col-sm-6">
                <DatePicker disabledDate={(current) => current.isAfter(moment())} onChange={(date, dateString) => { setStart(dateString) }} style={{ margin: "10px" }} />
                <DatePicker disabledDate={(current) => current.isAfter(moment())} onChange={(date, dateString) => {
                    setEnd(dateString)
                    let params = {
                        'from': start,
                        'to': dateString,
                        'process': process
                    }
                    handleReport(params)
                    
                }} style={{ margin: "10px" }} />
            </div>
            <Header />
            <div style={{ margin: "10px" }}>
                {(tableShow == 1) ? <TableAll data={data} title="Taliya Data" /> : ""}
                {(tableShow == 2) ? <TableAll data={data} title="Mathala Data" /> : ""}
                {(tableShow == 3) ? <TableAll data={data} title="Pel Data" /> : ""}
                {(tableShow == 4) ? <TableAll data={data} title="Russian Data" /> : ""}
                {(tableShow == 5) ? <TableAll data={data} title="Table Data" /> : ""}
                
            </div>

        </>
    );
}

export default DiamondIndex