import { Button, Input, notification, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import Modal from "react-bootstrap/Modal";
import { addType, getPriceList, updatePrice } from "../ApiConn/Api";
import { list } from "../Common/common";

export default function UpdatePriceModal(props) {
  const [process, setProcess] = useState("");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [diamondType, setDiamondType] = useState([]);
  const [type, setType] = useState("");
  const [show, setShow] = useState(true);
  const [priceLoader , setPriceLoader] = useState(false)
  const { Option } = Select;
  useEffect(() => {
    setData({});
  }, [props.show]);

  const handleChange = () => {
    let adminId = localStorage.getItem("AdminId");
    setLoader(true);
    updatePrice(data, process, adminId).then((res) => {
      notification["success"]({
        message: "Price Updated Successully",
      });
      setLoader(false);
      setData({});
      props.handleClosePrice();
    });
  };

  const handleProcess = async (value) => {
    setProcess(value);
    setPriceLoader(true)
    await getPriceList(value).then((res) => {
      let obj = res.reduce(function (result, item) {
        var key = Object.keys(item)[0]; //first property: a, b, c
        result[key] = item[key];
        return result;
      }, {});
      setData(obj);
      setDiamondType(Object.keys(obj));
    });
    setPriceLoader(false)

  };

  const handleSubmit = () => {
    let adminId = localStorage.getItem("AdminId");
    
    setLoader(true);
    addType({ type: type.toLowerCase(), adminId: adminId })
      .then((res) => {
        notification["success"]({
          message: "Added Successfully",
        });
        setType("");
        setShow(true);
        setLoader(false);
        
      })
      .catch(() => {
        notification["error"]({
          message: "Already Having this type",
        });
        setLoader(false);
      });
  };
  return (
    <Modal show={props.show} onHide={props.handleClosePrice}>
      <Modal.Header>
        <Modal.Title>Update Prices</Modal.Title>
        <div onClick={props.handleClosePrice}>
          <CloseOutlined />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className={`row ${show ? "add-type-hide" : "add-type-show"}`}>
            <div className="col-4">Add New Type: </div>
            <div className="col-4">
              <Input
                required
                onChange={(e) => setType(e.target.value)}
                className="w-100-m-3"
              />
            </div>
            <div className="col-4">
              <Button
                variant="primary"
                disabled={type === ""}
                onClick={handleSubmit}
              >
                Add{" "}
                {loader ? (
                  <>
                    {" "}
                    &nbsp; <Spin size="small" />
                  </>
                ) : (
                  ""
                )}
              </Button>
            </div>
          </div>
          <div className={`row ${show ? "add-type-show" : "add-type-hide"}`}>
            <div className="col-4">Process: </div>
            <div className="col-5">
              <Select
                showSearch
                style={{ width: "100%", margin: "3px" }}
                placeholder="Select Process"
                onChange={(value) => {
                  handleProcess(value);
                }}
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
                  return <Option value={ele?.process}>{ele?.title}</Option>;
                })}
              </Select>
            </div>
            <div className="col-3">
              <Button disabled={loader} onClick={() =>{ 
                setShow(!show)
              }}>+ Type</Button>
            </div>
          </div>
        </div>
        <hr className={` ${show ? "add-type-show" : "add-type-hide"}`}/>
          
        {
          priceLoader ? 
                  <div style={{ textAlign : "center"}}>
                    {" "}
                    &nbsp; <Spin size="small" />
                  </div>
           :
           (<>
           {diamondType.map((ele) => {
             return (
               <>
                 <div
                   className={`container mt-3 ${
                     show ? "add-type-show" : "add-type-hide"
                   }`}
                 >
                   <div className="row">
                     <div className="col-4">{ele}</div>
                     <div className="col-5">
                       <Input
                         value={data[ele]}
                         onChange={(e) =>
                           setData({ ...data, [ele]: e.target.value })
                         }
                       />
                     </div>
                   </div>
                 </div>
               </>
             );
           })}
           </>)

        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClosePrice}>
          Close
        </Button>
        <Button
          variant="secondary"
          className={`${show ? "add-type-hide" : "add-type-show"}`}
          onClick={() => setShow(true)}
          disabled={loader}
        >
          Back
        </Button>
        <Button
          variant="primary"
          disabled={process === "" || loader || priceLoader}
          onClick={handleChange}
          className={`${show ? "add-type-show" : "add-type-hide"}`}
        >
          Update{" "}
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
