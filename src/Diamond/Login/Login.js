import React, { useEffect, useState } from "react";
import { MainTitle } from "../Common/common";
import Button from "react-bootstrap/Button";
import { Input, notification, Spin, Form } from "antd";
import { LoginConfirm } from "../ApiConn/Api";
import { useNavigate } from "react-router-dom";

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
        localStorage.setItem("AdminId", res?.data?._id);
        localStorage.setItem("isLogin", true);
        notification["success"]({
          message: res?.message,
        });

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
      <div className="d-flex justify-content-center align-items-center">
        <Form className="container py-5 h-100" onFinish={onClickHandle}>
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
                    <Button className="btn btn-lg bg-light text-dark border-secondary cursor-pointer" disabled={name === "" || password=== ""} type="submit">
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
    </div>
  );
}
