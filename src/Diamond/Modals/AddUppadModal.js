import { Button, DatePicker, InputNumber, notification, Select, Spin } from "antd";
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
  const [loader, setLoader] = useState(false)
  const { empList } = useWorkerHook(); 

  useEffect(() => {
    setDate("");
    setAmmount("");
    setEmpName("");
  }, [props.show]);

  const handleSubmit = () => {
    setLoader(true)
    addUppad(empName, ammount, date).then((res) => {
      if (res?.data?.error) {
        notification["error"]({
          message: res?.data?.error,
        });
      } else {
        notification["success"]({
          message: "Uppad Added Successfully",
        });
      }
    })
    setLoader(false)
    props.handleCloseUppad();
  };

  return (
    <Modal show={props.show}>
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
                  style={{ width: "100%", margin: "3px" }}
                  placeholder="Search Employee"
                  onChange={(value) => setEmpName(value)}
                  optionFilterProp="children"
                >
                  {empList?.map((ele, index) => {
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
                  style={{ width: "100%", margin: "3px" }}
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
                  style={{ width: "100%", margin: "3px" }}
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
          disabled={empName === "" || date === "" || ammount === ""}
          onClick={handleSubmit}
        >
          Add {loader ? <> &nbsp; <Spin size="small"/> </> : "" }
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
