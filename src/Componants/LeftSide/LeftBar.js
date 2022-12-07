import React, { useState, useEffect } from "react";
// import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import CardContent from "@mui/material/CardContent";
import 'react-notifications/lib/notifications.css';
import { Button } from "@mui/material";

const LeftBar = (props) => {
  const [currentCode, setCurrentCode] = useState("");
  const [previousCode, setPreviousCode] = useState("");
  const [sumOfCode, setsumOfCode] = useState("");

  useEffect(() => {
    focusInput();
  })

  const focusInput = () => {
    document.getElementById("qrcodeBox").focus();

  }

  useEffect(() => {
    let total1 = 0,
      total2 = 0;

    // props.data.map((d) => {

    //   total1 = total1 + (Number(d.split(",").slice(-2)[0])||0);
    //   total2 = total2 +( Number(d.split(",").slice(-2)[1])||0);
    // });
    // setsumOfCode({ total1, total2 });
  }, [props.data.length]);

  const setQrCode = (data) => {
    setCurrentCode(data);
  }

  const focusAndSum = () => {
    setPreviousCode(currentCode);

    setCurrentCode("");
    focusInput();

    //  let ary = props.data; 
    //  currentCode &&  ary.push(currentCode)
    currentCode && props.setdata(currentCode)
  }

  const handleClearData = () => {
    setCurrentCode("");
    setsumOfCode("");
    setPreviousCode("");
    let Cate = JSON.parse(localStorage.getItem("category"));
    Cate.map((d, i) => {
      Cate[i].list = []
    })
    window.localStorage.setItem('category', JSON.stringify(Cate))
    window.localStorage.setItem("uncate", JSON.stringify([]));
    window.localStorage.setItem("allcode", []);
    props.clear()
    focusInput()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      focusAndSum()
    }
  }

  return (
    <div className="left-bar-wrapper seprater">
      <NotificationContainer />
      <div className="title">Code Scanner</div>
      <p className="sep"></p>
      <div className="qrcode-vid-wrapper">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: "0.9 0 auto" }}>
            {/* <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  setPreviousCode(currentCode);
                  setCurrentCode(result?.text);
                  let ary = props.data; 
                  ary.push(result?.text)
                  props.setData(ary)
                }
                if (!!error) {
                 let b =  window.MediaStream.id
                  let a  = String(error).includes("device not found") ? "Requested Device Not Found":"Scanning Code Not Sucessfull"
                  NotificationManager.error(a);
                }
              }}
              constraints={{facingMode: 'environment'}}

              style={{ width: "100%" }}
            />  */}



          </CardContent>
        </Card>
      </div>
      <div className="bottam-wraaper">
        <div className="code-box">
          <Card>
            <CardContent className="p-1">
              <p className="title font-medium fnt-white" >Scanned Code : </p>
              <input type="text" className=" font-medium bk-white input-box" id="qrcodeBox" onKeyDownCapture={handleKeyDown} onChange={(e) => {
                setQrCode(e.target.value)

              }} value={currentCode} />
              {/* {currentCode || ""} */}

            </CardContent>
          </Card>
        </div>
        <div className="code-box">
          <Card>
            <CardContent className="p-1">
              <p className="title font-medium fnt-white">Previous Code : </p>
              {/* <p className="font-medium bk-white input-box">
                {previousCode || ""}
              </p> */}
              <input type="text" className=" font-medium bk-white input-box" id="qrcodeBox" value={previousCode || ""} />
            </CardContent>
          </Card>
        </div>
        {" "}<div className="d-flex"></div>
        <Button variant="contained"
          onClick={() => { focusAndSum() }}
          onKeyDown={handleKeyDown}>SCAN</Button>
        <Button variant="contained" onClick={handleClearData}>Clear</Button>    </div>
    </div>
  );
};

export default LeftBar;
