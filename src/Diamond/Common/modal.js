import { CloseOutlined } from '@mui/icons-material';
import { Button, Spin } from 'antd';
import React from 'react'
import Modal from "react-bootstrap/Modal";

const ModalHeader = (props) => {
    const { title , onClick } = props
  return (
        <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <div onClick={onClick}>
          <CloseOutlined />
        </div>
      </Modal.Header>    
  )
}

const ModalFooter = (props) => {
    const { disabled , onClick ,loader ,handleClose, title} = props
  return (
    <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button
      variant="primary"
      disabled={disabled}
      onClick={onClick}
    >
      {title}{" "}
      {loader ? (
        <>
          {" "}
          &nbsp; <Spin size="small" />{" "}
        </>
      ) : (
        ""
      )}
    </Button>
  </Modal.Footer>  
  )
}
export { ModalHeader , ModalFooter }