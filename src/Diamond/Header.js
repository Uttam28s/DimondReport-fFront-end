import React, { useState } from "react";
import "antd/dist/antd.min.css";
import AddEmpModal from "./Modals/AddEmpModal";
import AddDataModal from "./Modals/AddDataModal";
import UpdatePriceModal from "./Modals/UpdatePriceModal";
import AddUppadModal from "./Modals/AddUppadModal";
import MonthReport from "./Modals/MonthleyReport";
import { useNavigate } from "react-router-dom";
// import AddType from "./Modals/AddType";
import { SecondaryButton } from "./Common/button";

const Header = (props) => {
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

  const [showMonth, setshowMonth] = useState(false);
  const handleMonthReport = () => setshowMonth(true);
  const handleCloseMonthReport = () => setshowMonth(false);

  // const [showType, setShowType] = useState(false);
  // const handleAddType = () => setShowType(true);
  // const handleCloseAddType = () => setShowType(false);

  const handleBulkUpload = () => {
    navigate("./bulkUpload");
  };

  return (
    <div>
      <div className=" p-2 bd-highlight" style={{ textAlign: "end" }}>
        {/* <SecondaryButton onClick={handleAddType} title="Add Type" /> */}
        <SecondaryButton onClick={handleShowPrice} title="Update Price" />
        <SecondaryButton onClick={handleShowAdd} title="Add Data" />
        <SecondaryButton onClick={handleBulkUpload} title="Bulk Upload" />
        <SecondaryButton onClick={handleShowUppad} title="Uppad" />
        <SecondaryButton onClick={handleMonthReport} title="Month Report" />
        <SecondaryButton
          onClick={() => {
            navigate("./empReport");
          }}
          title="Emp. Record"
        />
        <SecondaryButton
          onClick={() => {
            navigate("./monthwisereport");
          }}
          title="Month's Total"
        />
        <SecondaryButton onClick={handleShow} title="Add Worker" />
        {localStorage.getItem("role") === "SuperAdmin" ? (
          <SecondaryButton
            onClick={() => {
              navigate("./user");
            }}
            title="Users"
          />
        ) : (
          ""
        )}
          <SecondaryButton
          onClick={() => {
            navigate("./worker");
          }}
          title="Worker List"
        />
      </div>
      <AddEmpModal
        show={show}
        onHide={() => setShow(false)}
        handleClose={handleClose}
      />
      {dataAdd && (
        <AddDataModal
          show={dataAdd}
          onDataSubmit={props.onDataSubmit}
          onHide={() => setDataAdd(false)}
          handleCloseData={handleCloseData}
        />
      )}
      {showPrice && (
        <UpdatePriceModal
          show={showPrice}
          onHide={() => setPriceUpd(false)}
          handleClosePrice={handleClosePrice}
        />
      )}
      {showUppad && (
        <AddUppadModal
          show={showUppad}
          onHide={() => setUppadUpd(false)}
          handleCloseUppad={handleCloseUppad}
        />
      )}
      {showMonth && (
        <MonthReport
          show={showMonth}
          onHide={() => setshowMonth(false)}
          handleCloseMonthReport={handleCloseMonthReport}
        />
      )}
      {/* {showType && (
        <AddType
          show={showType}
          onHide={() => setShowType(false)}
          handleCloseAddType={handleCloseAddType}
        />
      )} */}
    </div>
  );
};

export default Header;
