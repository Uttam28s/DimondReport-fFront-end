import { useState, useEffect } from "react";
import { getWorkerList } from "../ApiConn/Api";

export const useWorkerHook = () => {
  const [empList, setEmpList] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const getEmployee = () => {
    try {
      setError("");
      let id = localStorage.getItem("AdminId");
      getWorkerList(id).then((x) => {
        setEmpList(x.data.data);

      });
      setLoader(false);
    } catch (error) {
      setError(error.message);
      setLoader(false);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  return { empList, error, loader };
};
