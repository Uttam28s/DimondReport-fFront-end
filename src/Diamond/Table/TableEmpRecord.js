import { DatePicker, notification, Select, Spin, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getEmployeeReport } from "../ApiConn/Api";
import { MainTitle } from "../Common/common";
import { useDiamondTypeHook } from "../Hooks/getDiamondType";
import { useWorkerHook } from "../Hooks/getWorker";
import PrintComponenEmployee, { ComponentToPrint } from "./EmpReportPrint";

const columns = [
  {
    title: "Index",
    dataIndex: "index",
    key: "_id",
    width: 60,
    fixed: "center",
  },
  {
    title: "Date",
    dataIndex: "date",
    width: 60,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "_id",
    width: 100,
    fixed: "center",
  },
];

const total = [
  {
    title: "Total Pcs.",
    dataIndex: "total",
    key: "_id",
    width: 40,
  },
  {
    title: "Total Work",
    dataIndex: "dailywork",
    key: "_id",
    width: 40,
  },
];

const TableEmpRecord = (props) => {
  const { Option } = Select;
  const [data, setData] = useState([]);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [employee, setEmployee] = useState();
  const [totalSalary, setTotalSalary] = useState(0);
  const [column, setColumns] = useState(0);
  const [totalPcs, setTotalPcs] = useState({});
  const [price, setPrice] = useState({});
  const [loader, setLoader] = useState(false);
  const { diamondTypeList } = useDiamondTypeHook();
  const { empList } = useWorkerHook();

  useEffect(() => {
    let arr = [];
    diamondTypeList?.map((ele) => {
      arr.push({
        title: ele,
        fixed: "center",
        width: 130,
        children: [
          {
            title: "Pcs.",
            dataIndex: `${ele}`,
            key: "_id",
            width: 40,
            render: (text, record, index) => {
              return <span>{record?.[`${ele}`] || "0"}</span>;
            },
          },
        ],
      });
    });
    setColumns(columns.concat(arr, total));
  }, [diamondTypeList]);

  useEffect(() => {
    let salary = 0;
    let pcsObj = {};
    let pricePcs = {};
    diamondTypeList.map((ele) => {
      pcsObj[`${ele}pcs`] = 0;
      pricePcs[`${ele}Price`] = 0;
    });
    diamondTypeList.map((type) => {
      data.map((ele) => {
        pcsObj[`${type}pcs`] =
          pcsObj?.[`${type}pcs`] + Number(ele?.pcs[0][type] || 0);
        pricePcs[`${type}Price`] =
          pricePcs?.[`${type}Price`] +
          (ele?.pcs[0][type] || 0) * (ele?.price?.[0]?.[`${type}Price`] || 0);
      });
    });
    data.map((ele) => {
      salary = salary + ele.dailywork;
    });
    setTotalSalary(salary);
    setTotalPcs(pcsObj);
    setPrice(pricePcs);
  }, [data]);

  const getData = (params) => {
    if (!params.emp_id || !params.from || !params.to) {
      notification["error"]({
        message: "Please Select Employee,From Date,To Date First",
      });
      return;
    }
    setLoader(true);
    getEmployeeReport(params).then((x) => {
      const report = x.data;
      if (report.length === 0) {
        notification["error"]({
          message: "No Data Found",
        });
      }

      for (let j = 0; j < report.length; j++) {
        for (let i = 0; i < empList?.length; i++) {
          if (report[j].workerid === empList?.[i]._id) {
            report[j].index = j + 1;
            report[j].name = empList?.[i].name;
            report[j].date = report[j].date.slice(0, 10);
          }
        }
      }
      let pcs = {};
      let price = {};
      let arr = [];
      report.map((ele) => {
        Object.keys(ele.pcs[0]).map((i) => {
          pcs[i] = ele.pcs[0][i];
          ele[i] = ele.pcs[0][i];
        });
        Object.keys(ele.price[0]).map((i) => {
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
    });
    setLoader(false);
  };

  return (
    <>
      <MainTitle />
      <div className="semiTitle">Emp Record</div>
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
          style={{ marginTop: "10px", height: "20%" }}
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
              from: start,
              to: end,
              emp_id: employee,
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

      <Table columns={column} dataSource={data} scroll={{ x: true }} bordered size="middle" />
      <ComponentToPrint
        diamondTypeList={diamondTypeList}
        price={price}
        totalSalary={totalSalary}
        totalPcs={totalPcs}
      />
      {data.length > 0 && (
        <PrintComponenEmployee
          diamondTypeList={diamondTypeList}
          totalPcs={totalPcs}
          EmployeeName={empList?.find((d) => d._id === employee)?.name}
          price={price}
          totalSalary={totalSalary}
          from={start}
          to={end}
        />
      )}
    </>
  );
};

export default TableEmpRecord;
