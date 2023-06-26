import { Button, DatePicker, notification, Select, Spin, Table } from "antd";
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

const DataNoFoundBlock = styled.div`
  align-items: center;
  display: flex;
  height: 50vh;
  justify-content: center;
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

const FinalTotalField = styled.div`
  color: blue;
`;

const LastMonthReport = () => {
  const { Option } = Select;
  const [status, setStatus] = useState(false)
  const [taliyaData, setTaliyaData] = useState([]);
  const [pelData, setPelData] = useState([]);
  const [mathalaData, setMathalaData] = useState([]);
  const [russianData, setRussianData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [fPData, setFPData] = useState([]);
  const [tichingData, setTichingData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [month, setMonth] = useState(moment().month());
  const [total, setTotal] = useState("");
  const [totalField, setTotalField] = useState([]);
  const [showTables, setShowTables] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { diamondTypeList } = useDiamondTypeHook();
  const [finalTotalField, setFinalTotalField] = useState([]);
  const [year, setYear] = useState(moment().year())
  const Tables = [
    {
      data: tableData || [],
      title: "Table Employee Report",
    },
    {
      data: russianData || [],
      title: "Russian Employee Report",
    },
    {
      data: taliyaData || [],
      title: "Taliya Employee Report",
    },
    {
      data: pelData || [],
      title: "Pel Employee Report",
    },
    {
      data: mathalaData || [],
      title: "Mathala Employee Report",
    },
    {
      data: fPData || [],
      title: "4P Employee Report",
    },
    {
      data: tichingData || [],
      title: "Tiching Employee Report",
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
    let list =[]
    if(diamondTypeList?.length === 0){
      list = JSON.parse(localStorage.getItem("typeList"))
    }else{
      list = diamondTypeList
    }
    list?.map((ele) => {
      arr.push(`${ele}pcs`);
      return ''
    });
    setTotalField(arr.concat(rightside));

    const finalTotalL = [
      {
        title: "",
        key: "_id",
        width:"5%",
        render: (text, record, index) => {
          ""
        },
      },
      {
        title: "Title",
        key: "name",
        width: "10%",
        render: (text, record, index) => {
          return (
            <FinalTotalField>
              Final Total
            </FinalTotalField>
          );
        },
      },
    ];

    const finalTotalR = [
      {
        title: "Salary",
        dataIndex: "total",
        key: "_id",
        width: "5%",
        render: (text, record, index) => {
          return <FinalTotalField>{record?.totaltotal}</FinalTotalField>;
        },
      },
      {
        title: "Uppad",
        dataIndex: "totaluppad",
        key: "_id",
        width: "5%",
        render: (text, record, index) => {
          return <FinalTotalField>{record?.totaluppad}</FinalTotalField>;
        },
      },
      {
        title: "Jama",
        dataIndex: "totaljama",
        key: "_id",
        width: "5%",
        render: (text, record, index) => {
          return <FinalTotalField>{record?.totaljama}</FinalTotalField>;
        },
      },
      {
        title: "Total",
        dataIndex: "salary",
        key: "_id",
        width: "5%",
        render: (text, record, index) => {
          return <FinalTotalField>{record?.totalsalary}</FinalTotalField>;
        },
      },
      {
        title: "",
        dataIndex: "salary",
        width : "10%",
        render: (text, record, index) => {
          return (
            ""
          )
        },
        
      },
      
    ];
    let finalTotalC = [];
    list?.map((ele) => {
      finalTotalC.push({
        title: `${ele} Pcs`,
        dataIndex: `total${ele}pcs`,
        key: "_id",

        render: (text, record, index) => {
          return (
            <FinalTotalField>
              {record?.[`total${ele}pcs`] || "0"}
            </FinalTotalField>
          );
        },
      });
      return ''
    });
    setFinalTotalField(finalTotalL.concat(finalTotalC, finalTotalR));
  }, []);

  const TotalCalculate = (data, title) => {
    let obj = {};
    totalField.map((ele) => {
      obj[ele] = 0;
      return ''
    });
    totalField.map((key) => {
      data.map((ele) => {
        obj[key] = obj[key] + ele[key];
        return ''
      });
      return ''
    });
    obj["workerName"] = "Total";
    data.push(obj);
    return data;
  };

  useEffect(() => {
    setLoader(true);

    FetchMonthData(month,year)
      .then((res) => {
        if (res?.MathalaData) {
          setMathalaData(
            TotalCalculate(res?.MathalaData, "Mathala Employee Report")
          );
        }
        if (res?.TaliyaData) {
          setTaliyaData(
            TotalCalculate(res?.TaliyaData, "Taliya Employee Report")
          );
        }
        if (res?.PelData) {
          setPelData(TotalCalculate(res?.PelData, "Pel Employee Report"));
        }
        if (res?.RussianData) {
          setRussianData(
            TotalCalculate(res?.RussianData, "Russian Employee Report")
          );
        }
        if (res?.TableData) {
          setTableData(
            TotalCalculate(res?.TableData, "Table Employee Report")
          );
        }
        if (res?.fPData) {
          setFPData(
            TotalCalculate(res?.fPData, "4P Employee Report")
          );
        }
        if (res?.tichingData) {
          setTichingData(
            TotalCalculate(res?.tichingData, "Tiching Employee Report")
          );
        }

        if (
          res.TaliyaData.length === 1 &&
          res.MathalaData.length === 1 &&
          res.PelData.length === 1 &&
          res.RussianData.length === 1 &&
          res.fPData.length === 1 &&
          res.tichingData.length === 1 &&
          res.TableData.length === 1
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
  }, [month,year, totalField, status]);

  const printItems = () => {
    window.print();
  };
  const yearFormat = 'YYYY';

  return (
    <>
      <MainTitle />
      {isAdmin ? (
        <>
          <AdminRecordTable />
        </>
      ) : (
        <>
          <Heading>Employee {MonthName[month + 1]} Month Data</Heading>
          <Container className="col-6 d-flex">
            <PrintCell className="col-3">
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
            <PrintCell className="col-3">
                <DatePicker
                style={{ width: "100%", margin: "0px"}}
                defaultValue={moment(moment().year(), yearFormat)}
                onChange={(date, dateString) => setYear(dateString)}
                picker="year"
                />
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
                    if (ele.data.length !== 1) {
                      return (
                        <>
                          <LastMonthReportTable
                            data={ele.data}
                            title={ele.title}
                            month={month}
                            diamondTypeList={diamondTypeList}
                            setStatus={() => setStatus(!status)}
                          />
                        </>
                      );
                    }
                    return ''
                  })}
                  <br />
               
                  <Table
                    style={{ margin: "10px", paddingBottom: "20px" }}
                    columns={finalTotalField}
                    showHeader={true}
                    dataSource={[total]}
                    scroll={{ x: true }}
                    bordered
                    size="middle"
                    pagination={false}
                  />
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
