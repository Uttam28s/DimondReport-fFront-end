import React, { useState } from 'react'
import 'antd/dist/antd.min.css';
import AddEmpModal from './Modals/AddEmpModal';
import AddDataModal from './Modals/AddDataModal';
import UpdatePriceModal from './Modals/UpdatePriceModal';
import AddUppadModal from './Modals/AddUppadModal';
import MonthReport from './Modals/MonthleyReport';
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import AddType from './Modals/AddType';

const Button = styled.button`
    width: fit-content;
`
const Header = () => {
    let navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [dataAdd, setDataAdd] = useState(false);
    const handleShowAdd = () => setDataAdd(true);
    const handleCloseData = () => setDataAdd(false);

    const [showPrice, setPriceUpd] = useState(false);
    const handleShowPrice = () => setPriceUpd(true);
    const handleClosePrice = () => setPriceUpd(false);

    const [showUppad, setUppadUpd] = useState(false);
    const handleShowUppad = () => setUppadUpd(true);
    const handleCloseUppad  = () => setUppadUpd(false);

    const [showMonth, setshowMonth] = useState(false);
    const handleMonthReport = () => setshowMonth(true);
    const handleCloseMonthReport  = () => setshowMonth(false);

    const [showType, setShowType] = useState(false);
    const handleAddType = () => setShowType(true);
    const handleCloseAddType  = () => setShowType(false);

    const handleBulkUpload = () => {
        navigate("./bulkUpload")
    }

    return (
        <div>
            <div className=" p-2 bd-highlight" style={{ textAlign: "end" }} >
                <Button type="button" className="btn btn-secondary funcbtn" onClick={handleShow}>Add Worker</Button>
                <Button type="button" className="btn btn-secondary funcbtn" onClick={handleShowAdd}>Add Data</Button>
                <Button type="button" className="btn btn-secondary funcbtn" onClick={handleShowPrice}>Update Price</Button>
                <Button type="button" className="btn btn-secondary funcbtn" onClick={handleShowUppad}>Uppad</Button>
                <Button type="button" className="btn btn-secondary funcbtn" onClick={handleMonthReport}>Month Report</Button>
                <Button type="button" className="btn btn-secondary funcbtn" onClick={handleBulkUpload}>Bulk Upload</Button>
                <Button type="button" className="btn btn-secondary funcbtn" onClick={() => {navigate("./empReport")}}>Emp. Record</Button>
                <Button type="button" className="btn btn-secondary funcbtn" onClick={() => {navigate("./monthwisereport")}}>Last Month Report</Button>
                <Button type="button" className="btn btn-secondary funcbtn" onClick={handleAddType}>Add type</Button>

                { (localStorage.getItem("role") === "SuperAdmin") ? <Button type="button" className="btn btn-secondary funcbtn" onClick={() => {navigate("./user")}}>Users</Button>: ""}
            </div>
            <AddEmpModal show={show} onHide={() => setShow(false)} handleClose={handleClose} />
            <AddDataModal show={dataAdd} onHide={() => setDataAdd(false)} handleCloseData={handleCloseData} />
            <UpdatePriceModal show={showPrice} onHide={() => setPriceUpd(false)} handleClosePrice={handleClosePrice} />
            <AddUppadModal show={showUppad} onHide={() => setUppadUpd(false)} handleCloseUppad ={handleCloseUppad } />
            <MonthReport show={showMonth} onHide={() => setshowMonth(false)} handleCloseMonthReport ={handleCloseMonthReport } />
            <AddType show={showType} onHide={() => setShowType(false)} handleCloseAddType ={handleCloseAddType } />

        </div>
    )
}

export default Header;