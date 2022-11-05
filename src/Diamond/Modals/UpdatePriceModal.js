import { Button, Input, notification, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { CloseOutlined } from '@mui/icons-material';
import Modal from 'react-bootstrap/Modal';
import { getPriceList, updatePrice } from '../ApiConn/Api';

export default function UpdatePriceModal(props) {
    const [patla, setPatla] = useState("")
    const [zada, setZada] = useState("")
    const [extraZada, setExtraZada] = useState("")
    const [process, setProcess] = useState("")
    const { Option } = Select;

    useEffect(() => {
        console.log("Updatae")
    }, [extraZada])

    const handleChange = () => {
        console.log("Data is :patla,zada and extraZada", patla, zada, extraZada, process)

        let params = [
            {
                "process": process,
                "subcategory": "patlaPrice",
                "price": patla
            },
            {
                "process": process,
                "subcategory": "jadaPrice",
                "price": zada
            },
            {
                "process": process,
                "subcategory": "extrajadaPrice",
                "price": extraZada
            }
        ]

        updatePrice(params[0]).then(x => {
            updatePrice(params[1]).then(x => {
                updatePrice(params[2]).then(x => {
                    console.log("x is ", x)
                    notification["success"]({
                        message: 'Price Updated Successfully',
                    })

                });
            });
        });
        setZada("")
        setExtraZada("")
        setPatla("")
        setProcess("")
        props.handleClosePrice()
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
                                style={{ width: '100%', margin: "3px" }}
                                placeholder="Select Process"
                                onChange={(value) => {
                                    setProcess(value)
                                    getPriceList().then((d) => {
                                        let da = d.data.data
                                        console.log("Da", da[value])
                                        setExtraZada(da[value]['extrajadaPrice'])
                                        setZada(da[value]['jadaPrice'])
                                        setPatla(da[value]['patlaPrice'])
                                    })
                                }
                                }
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
                                <Option value="table">Table</Option>

                            </Select>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            Patla:
                        </div>
                        <div className="col-8">
                            <Input style={{ width: '50%', margin: "3px" }} value={patla} onChange={(e) => setPatla(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            Zada:
                        </div>
                        <div className="col-8">
                            <Input style={{ width: '50%', margin: "3px" }} value={zada} onChange={(e) => setZada(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            Extra Zada:
                        </div>
                        <div className="col-8">
                            <Input style={{ width: '50%', margin: "3px" }} value={extraZada} onChange={(e) => setExtraZada(e.target.value)} />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClosePrice}>
                    Close
                </Button>
                <Button variant="primary" disabled={process == "" || zada == "" || extraZada == "" || patla == ""} onClick={handleChange}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    )
}