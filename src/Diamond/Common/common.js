import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const MainTitle = (props) => {
  const navigate = useNavigate();
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#6c757d" }}
    >
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
        <Button onClick={() => navigate("/diamond")}>Back</Button>
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
    </nav>
  );
};

const list = [
  { id: 5, type: "Table", process: "table", title: "Table" },
  { id: 4, type: "Russian", process: "russian", title: "Russian" },
  { id: 1, type: "Talyu", process: "taliya", title: "Taliya" },
  { id: 3, type: "Pel", process: "pel", title: "Pel" },
  { id: 2, type: "Mathalu", process: "mathala", title: "Mathala" },
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
export { list, MainTitle, dummyUserData, MonthName };
