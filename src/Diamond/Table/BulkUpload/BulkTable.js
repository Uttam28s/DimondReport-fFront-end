import { Button, Input, notification, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { addBulkReport, getWorkerListBulk } from '../../ApiConn/Api';

const BulkTable = (props) => {
    const [data, setData] = useState([])
    const [totalpcs, setTotalPcs] = useState(0)
    const columns = [
        {
            title: 'Index',
            dataIndex: 'index',
            key: 'index',
            width: 60,
            fixed: 'center'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'index',
            width: 100,
            fixed: 'center',
        },
        {
            title: 'Patla Pcs.',
            dataIndex: 'patla',
            key: 'index',
            width: 40,
            render: (text, record, index) => {
                return (
                    <Input  value={record.patla} onChange={(e) => {
                        onChangeHandler("patla", e.target.value, record.index)
                    }} />
                )
            }
        },
        {

            title: 'Jada Pcs.',
            dataIndex: 'jada',
            key: 'index',
            width: 40,
            render: (text, record, index) => {
                return (
                    <Input
                        value={record.jada}
                        onChange={(e) => {
                            console.log("------------------", record)
                            onChangeHandler("jada", e.target.value, record.index)
                        }} />
                )
            }
        },
        {
            title: 'Extra-Zada Pcs.',
            dataIndex: 'extraJada',
            key: 'index',
            width: 40,
            render: (text, record, index) => {
                return (
                    <Input value={record.extraJada} onChange={(e) => {
                        onChangeHandler("extraJada", e.target.value, record.index)
                    }} />
                )
            }
        },
        {
            title: 'Total Pcs.',
            dataIndex: 'total',
            key: 'index',
            width: 40,
            render: (text, record, index) => {
                return (
                    <span>{record.total}</span>
                )
            }
        },
    ];

    const onClickhandler = () => {
        console.log("Alll finnal data for ready to Upload", data)
        var today = new Date();
        let params = data.map((ele,index) =>{
            console.log("----------------",ele)
            ele.workerid = ele._id
            ele.process = props.process
            ele.date = today
        })
        addBulkReport(data,props.process).then((res) => {
            notification["success"]({
                message: res?.data?.message,
            })
        }
        )
    }

    useEffect(() => {
        getWorkerListBulk(props.process).then(x => {
            setData(x.data.data)
        });
    }, [])

    const onChangeHandler = (name, value, id) => {
        let newname = name
        data[id][newname] = value
        data[id]['total'] = Number(data[id]['extraJada']) + Number(data[id]['jada']) + Number(data[id]['patla'])
        setTotalPcs(data[id]['total'])
    }
    return (
        <>
            <Button style={{ float: "right", margin: "10px" }} onClick={onClickhandler}>Submit</Button>

            <div className='semiTitle'>{props.title}</div>
            <Table
                style={{ margin: "10px" }}
                columns={columns}
                dataSource={data}
                bordered
                size="middle"
            />
        </>
    )
}

export default BulkTable