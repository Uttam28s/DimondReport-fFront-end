import axios from 'axios'
const apiURL = 'http://localhost:3003/api/diamond'

// to Add New Worker
export const addWorkerName = async (name,process) => {
  const response = await axios.get(`${apiURL}/settings/addworker?name=${name}&process=${process}`);
  return response;
};

// For Update the Price
export const updatePrice = async (params) => {
  const response = await axios.get(`${apiURL}/settings/addprice?process=${params['process']}&subcategory=${params['subcategory']}&price=${params['price']}`);
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
  return await axios.get(`${apiURL}/settings/getworker`);
}

// get workerlist for bulk with empty data
export const getWorkerListBulk = async (process) =>{
  return await axios.get(`${apiURL}/settings/getworkerbulk?process=${process}`);
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