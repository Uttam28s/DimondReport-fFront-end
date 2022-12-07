import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import Index from "./Componants/Index"
import { Navbar } from "./Navbar"
import DiamondIndex from "./Diamond/Diamondindex";
import BulkUpload from "./Diamond/Table/BulkUpload/BulkUpload"
import MonthReportScreen from "./Diamond/MonthReportScreen";
import 'antd/dist/antd.less'
import TableNew from "./Diamond/Table/TableNew";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Navbar />} />
        <Route path={"/diamond"} element={<DiamondIndex />} />
        <Route path={"/monthreport"} element={<MonthReportScreen />} />
        <Route path={"/diamond/bulkUpload"} element={<BulkUpload />} />
        <Route path={"/diamond/empReport"} element={<TableNew />} />
        <Route path={"/qrcode"} element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
