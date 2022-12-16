import axios from 'axios'
// const apiURL = 'https://salary-report-api.onrender.com/api/diamond'
const apiURL = 'http://localhost:3003/api/diamond'
const adminId = localStorage.getItem('AdminId')
console.log("🚀 ~ file: Api.js:50000 ~ adminId", adminId)

// to Add New Worker
export const addWorkerName = async (name,process) => {
  const response = await axios.get(`${apiURL}/settings/addworker?name=${name}&process=${process}&adminId=${adminId}`);
  return response;
};

// For Update the Price
export const updatePrice = async (params) => {
  const response = await axios.get(`${apiURL}/settings/addprice?process=${params['process']}&subcategory=${params['subcategory']}&price=${params['price']}&adminId={adminId}`);
  return response;
};

// get the PriceList
export const getPriceList = async (value) => {
  return await axios.get(`${apiURL}/settings/getprice?value=${value}`);
}

// to add the report data
export const addReport = async (param) => {
  const response = await axios.post(`${apiURL}/report/add`,param);
  return response;
};

export const addBulkReport = async (param,process) => {
  const response = await axios.post(`${apiURL}/report/addbulkreport?process=${process}`,param);
  return response;
};

// get worker list
export const getWorkerList = async () =>{
  return await axios.get(`${apiURL}/settings/getworker?adminId=${adminId}`);
}

// get workerlist for bulk with empty data
export const getWorkerListBulk = async (process) =>{
  return await axios.get(`${apiURL}/settings/getworkerbulk?process=${process}?adminId=${adminId}`);
}

// Add Uppad 
export const addUppad = async (workerid,upad,month) => {
  month = month.slice(5, 7);
  const response = await axios.post(`${apiURL}/salary/upad?workerid=${workerid}&upad=${upad}&month=${month}`);
  return response;
};

// get Report Data
export const getReport = async (params) =>{
  const response = await axios.get(`${apiURL}/report/get?process=${params['process']}&from=${params['from']}&to=${params['to']}`);
  return response;
}

export const getEmployeeReport = async (params) => {
  const response = await axios.get(`${apiURL}/employee/report?emp_id=${params['emp_id']}&from=${params['from']}&to=${params['to']}`)
  return response.data;
}

export const GetMonthReport = async (params) =>{
  const response = await axios.get(`${apiURL}/salary/get?&workerid=${params['workerid']}&month=${params['month']}`);
  return response;
}

export const ChangePaidStatus = async (params) => {
  const response = await axios.put(`${apiURL}/salary/paidStatus?&workerid=${params['workerid']}&month=${params['month']}`);
  return response;
}

export const FetchMonthData = async (month) => {
  const response = await axios.get(`${apiURL}/salary/monthwise?&month=${month}`);
  return response.data.data;
}

export const AddUser = async (params) => {
  const response = await axios.post(`${apiURL}/user/add`,params);
  return response.data.data;
}

export const getUsers = async (params) => {
  const response = await axios.get(`${apiURL}/user/getusers`);
  return response.data;
}

export const DeleteUser = async (id) => {
  const response = await axios.delete(`${apiURL}/user/deleteuser?&id=${id}`);
  return response.data;
}

export const LoginConfirm = async(data) => {
  const response = await axios.post(`${apiURL}/user/checkLogin`,data);
  return response.data;
}

export const updateFlag = async(data) => {
  const response = await axios.put(`${apiURL}/user/updateFlag`,data);
  return response.data;
}
