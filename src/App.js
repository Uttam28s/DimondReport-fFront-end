import React, { useEffect, useState } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Index from "./Componants/Index";
import DiamondIndex from "./Diamond/Diamondindex";
import BulkUpload from "./Diamond/Table/BulkUpload/BulkUpload";
import "antd/dist/antd.less";
import TableEmpRecord from "./Diamond/Table/TableEmpRecord";
import LastMonthReport from "./Diamond/Table/LastMonthReport/LastMonthReport";
import Users from "./Diamond/Users/users";
import Login from "./Diamond/Login/Login";
import WorkerListTable from "./Diamond/Worker/WorkerList";

function App() {
  // const [authLogin, setAuthLogin] = useState(false);
  // useEffect(() => {
  //   let status = localStorage.getItem("authLogin");
  //   setAuthLogin(status || false);
  // }, []);
  return (
    <div>
      <HashRouter>
        <Routes>
          {/* {authLogin ? ( */}
            <>
              {/* {localStorage.getItem("role") === "SuperAdmin" && ( */}
                <Route path="*" element={<Navigate to="/diamond/user" />} />
              {/* )} */}

              <Route path={"/diamond"} element={<DiamondIndex />} />
              <Route path={"/diamond/bulkUpload"} element={<BulkUpload />} />
              <Route path={"/diamond/empReport"} element={<TableEmpRecord />} />
              <Route path={"/diamond/monthwisereport"} element={<LastMonthReport />} />
              <Route path={"/diamond/user"} element={<Users />} />
              <Route path={"/diamond/worker"} element={<WorkerListTable />} />
              <Route path={"/qrcode"} element={<Index />} />
            {/* </>
          ) : (
            <> */}
              <Route
                path={"/login"}
                element={<Login />}
              />
              <Route path="/" element={<Navigate to="/login" />} />
            </>
          {/* )} */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
