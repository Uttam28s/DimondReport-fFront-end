import React, { useState } from "react";
import { MainTitle } from "../Common/common";
import { DatePicker, Select, Spin, Table, message } from "antd";
import { useWorkerHook } from "../Hooks/getWorker";
import moment from "moment";
import { getUppadDetails } from "../ApiConn/Api";
import styled from "styled-components";

const Loader = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
`;

const UppadDetails = () => {
  const { Option } = Select;
  const [data, setData] = useState([]);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [employee, setEmployee] = useState();
  const [loader, setLoader] = useState(false);
  const { empList } = useWorkerHook();


  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "_id",
      // width: "5%",
      render: (text, record, index) => {
        return (
          <span style={{ fontSize : "20px"}}>
            {record?.workerName === "Total" ? "" : index + 1}
          </span>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "_id",
      render : (text,record , index) => {
        return <p style={{ fontSize : "20px"}}>{moment(record?.date).utc().format('DD-MM-YYYY')}</p>
      }
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "_id",
        render : (text,record , index) => {
            return <p style={{ fontSize : "20px"}}>{record?.amount}</p>
          }
      },
  ];


  const getData = (params) => {
    if(params['workerId']){
        setLoader(true);
        getUppadDetails(params).then((res) => {
            setData(res?.data?.data)
        }).catch((e) => {
            message.error(e?.response?.data?.message || "Something Went Wrong")
        })
        setLoader(false);

    }else{
        message.warning("select Worker First")

    }
  };

  return (
    <>
      <MainTitle hidden={false} />
      <div className="semiTitle">Uppad Details</div>
      <div style={{padding : "0px 50px"}}>

      <div className="p-2 bd-highlight" style={{ display: "flex" }}>
        <DatePicker
          disabledDate={(current) => current.isAfter(moment())}
          onChange={(date, dateString) => {
            setStart(dateString);
          }}
          style={{ margin: "10px" }}
        />
        <DatePicker
          disabledDate={(current) => current.isAfter(moment())}
          onChange={(date, dateString) => {
            setEnd(dateString);
          }}
          style={{ margin: "10px" }}
        />

        <Select
          showSearch
          style={{ marginTop: "10px", height: "20%" , width : "15%", marginRight : "20px" }}
          placeholder="Search Employee"
          onChange={(value) => setEmployee(value)}
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

        <button
          type="button"
          className="btn btn-secondary funcbtn"
          onClick={() =>
            getData({
              startDate: start,
              endDate: end,
              workerId: employee,
            })
            
          }
        >
          search{" "}
          {loader ? (
            <>
              {" "}
              &nbsp; <Spin size="small" color="white" />{" "}
            </>
          ) : (
            ""
          )}
        </button>
      </div>
      {loader ? (
            <Loader>
              {" "}
              &nbsp; <Spin size="large" />
            </Loader>
          ) :
      <Table 
        columns={columns} 
        dataSource={data}  
        bordered 
        size="medium" 
        pagination={false}
    /> }
      </div>

    </>
  );
};

export default UppadDetails;
