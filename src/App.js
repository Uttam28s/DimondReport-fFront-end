import React, { useEffect, useState } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Index from "./Componants/Index";
import DiamondIndex from "./Diamond/Diamondindex";
import BulkUpload from "./Diamond/Table/BulkUpload/BulkUpload";
import MonthReportScreen from "./Diamond/MonthReportScreen";
import "antd/dist/antd.less";
import TableNew from "./Diamond/Table/TableNew";
import LastMonthReport from "./Diamond/Table/LastMonthReport/LastMonthReport";
import Users from "./Diamond/Users/users";
import Login from "./Diamond/Login/Login";

function App() {
  const [ authLogin, setAuthLogin] = useState(false)
  useEffect(() => {
    let status = localStorage.getItem('authLogin')
    setAuthLogin(status || false)
  },[])
  return (
    <>
      <HashRouter>
        <Routes>
          {authLogin ? (
            <>
              <Route path={"/diamond"} element={<DiamondIndex />} />
              <Route
                path={"/diamond/monthreport"}
                element={<MonthReportScreen />}
              />
              <Route path={"/diamond/bulkUpload"} element={<BulkUpload />} />
              <Route path={"/diamond/empReport"} element={<TableNew />} />
              <Route
                path={"/diamond/monthwisereport"}
                element={<LastMonthReport />}
              />
              <Route path={"/diamond/user"} element={<Users />} />
              <Route path={"/qrcode"} element={<Index />} />
            </>
           ) : ( 
             <>
              <Route path={"/login"} element={<Login setAuthLogin={setAuthLogin} />} />
             <Route path="*" element={<Navigate to="/login" />} />
            </>
           )} 
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
