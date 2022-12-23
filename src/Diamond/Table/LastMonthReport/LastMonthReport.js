import { Button, notification, Select, Spin } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FetchMonthData } from "../../ApiConn/Api";
import { MainTitle } from "../../Common/common";
import { useDiamondTypeHook } from "../../Hooks/getDiamondType";
import AdminRecordTable from "./AdminRecordTable";
import LastMonthReportTable from "./LastMonthReportTable";

const Loader = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
`;

const MonthName = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const FinalTotalDiv = styled.div`
  color: red;
  width: 10%;
  border: 1px solid lightgrey;
  margin-bottom: 20px;
  padding-left: 10px;
`;



const DataNoFoundBlock = styled.div`
  align-items: center;
  display: flex;
  height: 50vh;
  justify-content: center;
`;
const TotalCalculateDiv = styled.div`
  color: blue;
  width: 10%;
  border: 1px solid lightgrey;
  padding-left: 10px;
`;

const Heading = styled.h3`
  margin: 10px;
  text-align: center;
  color: grey;
`;

const PrintCell = styled.div`
  width: 100px;
  justify-content: flex-end;
`;

const Container = styled.div`
  @media print {
    ${PrintCell} {
      display: none;
    }
  }
`;

const TotalCalculate = (props) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let n = 0;
    let title = props.title;
    props.data.map((ele) => {
      n = n + ele[title];
    });
    setTotal(n);
  }, [props]);
  return <TotalCalculateDiv>{total}</TotalCalculateDiv>;
};

const LastMonthReport = () => {
  const { Option } = Select;
  const [taliyaData, setTaliyaData] = useState([]);
  const [pelData, setPelData] = useState([]);
  const [mathalaData, setMathalaData] = useState([]);
  const [russianData, setRussianData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [month, setMonth] = useState(moment().month());
  const [total, setTotal] = useState("");
  const [totalField, setTotalField] = useState([]);
  const [showTables, setShowTables] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [finalTotal, setFinalTotal] = useState([]);
  const { diamondTypeList } = useDiamondTypeHook();

  const Tables = [
    {
      data: taliyaData || [],
      title: "Taliya Employee Report",
    },
    {
      data: pelData || [],
      title: "Pel Employee Report",
    },
    {
      data: russianData || [],
      title: "Russian Employee Report",
    },
    {
      data: mathalaData || [],
      title: "Mathala Employee Report",
    },
    {
      data: tableData || [],
      title: "Table Employee Report",
    },
  ];

  useEffect(() => {
    let role = localStorage.getItem("role");
    if (role === "SuperAdmin") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    let rightside = ["total", "uppad", "jama", "salary"];
    let arr = [];
    let finalArray = [];
    diamondTypeList.map((ele) => {
      arr.push(`${ele}pcs`);
    });
    setTotalField(arr.concat(rightside));
    let arr1 = arr.concat(rightside);
    arr1.map((ele) => {
      finalArray.push(`total${ele}`);
    });

    setFinalTotal(finalArray);
  }, [diamondTypeList]);

  useEffect(() => {
    setLoader(true);

    FetchMonthData(month)
      .then((res) => {
        setTaliyaData(res.TaliyaData);
        setMathalaData(res.MathalaData);
        setPelData(res.PelData);
        setRussianData(res.RussianData);
        setTableData(res.TableData);
        if (
          res.TaliyaData.length === 0 &&
          res.MathalaData.length === 0 &&
          res.PelData.length === 0 &&
          res.RussianData.length === 0 &&
          res.TableData.length === 0
        ) {
          setShowTables(false);
        } else {
          setShowTables(true);
        }
        setLoader(false);
        setTotal(res.Total);
      })
      .catch((err) => {
        notification["error"]({
          message: err?.response?.data?.message || "Data Not Found",
        });
        setLoader(false);
      });
  }, [month]);

  const printItems = () => {
    window.print();
    window.location.reload(false);
  };
  return (
    <>
      <MainTitle />
      {isAdmin ? (
        <>
        <AdminRecordTable/> 
        </>
      ) : (
        <>
          <Heading>Employee {MonthName[month + 1]} Month Data</Heading>
          <Container className="col-6 d-flex">
            <PrintCell className="col-4">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="select month"
                value={month}
                onChange={(value) => setMonth(value)}
                optionFilterProp="children"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((ele, index) => {
                  return (
                    <Option key={index} value={index}>
                      {MonthName[ele]}
                    </Option>
                  );
                })}
              </Select>
            </PrintCell>
            <PrintCell className="col-2">
              <Button onClick={printItems}>Print</Button>
            </PrintCell>
          </Container>

          {loader ? (
            <Loader>
              {" "}
              &nbsp; <Spin size="large" />
            </Loader>
          ) : (
            <>
              {showTables ? (
                <>
                  {Tables.map((ele) => {
                    if (ele.data.length !== 0) {
                      return (
                        <>
                          <LastMonthReportTable
                            data={ele.data}
                            title={ele.title}
                          />
                          <div className="d-flex p-10 m-10">
                            <div style={{ width: "6%" }}></div>
                            <div style={{ width: "14%" }}>Total : </div>
                            {totalField.map((i) => {
                              return (
                                <TotalCalculate data={ele.data} title={i} />
                              );
                            })}
                          <div style={{ width: "10%" }}></div>
                          </div>
                        </>
                      );
                    }
                  })}
                  <br />
                  <div className="d-flex p-10">
                    <div style={{ width: "6%" }}></div>
                    <div style={{ width: "12%" }}>Final Total : </div>
                    {finalTotal.map((ele) => {
                      return <FinalTotalDiv>{total[ele]}</FinalTotalDiv>;
                    })}
                    <div style={{ width: "10%" }}></div>
                  </div>
                </>
              ) : (
                <DataNoFoundBlock>No Data Found</DataNoFoundBlock>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default LastMonthReport;
