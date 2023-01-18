import {
  Button,
  DatePicker,
  InputNumber,
  notification,
  Select,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { CloseOutlined } from "@mui/icons-material";
import { addUppad } from "../ApiConn/Api";
import moment from "moment";
import { useWorkerHook } from "../Hooks/getWorker";

export default function AddUppadModal(props) {
  const { Option } = Select;
  const [empName, setEmpName] = useState("");
  const [date, setDate] = useState("");
  const [ammount, setAmmount] = useState("");
  const [loader, setLoader] = useState(false);
  const [employeeList, setEmployeeList] = useState([])
  const { empList } = useWorkerHook();

  useEffect(() => {
    setDate("");
    setAmmount("");
    setEmpName("");
  }, [props.show]);

  useEffect(() => {
    let list = localStorage.getItem("EmpList")
    if(empList?.length === 0){
      setEmployeeList(JSON.parse(list))
    }else{
      setEmployeeList(empList)
    }
  },[empList])

  const handleSubmit = () => {
    setLoader(true);
    addUppad(empName, ammount, date).then((res) => {
      if (res?.data?.error) {
        notification["error"]({
          message: res?.data?.error,
        });
      } else {
        notification["success"]({
          message: "Uppad Added Successfully",
        });
        props.handleCloseUppad();
      }
      setLoader(false);
    });
  };

  return (
    <Modal show={props.show} onHide={props.handleCloseUppad}>
      <Modal.Header>
        <Modal.Title>Uppads</Modal.Title>
        <div onClick={props.handleCloseUppad}>
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
                  onChange={(value) => setEmpName(value)}
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
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6">Date:</div>
              <div className="col-6">
                <DatePicker
                  className="w-100-m-3"
                  disabledDate={(current) => current.isAfter(moment())}
                  onChange={(date, dateString) => setDate(dateString)}
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6">Amount:</div>
              <div className="col-6">
                <InputNumber
                  className="w-100-m-3"
                  min={0}
                  onChange={(value) => setAmmount(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseUppad}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={empName === "" || date === "" || ammount === "" || loader || ammount === null }
          onClick={handleSubmit}
        >
          Add{" "}
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
  );
}
