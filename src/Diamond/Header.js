import React, { useState } from 'react'
import 'antd/dist/antd.css';
import AddEmpModal from './Modals/AddEmpModal';
import AddDataModal from './Modals/AddDataModal';
import UpdatePriceModal from './Modals/UpdatePriceModal';
import AddUppadModal from './Modals/AddUppadModal';
import { useNavigate } from "react-router-dom";
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
    const handleCloseUppad = () => setUppadUpd(false);

    const handleBulkUpload = () => {
        navigate("./bulkUpload")
    }

    return (
        <div>
            <div className=" p-2 bd-highlight" style={{ textAlign: "end" }} >
                <button type="button" className="btn btn-secondary funcbtn" onClick={handleShow}>Add Worker</button>
                <button type="button" className="btn btn-secondary funcbtn" onClick={handleShowAdd}>Add Report</button>
                <button type="button" className="btn btn-secondary funcbtn" onClick={handleShowPrice}>Update Price</button>
                <button type="button" className="btn btn-secondary funcbtn" onClick={handleShowUppad}>Uppad</button>
                <button type="button" className="btn btn-secondary funcbtn" onClick={handleBulkUpload}>Bulk Upload</button>
            </div>

            <AddEmpModal show={show} onHide={() => setShow(false)} handleClose={handleClose} />
            <AddDataModal show={dataAdd} onHide={() => setDataAdd(false)} handleCloseData={handleCloseData} />
            <UpdatePriceModal show={showPrice} onHide={() => setPriceUpd(false)} handleClosePrice={handleClosePrice} />
            <AddUppadModal show={showUppad} onHide={() => setUppadUpd(false)} handleCloseUppad={handleCloseUppad} />
            
        </div>
    )
}

export default Header;