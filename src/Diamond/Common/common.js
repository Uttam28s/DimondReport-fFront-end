import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import moment from "moment";

const MainTitle = (props) => {
  const navigate = useNavigate();
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#6c757d" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex" , alignItems : "center" }}>
          <h4 style={{ margin: "10px", color: "white" }}>Diamond</h4>
          {!props.qrhidden && (
            <Button
              style={{ marginRight: "10px" }}
              onClick={() => navigate("/qrcode")}
            >
              QrCode
            </Button>
          )}
          {!props?.hidden && (
            <Button onClick={() => navigate(-1)}>Back</Button>
          )}
          {!props?.logoutHidden ? (
            <Button
              type="button"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          ) : (
            ""
          )}
        </div>
        <div>
          <Header onDataSubmit={props?.onClickHandle} id={props?.id} />
        </div>
      </div>
    </nav>
  );
};

const list = [
  { id: 6, type: "4P", process: "4P", title: "4P" },
  { id: 7, type: "Tiching", process: "tiching", title: "Tiching" },
  { id: 1, type: "Talyu", process: "taliya", title: "Taliya" },
  { id: 2, type: "Mathalu", process: "mathala", title: "Mathala" },
  { id: 3, type: "Pel", process: "pel", title: "Pel" },
  { id: 4, type: "Russian", process: "russian", title: "Russian" },
  { id: 5, type: "Table", process: "table", title: "Table" },
];

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
const dummyUserData = [
  {
    name: "Manoj",
    password: "12345678",
    role: "Admin",
    flag: "true",
  },
  {
    name: "Suresh",
    password: "12345678",
    role: "Admin",
    flag: "true",
  },
  {
    name: "Ramesh",
    password: "12345678",
    role: "Admin",
    flag: "true",
  },
];

const BillTemplate = ({ data }) => {
  const headingData = ["નંબર", "હીરા", "વજન", "તળિયા", "પેલ", "મથાળા", "જમા"];
  return (
    <div
      style={{
        margin: "30px 10px",
        width: "70%",
      }}
      >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          borderTop: "1px solid black",
          borderLeft: "1px solid black",
          borderRight: "1px solid black",
          justifyContent: "space-between",
          width: "100%",
          padding: "5px 10px",
        }}
      >
        <div
          style={{
            fontSize : "35px",
            fontWeight: "600",
            width: "10%",
            textAlign: "center",
            color : "red"
          }}
        >
          {data?.jangadNo}
        </div>
        <div
          style={{
            fontSize : "30px",
            fontWeight: "600",
            width: "25%",
            textAlign: "center",
          }}
        >
          {data?.name}
        </div>
        <div
          style={{
            fontSize : "30px",
            fontWeight: "600",
            width: "25%",
            textAlign: "center",
          }}
        >
          {data?.process}
        </div>
        <div
          style={{
            fontSize : "30px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {moment(data?.date).format('DD-MM-YYYY')}
        </div>
      </div>
      <table style={{ width: "100%", textAlign: "center" }}>
        <tr style={{ border: "1px solid black", height : "60px" }}>
          {headingData.map((ele, index) => {
            return <th style={{ border: "1px solid black",fontSize : "25px", }}>{ele}</th>;
          })}
        </tr>
        {data?.jangadData?.map((ele, index) => {
          return (
            <tr style={{ border: "1px solid black" , fontSize : "25px", height : "60px" }}>
              <td style={{ border: "1px solid black", width: "8%" }}>
                {index + 1}
              </td>
              <td style={{ border: "1px solid black", width: "10%" }}>
                {ele?.diamond}
              </td>
              <td style={{ border: "1px solid black", width: "10%" }}>
                {ele?.weight}
              </td>
              <td style={{ border: "1px solid black", width: "10%" }}></td>
              <td style={{ border: "1px solid black", width: "10%" }}></td>
              <td style={{ border: "1px solid black", width: "10%" }}></td>
              <td style={{ border: "1px solid black", width: "10%" }}></td>
            </tr>
          );
        })}
        <tr style={{ border: "1px solid black", height : "60px"  }}>
          <td style={{ border: "1px solid black", width: "8%" }}> -</td>
          <td style={{ border: "1px solid black", width: "10%" }}> </td>
          <td style={{ border: "1px solid black", width: "10%" }}> </td>
          <td style={{ border: "1px solid black", width: "10%" }}> </td>
          <td style={{ border: "1px solid black", width: "10%" }}> </td>
          <td style={{ border: "1px solid black", width: "10%" }}> </td>
          <td style={{ border: "1px solid black", width: "10%" }}> </td>
        </tr>
        <tr style={{ border: "1px solid black" , fontSize : "27px", height : "60px" }}>
          <td style={{ border: "1px solid black", width: "8%" }}></td>
          <td style={{ border: "1px solid black", width: "10%" }}>{data?.totalDiamond}</td>
          <td style={{ border: "1px solid black", width: "10%" }}>{data?.totalWeight}</td>
          <td style={{ border: "1px solid black", width: "10%" }}></td>
          <td style={{ border: "1px solid black", width: "10%" }}></td>
          <td style={{ border: "1px solid black", width: "10%" }}></td>
          <td style={{ border: "1px solid black", width: "10%" }}></td>
        </tr>
      </table>
    </div>
  );
};

export { list, MainTitle, dummyUserData, MonthName, BillTemplate };
