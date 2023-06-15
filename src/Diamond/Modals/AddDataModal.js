import { Button, DatePicker, Input, notification, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import Modal from "react-bootstrap/Modal";
import { addReport, getSingleReport, updateReport } from "../ApiConn/Api";
import moment from "moment";
import { useWorkerHook } from "../Hooks/getWorker";
import { list } from "../Common/common";
import { useDiamondTypeHook } from "../Hooks/getDiamondType";
export default function AddDataModal(props) {
  const { Option } = Select;
  const [empName, setEmpName] = useState("");
  const [process, setProcess] = useState("");
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [editLoader, setEditLoader] = useState(false);
  const { empList } = useWorkerHook();
  const { activeTypeList } = useDiamondTypeHook()
  useEffect(() => {
    setEmpName("");
    setProcess("");
    // setDate("");
    setData({});
  }, [props.show]);

  useEffect(() => {
      setTypeList( activeTypeList || JSON.parse(localStorage.getItem("activeTypeList")));
  }, [activeTypeList]);

  useEffect(() => {
    let list = localStorage.getItem("EmpList");
    if (empList?.length === 0) {
      setEmployeeList(JSON.parse(list));
    } else {
      setEmployeeList(empList);
    }
  }, [empList]);

  useEffect(() => {
    if (props.id) {
      setEditLoader(true);
      getSingleReport(props.id).then((res) => {
        let data = res?.data?.data;
        setData(Object.fromEntries(data.pcs));

        list.map((ele) => {
          if (ele?.process === data?.process) {
            setProcess(ele?.process);
            setDate(data?.date.slice(0, 10));
          }
          return ''
        });
        setEditLoader(false);
        setEmpName(data?.workerid);
        if(employeeList){
          const result = employeeList?.filter((emp) => {
            return emp?._id === data?.workerid;
          });
          setProcess(result[0].process);
        }
        
      });
    }
  }, [props]);

  const handleChange = async () => {
    let total = 0;
    Object.keys(data).map((ele) => {
      total = total + Number(data[ele]);
      return ''
    });
    let params = {
      workerid: empName,
      adminId: localStorage.getItem("AdminId"),
      process: process,
      date: date,
      total: total,
      id: props?.id,
    };
    setLoader(true);

    if (props?.id) {
      await updateReport(params, data)
        .then(() => {
          notification["success"]({
            message: "Report Updated Successfully",
          });
          props.handleCloseData()
        })
        .catch(() => {
          notification["error"]({
            message: "Something Went Wrong",
          });
        });
    } else {
      await addReport(params, data)
        .then(() => {
          notification["success"]({
            message: "Report Added Successfully",
          })
          props.handleCloseData()
        }
        )
        .catch(() => {
          notification["error"]({
            message: "Something Went Wrong",
          });
        });
    }
    localStorage.setItem("process", params["process"]);
    let id = 0;
    list.map((ele) => {
      if (ele.process === params["process"]) {
        id = ele.id;
      }
      return ''
    });
    setLoader(false);
    props.onDataSubmit(id);
  };

  const employeechange = (value) => {
    setEmpName(value);
    const result = employeeList?.filter((emp) => {
      return emp._id === value;
    });
    setProcess(result[0].process);
  };

  return (
    <Modal show={props.show} onHide={props.handleCloseData}>
      <Modal.Header>
        <Modal.Title>{props?.id ? "Edit" : "Add New"} Data</Modal.Title>
        <div onClick={props.handleCloseData}>
          <CloseOutlined />
        </div>
      </Modal.Header>
      <Modal.Body>
        {editLoader ? (
          <div style={{ textAlign: "center" }}>
            {" "}
            &nbsp; <Spin size="small" />
          </div>
        ) : (
          <>
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
                      value={empName}
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
                  <div className="col-6">Date:</div>
                  <div className="col-6">
                    <DatePicker
                      className="w-100-m-3"
                      value={moment(date)}
                      onChange={(date, dateString) => {
                        setDate(dateString);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">Process Name:</div>
                  <div className="col-6">
                    <Select
                      showSearch
                      className="w-100-m-3"
                      disabled
                      placeholder="Select Process"
                      onChange={(value) => setProcess(value)}
                      value={process}
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
                      {list.map((ele) => {
                        return (
                          <Option value={ele?.process}>{ele?.title}</Option>
                        );
                      })}
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="container">
              <div className="row">
                <div className="col-12">Diamond Quantity (size/type):</div>
              </div>
            </div>
            <div className="container">
              <div style={{ fontSize: "12px" }}>
                {typeList?.map((ele) => {
                  return (
                    <div className="row mt-3">
                      <div className="col-6"> {ele} : </div>
                      <div className="col-6">
                        <Input
                          type="number"
                          defaultValue={0}
                          value={data?.[ele]}
                          onChange={(e) => {
                            if(e.target.value === ""){
                              setData({ ...data, [ele]: 0 })
                            }else{
                              setData({ ...data, [ele]: e.target.value })
                            }
                          }
                          }
                        />
                        <br />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseData}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={loader || process === "" || empName === ""  }
          onClick={handleChange}
        >
          {props?.id ? "Edit" : "Add"}{" "}
          {loader ? (
            <>
              {" "}
              &nbsp; <Spin size="small" />
            </>
          ) : (
            ""
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
