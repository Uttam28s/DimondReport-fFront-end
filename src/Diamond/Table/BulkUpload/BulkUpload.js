import { Button } from "antd";
import React, { useState } from "react";
import { list, MainTitle } from "../../Common/common";
import BulkTable from "./BulkTable";

const BulkUpload = () => {
  const [tableShow, setTableShow] = useState(1);

  const onClickHandle = (a) => {
    setTableShow(a);
  };

  return (
    <>
      <MainTitle />
      <div style={{ margin: "10px" }} className="d-flex justify-content-end">
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
      {tableShow === 6 ? (
        <BulkTable title="4P Bulk Upload" process="4P" />
      ) : (
        ""
      )}
      {tableShow === 7 ? (
        <BulkTable title="Tiching Bulk Upload" process="tiching" />
      ) : (
        ""
      )}
    </>
  );
};

export default BulkUpload;
