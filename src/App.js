import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Index from "./Componants/Index"
import { Navbar } from "./Navbar"
import DiamondIndex from "./Diamond/Diamondindex";
import BulkUpload from "./Diamond/Table/BulkUpload/BulkUpload"
import MonthReportScreen from "./Diamond/MonthReportScreen";
import 'antd/dist/antd.less'
import TableNew from "./Diamond/Table/TableNew";

function App() {
  return (
    <>
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<Navbar />} />
        <Route path={"/diamond"} element={<DiamondIndex />} />
        <Route path={"/monthreport"} element={<MonthReportScreen />} />
        <Route path={"/diamond/bulkUpload"} element={<BulkUpload />} />
        <Route path={"/diamond/empReport"} element={<TableNew />} />
        <Route path={"/qrcode"} element={<Index />} />
      </Routes>
    </HashRouter>

    </>
  );
}

export default App;
