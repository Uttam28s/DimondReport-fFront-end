import { Button, DatePicker, Input, notification, Select, Spin } from "antd";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { CloseOutlined } from "@mui/icons-material";
import { addWorkerName } from "../ApiConn/Api";
import moment from "moment";
import { list } from "../Common/common";
import {ModalHeader, ModalFooter} from "../Common/modal";
export default function AddEmpModal(props) {
  const { Option } = Select;
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [process, setProcess] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = () => {
    setLoader(true);
    let adminId = localStorage.getItem("AdminId");
    addWorkerName(name, process, adminId)
      .then((res) => {
        notification["success"]({
          message: "Worker Added Successfully",
        });
      })
      .catch((err) => {
        notification["error"]({
          message: "Name Already Exist",
        });
      });
    setLoader(false);
    setName("");
    setDate("");
    props.handleClose();
  };

  useEffect(() => {
    setDate("");
    setName("");
    setProcess("");
  }, [props.show]);

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <Modal show={props.show} handleclose={props.handleclose}>
      <ModalHeader title="Add New Employee" onClick={props.handleClose} />
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <span style={{ margin: "2px" }}>Date:</span>
            </div>
            <div className="col-8">
              <DatePicker
                disabledDate={(current) => current.isAfter(moment())}
                onChange={onChange}
                style={{ width: "60%", margin: "2px" }}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <span style={{ margin: "2px" }}>Name: </span>
            </div>
            <div className="col-8">
              <Input
                required
                onChange={(e) => setName(e.target.value)}
                style={{ width: "60%", margin: "2px" }}
              />{" "}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <span style={{ margin: "2px" }}>Process:</span>
            </div>
            <div className="col-8">
              <Select
                showSearch
                style={{ margin: "2px", width: "60%" }}
                placeholder="Select Process"
                onChange={(value) => setProcess(value)}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {
                    list.map((ele) => {
                        return <Option value={ele?.process}>{ele?.title}</Option>
                    })
                }
              </Select>
            </div>
          </div>
        </div>
      </Modal.Body>
      <ModalFooter 
        disabled={name === "" || date === "" || process === ""}  
        onClick={handleSubmit} 
        loader={loader} 
        handleClose={props.handleClose} 
        title="Add" 
      />
    </Modal>
  );
}
