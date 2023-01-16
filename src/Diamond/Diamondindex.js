import { Button, DatePicker, notification, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { getReport, getWorkerList } from "./ApiConn/Api";
import TableAll from "./Table/TableAll";
import moment from "moment";
import styled from "styled-components";
import { list, MainTitle } from "./Common/common";
import { useWorkerHook } from "./Hooks/getWorker";
import { useParams } from "react-router-dom";

const Loader = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
`;
const DiamondIndex = () => {
  const [start, setStart] = useState();
  const [tableShow, setTableShow] = useState(1);
  const [data, setData] = useState([]);
  const [process, setProcess] = useState();
  const [loader, setLoader] = useState(true);
  let { id } = useParams();

  let params = {};

  const getReportFunc = async (params) => {
    let id = localStorage.getItem("AdminId");
    params["adminId"] = id;
    let res = await getWorkerList()
    getReport(params)
      .then((x) => {
        const report = x.data.data;
        for (let j = 0; j < report.length; j++) {
          for (let i = 0; i < res?.data?.data?.length; i++) {
            if (report[j].workerid === res?.data?.data?.[i]._id) {
              report[j].index = j + 1;
              report[j].name = res?.data?.data?.[i].name;
              report[j].date = report[j].date.slice(0, 10);
            }
          }
        }
        let pcs = {};
        let price = {};
        let arr = [];
        report.map((ele) => {
          Object.keys(ele.pcs).map((i) => {
            pcs[i] = ele.pcs[i];
            ele[i] = ele.pcs[i];
          });
          Object.keys(ele.price).map((i) => {
            price[i] = ele.price[i];
          });
          let obj = {
            ...ele,
            ...pcs,
            ...price,
          };
          arr.push(obj);
        });
        setData(arr);
        setLoader(false);
      })
      .catch((err) => {
        notification["error"]({
          message: "Something Went Wrong",
        });
      });
  };

  useEffect(() => {
    if (tableShow === 1) {
      params = { process: "taliya", from: "", to: "" };
      setProcess("taliya");
    }
    setLoader(true);
    if (localStorage.getItem("process")) {
      params = { process: localStorage.getItem("process"), from: "", to: "" };
      setProcess(localStorage.getItem("process"));
      let ele = list.filter((ele) => {
        if (ele.process === params["process"]) {
          return ele.id;
        }
      });
      setTableShow(ele[0]?.id);
    }
    getReportFunc(params);
  }, []);

  const handleReport = (params) => {
    setLoader(true);
    getReportFunc(params);
  };

  const onClickHandle = (a) => {
    if (!a) {
      a = tableShow;
    }
    switch (a) {
      case 1:
        params = { process: "taliya" };
        break;
      case 2:
        params = { process: "mathala" };
        break;
      case 3:
        params = { process: "pel" };
        break;
      case 4:
        params = { process: "russian" };
        break;
      case 5:
        params = { process: "table" };
        break;
      default:
        break;
    }

    params["from"] = "";
    params["to"] = "";
    setProcess(params["process"]);
    localStorage.setItem("process", params["process"]);
    if (params["process"]) {
      handleReport(params);
    }
    setTableShow(a);
  };

  return (
    <>
      <MainTitle hidden={true} />
      <div style={{ margin: "10px", textAlign: "end" }}>
        <ul style={{ display: "inline-block" }} className="navbar-nav">
          {list.map((ele, index) => {
            return (
              <li key={index} style={{ display: "inline-block" }}>
                <Button
                  className="processButton"
                  disabled={process === ele.process}
                  onClick={() => {
                    onClickHandle(ele.id);
                  }}
                >
                  {ele.type}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="p-2 bd-highlight col-lg-4 col-sm-6">
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
            let params = {
              from: start,
              to: dateString,
              process: process,
            };
            handleReport(params);
          }}
          style={{ margin: "10px" }}
        />
      </div>
      <Header onDataSubmit={onClickHandle} id={id}/>
      {loader ? (
        <Loader>
          {" "}
          &nbsp; <Spin size="large" />
        </Loader>
      ) : (
        <div style={{ margin: "10px" }}>
          {tableShow === 5 ? <TableAll data={data} title="Table Data" /> : ""}
          {tableShow === 1 ? <TableAll data={data} title="Taliya Data" /> : ""}
          {tableShow === 2 ? <TableAll data={data} title="Mathala Data" /> : ""}
          {tableShow === 4 ? <TableAll data={data} title="Russian Data" /> : ""}
          {tableShow === 3 ? <TableAll data={data} title="Pel Data" /> : ""}
        </div>
      )}
    </>
  );
};

export default DiamondIndex;
