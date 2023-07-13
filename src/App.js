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
import { PrivateRoute, RestrictedRoutes } from "./helper/ProtectedRoute";
import UppadDetails from "./Diamond/Table/UppadDetails";
import Jangad from "./Diamond/Jangad/Jangad";
import JangadList from "./Diamond/Jangad/JangadList";

function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<RestrictedRoutes />}>
            <Route path="/" element={<Login />} />
            <Route path={"/login"} element={<Login />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path={"/diamond"} element={<DiamondIndex />} />
            <Route path={"/diamond/bulkUpload"} element={<BulkUpload />} />
            <Route path={"/diamond/empReport"} element={<TableEmpRecord />} />
            <Route
              path={"/diamond/monthwisereport"}
              element={<LastMonthReport />}
            />
            <Route path={"/diamond/user"} element={<Users />} />
            <Route path={"/diamond/worker"} element={<WorkerListTable />} />
            <Route path={"/qrcode"} element={<Index />} />
            <Route path={"/diamond/uppadDetails"} element={<UppadDetails />} />
            <Route path={`/diamond/jangad`} element={<Jangad />} />
            <Route path={`/diamond/jangad/:id`} element={<Jangad />} />
            <Route path={"/diamond/jangadList"} element={<JangadList />} />

          </Route>
        </Routes>
      </HashRouter>
  );
}

export default App;
