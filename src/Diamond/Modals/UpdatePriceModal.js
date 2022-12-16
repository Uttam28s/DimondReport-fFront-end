import { Button, Input, notification, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { CloseOutlined } from '@mui/icons-material';
import Modal from 'react-bootstrap/Modal';
import { getPriceList, updatePrice } from '../ApiConn/Api';

export default function UpdatePriceModal(props) {
    const [patla, setPatla] = useState("")
    const [zada, setZada] = useState("")
    const [extraZada, setExtraZada] = useState("")
    const [process, setProcess] = useState("")
    const [loader, setLoader] = useState(false)
    const { Option } = Select;

    useEffect(() => {
    }, [extraZada])

    useEffect(() => {
        setPatla("")
        setZada("")
        setExtraZada("")
        setProcess("")
    }, [props.show])

    const handleChange = () => {
        let adminId = localStorage.getItem("AdminId")
        let params = [
            {
                "process": process,
                "subcategory": "patlaPrice",
                "price": patla,
                "adminId" : adminId
            },
            {
                "process": process,
                "subcategory": "jadaPrice",
                "price": zada,
                "adminId" : adminId
            },
            {
                "process": process,
                "subcategory": "extrajadaPrice",
                "price": extraZada,
                "adminId" : adminId
            }
        ]
        setLoader(true)
        updatePrice(params[0]).then(x => {
            updatePrice(params[1]).then(x => {
                updatePrice(params[2]).then(x => {
                    notification["success"]({
                        message: 'Price Updated Successfully',
                    })
                    setLoader(false)
                });
            });
        }).catch((err) => {
            notification["error"]({
                message: 'Something Went Wrong',
            })
        })
        setZada("")
        setExtraZada("")
        setPatla("")
        setProcess("")
        props.handleClosePrice()
    }

    const handleProcess = async (value) => {
        setProcess(value)
        await getPriceList(value).then((d) => {
            let da = d.data.pricelist
            setExtraZada(da['extrajadaPrice'])
            setZada(da['jadaPrice'])
            setPatla(da['patlaPrice'])
        })
    }
    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>Update Prices</Modal.Title>
                <div onClick={props.handleClosePrice}><CloseOutlined /></div>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            Process:
                        </div>
                        <div className="col-8">
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Select Process"
                                onChange={(value) => {
                                    handleProcess(value)
                                    }
                                }
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
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-4">
                            Patla:
                        </div>
                        <div className="col-8">
                            <Input  value={patla} onChange={(e) => setPatla(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-4">
                            Zada:
                        </div>
                        <div className="col-8">
                            <Input value={zada} onChange={(e) => setZada(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-4">
                            Extra Zada:
                        </div>
                        <div className="col-8">
                            <Input  value={extraZada} onChange={(e) => setExtraZada(e.target.value)} />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClosePrice}>
                    Close
                </Button>
                <Button variant="primary" disabled={process === "" || zada === "" || extraZada === "" || patla === ""} onClick={handleChange}>
                    Update {loader ? <> &nbsp; <Spin size="small"/></> : "" }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}