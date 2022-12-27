import { useState, useEffect } from "react";
import { getDiamondTypeList } from "../ApiConn/Api";

export const useDiamondTypeHook = () => {
  const [diamondTypeList, setDiamondTypeList] = useState([]);
  const [loader, setLoader] = useState(false);
  const getList = () => {
    try {
      let id = localStorage.getItem("AdminId");
      getDiamondTypeList(id).then((x) => {
        setDiamondTypeList(x.data);
      });
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const reFetchType = () => {
    getList();
  };

  useEffect(() => {
    getList();
  }, []);

  return { diamondTypeList, loader, reFetchType };
};
