import React, { useState } from "react";
import { MainTitle } from "../Common/common";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Table,
  InputNumber,
  Col,
  Row,
  message,
  Spin,
} from "antd";
import { addJangad, updateJangad } from "../ApiConn/Api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const Jangad = () => {
  const [form] = Form.useForm();
  const { id } = useParams()
  const location = useLocation()
  const [tableData, setTableData] = useState(id ? location.state.jangadData   : [{ diamond: 0, weight: 0 }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    let totalDiamond = 0;
    let totalWeight = 0;
    tableData?.map((ele) => {
      totalDiamond += ele?.diamond;
      totalWeight += ele?.weight;
    });
    values["totalDiamond"] = totalDiamond;
    values["totalWeight"] = totalWeight;
    setLoading(true);

    if(id){
      updateJangad(id,{ ...values, jangadData: tableData })
        .then((res) => {
          message.success("Jangad Updated Successfully");
          setLoading(false);
          navigate("/diamond/jangadList");
        })
        .catch((e) => {
          message.error(e?.message || "Something Went Wrong");
        });
    }else{
      addJangad({ ...values, jangadData: tableData })
        .then((res) => {
          message.success("Jangad Added Successfully");
          setLoading(false);
          navigate("/diamond/jangadList");
        })
        .catch((e) => {
          message.error(e?.message || "Something Went Wrong");
        });

    }
  };
  const handleTableChange = (index, dataIndex, value) => {
    const newData = [...tableData];
    newData[index][dataIndex] = value;
    setTableData(newData);
  };
  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      render: (text, record, index) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "Diamond",
      dataIndex: "diamond",
      render: (text, record, index) => (
        <InputNumber
          value={text}
          onChange={(value) => handleTableChange(index, "diamond", value)}
        />
      ),
    },
    {
      title: "Weight",
      dataIndex: "weight",
      render: (text, record, index) => (
        <InputNumber
          value={text}
          onChange={(value) => handleTableChange(index, "weight", value)}
        />
      ),
    },
  ];
  return (
    <>
      <MainTitle />
      <div className="semiTitle">Add Jangad</div>

      <div
        style={{
          paddingTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          label="Add Jangad"
          form={form}
          initialValues={id ? {...location.state, ...{ date : moment(location.state.date) } } : {} }
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            width: "40%",
            padding: "20px",
          }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Row>
            <Col span={12}>
              <Form.Item
                name="jangadNo"
                label="Jangad Number"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "90%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input style={{ width: "90%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="process"
                label="Process"
                rules={[{ required: true }]}
              >
                <Input style={{ width: "90%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                <DatePicker style={{ width: "90%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Table
              dataSource={tableData}
              columns={columns}
              pagination={false}
              // rowKey={(record, index) => index}
            />
            {/* <div className="d-flex justify-content-center"> */}
            <Button
              type="secondary"
              block
              disabled={loading}
              onClick={() =>
                setTableData([...tableData, { diamond: 0, weight: 0 }])
              }
              style={{ width: "100%", marginTop: "10px" }}
            >
              Add More
            </Button>

            {/* </div> */}
          </Form.Item>
          <Form.Item>
            <div className="d-flex justify-content-end">
              <Button disabled={loading} type="secondary" htmlType="submit">
                {id ? 'Update' : 'Submit'}{" "}
                {loading ? <Spin size="small" className="new_spin" /> : ""}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Jangad;
