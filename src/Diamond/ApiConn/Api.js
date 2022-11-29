import axios from 'axios'
const apiURL = 'http://localhost:3003/api/diamond'

// to Add New Worker
export const addWorkerName = async (name,process) => {
  console.log("Api is Called", name,process)
  const response = await axios.get(`${apiURL}/settings/addworker?name=${name}&process=${process}`);
  console.log("dddddddd", response);
  return response;
};

// For Update the Price
export const updatePrice = async (params) => {
  console.log("Api is Called", params)
  const response = await axios.get(`${apiURL}/settings/addprice?process=${params['process']}&subcategory=${params['subcategory']}&price=${params['price']}`);
  return response;
};

// get the PriceList
export const getPriceList = async () =>{
  return await axios.get(`${apiURL}/settings/getprice`);
}

// to add the report data
export const addReport = async (param) => {
  console.log("Api is Called", param)
  const response = await axios.post(`${apiURL}/report/add`,param);
  console.log("dddddddd", response);
  return response;
};

export const addBulkReport = async (param,process) => {
  console.log("Api is Called", param)
  const response = await axios.post(`${apiURL}/report/addbulkreport?process=${process}`,param);
  console.log("dddddddd", response);
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
  console.log("dddddddd", response);
  return response;
};

// get Report Data
export const getReport = async (params) =>{
  console.log("Api is called",params)
  // 2022-12-22T01:14:00.000Z

  // let params = {
  //   to : 10,
  //   from : 0
  // }
  // const response = await axios.get(`${apiURL}/report/get?process=${params['process']}`);
  const response = await axios.get(`${apiURL}/report/get?process=${params['process']}&from=${params['from']}&to=${params['to']}`);

  console.log("dddddddd", response);
  return response;
}

export const getEmployeeReport = async (params) => {
  console.log("Api is called",params)
  const response = await axios.get(`${apiURL}/employee/report?emp_id=${params['emp_id']}&from=${params['from']}&to=${params['to']}`)
  return response.data;
}

export const GetMonthReport = async (params) =>{
  console.log("Api is called",params)
  // 2022-12-22T01:14:00.000Z

  // let params = {
  //   to : 10,
  //   from : 0
  // }
  // const response = await axios.get(`${apiURL}/report/get?process=${params['process']}`);
  const response = await axios.get(`${apiURL}/salary/get?&from=${params['from']}&to=${params['to']}&workerid=${params['workerid']}&month=${params['month']}`);

  console.log("dddddddd", response);
  return response;
}