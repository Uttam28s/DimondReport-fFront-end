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
import { Dropdown, Space } from "antd";

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
    navigate("/diamond/bulkUpload");
  };

  const items = [
    {
      key: "1",
      label: <div className="dropdown_subtitle" onClick={() => handleShow()}>Add Worker</div>,
    },
    {
      key: "2",
      label: (
        <div
        className="dropdown_subtitle"
          onClick={() =>
            localStorage.getItem("role") === "SuperAdmin"
              ? navigate("/diamond/user")
              : navigate("/diamond/worker")
          }
        >
          WorkerList
        </div>
      ),
    },
  ];

  const items1 = [
    {
      key: "1",
      label: (
        <div
          className="border-0 dropdown_subtitle"
          onClick={() => navigate("/diamond/empReport")}
        >
          Employee Report
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="border-0 dropdown_subtitle"
          onClick={() => navigate("/diamond/monthwisereport")}
        >
          Month Report
        </div>
      ),
    },
  ];

  const items2 = [
    {
      key: "1",
      label: (
        <div className="border-0 dropdown_subtitle" onClick={() => handleShowUppad()}>
          Add Uppad
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="border-0 dropdown_subtitle"
          onClick={() => navigate("/diamond/uppadDetails")}
        >
          Uppad Details
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="border-0 dropdown_subtitle" onClick={() => handleShowPrice()}>
          Update Price
        </div>
      ),
    },
  ];

  const items3 = [
    {
      key: "1",
      label: (
        <div
          className="border-0 dropdown_subtitle"
          onClick={() => navigate("/diamond/jangadList")}
        >
          Jangad List
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="border-0 dropdown_subtitle" onClick={() => navigate("/diamond/jangad")}>
          Add Jangad
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="  bd-highlight d-flex align-items-center" style={{ textAlign: "end" }}>
        <SecondaryButton onClick={() => navigate('/diamond')} title="Work Data" />
        <SecondaryButton onClick={handleShowAdd} title="Add Data" />
        <SecondaryButton onClick={handleBulkUpload} title="Bulk Upload" />
        <div className="mx-3">
          <Space direction="horizontal">
            <Space wrap>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottom"
              >
                <div   className={`dropdown_button`}>Worker</div>
              </Dropdown>
            </Space>
            <Space wrap>
              <Dropdown
                menu={{
                  items: items1,
                }}
                placement="bottom"
              >
                <div   className={`dropdown_button`}>Report</div>
              </Dropdown>
            </Space>
            <Space wrap>
              <Dropdown
                menu={{
                  items: items3,
                }}
                placement="bottom"
              >
                <div   className={`dropdown_button`}>Jangad</div>
              </Dropdown>
            </Space>
            <Space wrap>
              <Dropdown
                menu={{
                  items: items2,
                }}
                placement="bottom"
              >
                <div   className={`dropdown_button`}>Salary</div>
              </Dropdown>
            </Space>
          </Space>
        </div>
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
    </div>
  );
};

export default Header;
