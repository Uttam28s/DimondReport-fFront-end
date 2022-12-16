import React, { useState } from "react";
import { MainTitle } from "../Common/common";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { Input, notification } from "antd";
import { LoginConfirm } from "../ApiConn/Api";
import { useNavigate } from "react-router-dom";

const FormDiv = styled(Form)`
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
`;
export default function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  
  const  onClickHandle = async () =>  {
      let res = await LoginConfirm({ password : password, name : name})
      if(res.data){ 
        notification['success']({
            message : res.success
        })
        props.setAuthLogin(true)
        navigate('/diamond')
        localStorage.setItem('authLogin',true)
        localStorage.setItem('role', res?.data?.role)
        localStorage.setItem('AdminId', res?.data?._id)

      }else{
        notification['error']({
            message : res?.error
        })
      }
  }

  return (
    <div>
      <MainTitle hidden={true} logoutHidden={true} />
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
                      className="form-control form-control-lg"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <Input
                      type="password"
                      placeholder="Enter the Password"
                      className="form-control form-control-lg"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    className="btn btn-lg"
                    type="submit"
                  >
                    Login
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
