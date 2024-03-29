import { Button, DatePicker, notification, Select, Spin } from "antd";
import React, { useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import Modal from "react-bootstrap/Modal";
import { ChangePaidStatus, GetMonthReport } from "../ApiConn/Api";
import PrintComponent from "./PrintComponent";
import { useWorkerHook } from "../Hooks/getWorker";
import { MonthName } from "../Common/common";
import { useEffect } from "react";

export default function MonthReport(props) {
  const { Option } = Select;
  const [empName, setEmpName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [report, setReport] = useState();
  const [status, setStatus] = useState("pending");
  const [loader, setLoader] = useState(false);
  const { empList } = useWorkerHook();
  const [employeeList,setEmployeeList] = useState([])
  const handleChange = async () => {
    let params = {
      month: month,
      year: year,
      workerid: empName,
    };
    setLoader(true);
    await GetMonthReport(params)
      .then((res) => {
        notification["success"]({
          message: res?.data.message,
        });
        setStatus(res?.data?.data?.salary[0]?.status);
        res.status && setReport(res.data.data);
      })
      .catch((res) => {
        props.handleCloseMonthReport();
        notification["error"]({
          message: res?.response?.data?.message,
        });
      });
    setLoader(false);
  };

  useEffect(() => {
    if(empList?.length === 0){
      let list = localStorage.getItem("empList")
      setEmployeeList(JSON.parse(list))
    }else{
      setEmployeeList(empList)
    }
  },[empList])

  const handlePaidButton = async () => {
    let params = {
      month: month,
      workerid: empName,
    };
    // await ChangePaidStatus(params).then((res) => {
    //   notification["success"]({
    //     message: "Status Updated Successfully",
    //   });    
    //   setStatus('paid')
    // });
  };

  const employeechange = (value) => {
    setEmpName(value);
    employeeList?.filter((emp) => {
      return emp._id === value;
    });
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleCloseMonthReport}>
        <Modal.Header>
          <Modal.Title>Monthly Report</Modal.Title>
          <div onClick={props.handleCloseMonthReport}>
            <CloseOutlined />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="container">
              <div className="row">
                <div className="col-6">Select Employee :</div>
                <div className="col-6">
                  <Select
                    showSearch
                    className="w-100-m-3"
                    placeholder="Search Employee"
                    onChange={(value) => employeechange(value)}
                    optionFilterProp="children"
                  >
                    {employeeList?.map((ele, index) => {
                      return (
                        <Option key={index} value={ele._id}>
                          {ele.name}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div className="row">
                <div className="col-6">Select Month :</div>
                <div className="col-6">
                  <Select
                    showSearch
                    className="w-100-m-3"
                    placeholder="select month"
                    onChange={(value) => setMonth(value)}
                    optionFilterProp="children"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                      (ele, index) => {
                        return (
                          <Option key={index} value={index}>
                            {MonthName[ele]}
                          </Option>
                        );
                      }
                    )}
                  </Select>
                </div>
              </div>
              <div className="row">
              <div className="col-6">Select Year :</div>
              <div className="col-6">
                <DatePicker
                    className="w-100-m-3"
                  onChange={(date, dateString) => setYear(dateString)}
                  picker="year"
                />
              </div>
            </div>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseMonthReport}>
            Close
          </Button>
          <Button variant="primary" disabled={loader || year === "" || month === "" || empName === ""} onClick={handleChange}>
            Report{" "}
            {loader ? (
              <>
                {" "}
                &nbsp; <Spin size="small" />{" "}
              </>
            ) : (
              ""
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={report}>
        <Modal.Header>
          <Modal.Title>Monthly Report</Modal.Title>
          <Button style={{ border: "none" }} onClick={() => setReport(false)}>
            <CloseOutlined />
          </Button>
        </Modal.Header>
        <Modal.Body>
          {report?.salary?.length ? (
            <div>
              <div className="row">
                {" "}
                <div className="col-4">Worker Name</div>
                <div className="col-3">
                  <h5>
                    :{employeeList?.find((d) => d._id === report?.workerid)?.name}
                  </h5>
                </div>
              </div>
              <hr />
              <div className="row">
                {" "}
                <div className="col-4">Salary</div>
              </div>
              <hr />
              {report?.salary?.map((data) => {
                return (
                  <>
                    <div className="row">
                      {" "}
                      <div className="col-8">Month</div>
                      <div className="col-4">: {MonthName[data.month + 1]}</div>
                    </div>
                    <div className="row">
                      {" "}
                      <div className="col-8">Upad</div>
                      <div className="col-4">: {data.upad || 0}</div>
                    </div>
                    <div className="row">
                      {" "}
                      <div className="col-8">This Month Earned</div>
                      <div className="col-4">: {data.total}</div>
                    </div>
                    {data.jama ? (
                      <div className="row">
                        {" "}
                        <div className="col-8"> Previous Month Jama</div>
                        <div className="col-4">: {data.jama}</div>
                      </div>
                    ) : (
                      ""
                    )}
                    {status === "paid" ? (
                      ""
                    ) : (
                      <Button
                        style={{ margin: "5px" }}
                        variant="secondary"
                        onClick={() => handlePaidButton("paid")}
                      >
                        Paid
                      </Button>
                    )}
                    <PrintComponent
                      report={data}
                      EmployeeName={
                        employeeList?.find((d) => d._id === report?.workerid)?.name
                      }
                    />
                  </>
                );
              })}
            </div>
          ) : (
            <div className="text-center">No Salary For This Month</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setReport(false)}>
            Close
          </Button>
        </Modal.Footer>
        <div></div>
      </Modal>
    </>
  );
}
