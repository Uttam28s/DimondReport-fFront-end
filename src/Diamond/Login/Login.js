import React, { useEffect, useState } from "react";
import { MainTitle } from "../Common/common";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { Input, notification, Spin } from "antd";
import { LoginConfirm } from "../ApiConn/Api";
import { useNavigate } from "react-router-dom";
import { useDiamondTypeHook } from "../Hooks/getDiamondType";

const Loader = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
`;
export default function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);
  const onClickHandle = async () => {
    setLoader(true);
    await LoginConfirm({ password: password, name: name })
      .then((res) => {
        // localStorage.setItem("authLogin", true);
        // localStorage.setItem("role", res?.data?.role);
        localStorage.setItem("AdminId", res?.data?._id);
        notification["success"]({
          message: res?.message,
        });

        // props.setAuthLogin(true);
        // let role = localStorage.getItem("role");
        if (res.data?.role === "SuperAdmin") {
          navigate("/diamond/user");
        } else {
          navigate("/diamond");
        }
        setLoader(false);
      })
      .catch((e) => {
        notification["error"]({
          message: e?.response?.data?.message,
        });
        setLoader(false);
      });
  };

  return (
    <div>
      <MainTitle qrhidden ={true} hidden={true} logoutHidden={true} />
        <Form className="container py-5 h-100" onSubmit={onClickHandle}>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-light text-black"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-red-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <Input
                        type="text"
                        placeholder="Enter the Name"
                        className="form-control form-control-lg login-input"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <Input
                        type="password"
                        placeholder="Enter the Password"
                        className="form-control form-control-lg login-input"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button className="btn btn-lg bg-light text-dark border-secondary" disabled={name === "" || password=== ""} type="submit">
                      Login
                      {loader ? (
                        <>
                          &nbsp;<Spin size="small" />{" "}
                        </>
                      ) : (
                        ""
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
    </div>
  );
}
