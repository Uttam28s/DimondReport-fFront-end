import axios from "axios";
const apiURL = "https://salary-report-api.onrender.com/api/diamond";
// const apiURL = "http://localhost:3003/api/diamond";

// to Add New Worker
export const addWorkerName = async (name, process) => {
  const adminId = localStorage.getItem("AdminId");
  const response = await axios.get(
    `${apiURL}/settings/addworker?name=${name}&process=${process}&adminId=${adminId}`
  );
  return response;
};

export const updateWorker = async (name,process,id) => {
  const adminId = localStorage.getItem("AdminId");
  const response = await axios.put(
    `${apiURL}/settings/updateworker?name=${name}&process=${process}&adminId=${adminId}&id=${id}`
  );
  return response;
}

// For Update the Price
export const updatePrice = async (data, process, adminId) => {
  const response = await axios.put(
    `${apiURL}/settings/addprice?process=${process}&adminId=${adminId}`,
    data
  );
  return response;
};

// get the PriceList
export const getPriceList = async (value) => {
  const adminId = localStorage.getItem("AdminId");
  const response = await axios.get(
    `${apiURL}/settings/getprice?value=${value}&adminId=${adminId}`
  );
  return response.data.pricelist;
};

// to add the report data
export const addReport = async (params, data) => {
  const response = await axios.post(`${apiURL}/report/add`, { params, data });
  return response;
};

export const deleteReport = async (id) => {
  const response = await axios.delete(`${apiURL}/report/delete?id=${id}`);
  return response;
};

export const addBulkReport = async (param, process) => {
  const adminId = localStorage.getItem("AdminId");
  const response = await axios.post(
    `${apiURL}/report/addbulkreport?process=${process}&adminId=${adminId}`,
    param
  );
  return response;
};

// get worker list
export const getWorkerList = async (id) => {
  const adminId = localStorage.getItem("AdminId");
  let data = await axios.get(`${apiURL}/settings/getworker?adminId=${adminId}`);
  localStorage.setItem("EmpList",JSON.stringify(data.data.data));
  return data
};

// get workerlist for bulk with empty data
export const getWorkerListBulk = async (process) => {
  const adminId = localStorage.getItem("AdminId");
  return await axios.get(
    `${apiURL}/settings/getworkerbulk?process=${process}&adminId=${adminId}`
  );
};

// Add Uppad
export const addUppad = async (workerid, upad, month) => {
  month = month.slice(5, 7);
  const response = await axios.post(
    `${apiURL}/salary/upad?workerid=${workerid}&upad=${upad}&month=${month}`
  );
  return response;
};

// get Report Data
export const getReport = async (params) => {
  const response = await axios.get(
    `${apiURL}/report/get?process=${params["process"]}&from=${params["from"]}&to=${params["to"]}&adminId=${params["adminId"]}`
  );
  return response;
};

export const deleteType = async (type,process,adminId) => {
  const response = await axios.delete(
    `${apiURL}/user/deletetype?type=${type}&process=${process}&adminId=${adminId}`
  )
  return response
}

export const getEmployeeReport = async (params) => {
  const response = await axios.get(
    `${apiURL}/employee/report?emp_id=${params["emp_id"]}&from=${params["from"]}&to=${params["to"]}`
  );
  return response.data;
};

export const GetMonthReport = async (params) => {
  const response = await axios.get(
    `${apiURL}/salary/get?&workerid=${params["workerid"]}&month=${params["month"]}&year=${params["year"]}`
  );
  return response;
};

export const ChangePaidStatus = async (params) => {
  const response = await axios.put(
    `${apiURL}/salary/paidStatus?&workerid=${params["workerid"]}&month=${params["month"]}`
  );
  return response;
};

export const FetchMonthData = async (month,year) => {
  let adminId = localStorage.getItem("AdminId");
  const response = await axios.get(
    `${apiURL}/salary/monthwise?&month=${month}&year=${year}&adminId=${adminId}`
  );
  return response.data.data;
};

export const AddUser = async (params) => {
  const response = await axios.post(`${apiURL}/user/add`, params);
  return response.data.data;
};

export const getUsers = async (params) => {
  const response = await axios.get(`${apiURL}/user/getusers`);
  return response.data;
};

export const DeleteUser = async (id) => {
  const response = await axios.delete(`${apiURL}/user/deleteuser?&id=${id}`);
  return response.data;
};

export const DeleteWorker = async (id,adminId) => {
  const response = await axios.delete(`${apiURL}/settings/deleteWorker?&id=${id}&adminId=${adminId}`);
  return response.data;
}

export const LoginConfirm = async (data) => {
  const response = await axios.post(`${apiURL}/user/checkLogin`, data);
  return response.data;
};

export const updateFlag = async (data) => {
  const response = await axios.put(`${apiURL}/user/updateFlag`, data);
  return response.data;
};

export const mainReport = async () => {
  const response = await axios.get(`${apiURL}/report/mainReport`);
  return response.data;
};

export const addType = async (data) => {
  const response = await axios.post(`${apiURL}/user/addType`, data);
  return response.data;
};

export const getDiamondTypeList = async (adminId) => {
  const response = await axios.get(
    `${apiURL}/user/diamondTypeList?adminId=${adminId}`
  );
  localStorage.setItem("typeList",JSON.stringify(response?.data?.data));
  localStorage.setItem("activeTypeList",JSON.stringify(response?.data?.activeData));

  return response.data;
};


export const getSingleReport = async (id) => {
  
  const response = await axios.get(`${apiURL}/report/getsinglereport?&id=${id}`);
  return response
}


export const updateReport = async (params,data) => {
  const response = await axios.put(`${apiURL}/report/updatereport`,{params,data})
  return response

}