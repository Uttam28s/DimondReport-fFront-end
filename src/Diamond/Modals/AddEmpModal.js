import { DatePicker, Input, notification, Select } from "antd";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { addWorkerName, updateWorker } from "../ApiConn/Api";
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
    if(props?.id){
      updateWorker(name, process, props?.id).then((res) => {
        notification["success"]({
          message: "Worker Updated Successfully",
        });
        setLoader(false);
        setName("");
        setDate("");
        props.handleClose();
        props?.setUpdate()
      })
      .catch((err) => {
        notification["error"]({
          message: "Name Already Exist",
        });
        setLoader(false);
      });
    }else{
      addWorkerName(name, process, adminId)
        .then((res) => {
          notification["success"]({
            message: "Worker Added Successfully",
          });
          setLoader(false);
          setName("");
          setDate("");
          props.handleClose();
        })
        .catch((err) => {
          notification["error"]({
            message: "Name Already Exist",
          });
          setLoader(false);
        });
    }
  };

  useEffect(() => {
    setDate("");
    setName("");
    setProcess("");
    if(props?.id){
      let EmpList = localStorage.getItem("EmpList")
      let list = JSON.parse(EmpList).filter((ele) => {
        return String(ele?._id) === String(props?.id)
      })
      setName(list[0]?.name)
      setProcess(list[0]?.process)
    } 
  }, [props.show]);

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <ModalHeader title="Add New Employee" onClick={props.handleClose} />
      <Modal.Body>
        {
          !props?.hide &&
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
        }
        <div className="container">
          <div className="row">
            <div className="col-4">
              <span style={{ margin: "2px" }}>Name: </span>
            </div>
            <div className="col-8">
              <Input
                required
                value={name}
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
                value={process}
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
        disabled={name === "" || process === "" || loader}  
        onClick={handleSubmit} 
        loader={loader} 
        handleClose={props.handleClose} 
        title="Add" 
      />
    </Modal>
  );
}
