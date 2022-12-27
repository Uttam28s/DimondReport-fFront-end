import { Button, Input, notification, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import Modal from "react-bootstrap/Modal";
import { getPriceList, updatePrice } from "../ApiConn/Api";
import { useDiamondTypeHook } from "../Hooks/getDiamondType";
import { list } from "../Common/common";

export default function UpdatePriceModal(props) {
  const [process, setProcess] = useState("");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [diamondType, setDiamondType] = useState([]);
  const { Option } = Select;
  const { diamondTypeList } = useDiamondTypeHook;
  useEffect(() => {
    setData({});
  }, [props.show]);

  const handleChange = () => {
    let adminId = localStorage.getItem("AdminId");
    setLoader(true);
    updatePrice(data, process, adminId).then((res) => {
      notification["success"]({
        message: "Price Updated Successully" || "",
      });
    });
    setLoader(false);
    setData({});
    props.handleClosePrice();
  };

  const handleProcess = async (value) => {
    setProcess(value);
    await getPriceList(value).then((res) => {
      let obj = res.reduce(function (result, item) {
        var key = Object.keys(item)[0]; //first property: a, b, c
        result[key] = item[key];
        return result;
      }, {});
      setData(obj);
      setDiamondType(Object.keys(obj));
    });
  };
  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>Update Prices</Modal.Title>
        <div onClick={props.handleClosePrice}>
          <CloseOutlined />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-4">Process:</div>
            <div className="col-8">
              <Select
                showSearch
                style={{ width: "100%" }}
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
          </div>
        </div>
        {diamondType.map((ele) => {
          return (
            <div className="container mt-3">
              <div className="row">
                <div className="col-4">{ele}</div>
                <div className="col-8">
                  <Input
                    value={data[ele]}
                    onChange={(e) =>
                      setData({ ...data, [ele]: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClosePrice}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={process === ""}
          onClick={handleChange}
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
