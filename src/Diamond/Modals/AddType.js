import { Button, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { CloseOutlined } from "@mui/icons-material";
import { addType } from "../ApiConn/Api";

const AddType = (props) => {
  const [type, setType] = useState("");
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    let id = localStorage.getItem("AdminId")
  }, []);

  useEffect(() => {
    setType("")
  }, [props.show]);

  const handleSubmit = () => {
    setLoader(true)
    let adminId = localStorage.getItem("AdminId")
    addType({type : type,adminId : adminId}).then((res) => {
      console.log("🚀 ~ file: AddType.js:21 ~ addType ~ res", res)
      
    })
    setLoader(false)
    props.handleCloseAddType();
  };

  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>Add New Type</Modal.Title>
        <div onClick={props.handleCloseAddType}>
          <CloseOutlined />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-4">Type : </div>
              <div className="col-8">
              <Input required onChange={(e) => setType(e.target.value)} style={{ width: '60%', margin: '2px' }} />
              </div>
            </div>
          </div>
          
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseAddType}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={type === ""}
          onClick={handleSubmit}
        >
          Add {loader ? <> &nbsp; <Spin size="small"/> </> : "" }
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddType