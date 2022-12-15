import { Button } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BulkTable from "./BulkTable";

const BulkUpload = () => {
  const [tableShow, setTableShow] = useState(1);
  const navigate = useNavigate();
  const list = [
    { id: 1, type: "Talyu" },
    { id: 2, type: "Mathalu" },
    { id: 3, type: "Pel" },
    { id: 4, type: "Russian" },
    { id: 5, type: "Table" },
  ];
  const onClickHandle = (a) => {
    setTableShow(a);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h4>Diamond</h4>
      </nav>
      <div
        style={{ margin: "10px" }}
        className="d-flex justify-content-between"
      >
        <Button onClick={() => navigate("/diamond")}>Back</Button>
        <div style={{ margin: "10px", textAlign: "end" }}>
          <ul style={{ display: "inline-block" }} className="navbar-nav">
            {list.map((ele, index) => {
              return (
                <li key={index} style={{ display: "inline-block" }}>
                  <Button
                    style={{ margin: "2px", width: "80px" }}
                    disabled={tableShow === ele.id}
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
      </div>

      {tableShow === 1 ? (
        <BulkTable title="Taliya Bulk Uplaod" process="taliya" />
      ) : (
        ""
      )}
      {tableShow === 2 ? (
        <BulkTable title="Mathala Bulk Upload" process="mathala" />
      ) : (
        ""
      )}
      {tableShow === 3 ? (
        <BulkTable title="Pel Bulk Upload" process="pel" />
      ) : (
        ""
      )}
      {tableShow === 4 ? (
        <BulkTable title="Russian Bulk Upload" process="russian" />
      ) : (
        ""
      )}
      {tableShow === 5 ? (
        <BulkTable title="Table Bulk Upload" process="table" />
      ) : (
        ""
      )}
    </>
  );
};

export default BulkUpload;
