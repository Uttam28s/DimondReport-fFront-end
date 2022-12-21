import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const MainTitle = (props) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h4 style={{ margin: "10px" }}>Diamond</h4>
      {!props?.hidden && (
        <Button onClick={() => navigate("/diamond")}>Back</Button>
      )}
      {
        !props?.logoutHidden ?
        <Button style={{ marginLeft: "10px" }} onClick={() => { 
          
          localStorage.clear()
          navigate("/login") 
          window.location.reload(false)
        }
        }>Logout</Button> : ""
      }

    </nav>
  );
};

const list = [
  { id: 1, type: "Talyu", process: "taliya" },
  { id: 2, type: "Mathalu", process: "mathala" },
  { id: 3, type: "Pel", process: "pel" },
  { id: 4, type: "Russian", process: "russian" },
  { id: 5, type: "Table", process: "table" },
];


const dummyUserData= [
    {
        name: "Manoj",
        password : "12345678",
        role : "Admin",
        flag : "true"
    },
    {
        name: "Suresh",
        password : "12345678",
        role : "Admin",
        flag : "true"
    },
    {
        name: "Ramesh",
        password : "12345678",
        role : "Admin",
        flag : "true"
    },

]
export { list, MainTitle, dummyUserData };
