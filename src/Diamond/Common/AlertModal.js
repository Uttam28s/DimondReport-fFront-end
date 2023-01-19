import { CloseOutlined } from '@mui/icons-material'
import { Button } from 'antd'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

const AlertModal = (props) => {
    console.log("🚀 ~ file: AlertModal.js:6 ~ AlertModal ~ props", props)
    return (
    <Modal show={props.statusFlag} onHide={props.handleCloseData}>
      <Modal.Header>
        <h5> Are You Sure want To change the Status</h5>
        <div onClick={props.handleCloseData}>
          <CloseOutlined />
        </div>
      </Modal.Header>
      <Modal.Footer>
      <Button variant="secondary" onClick={props.handleCloseData}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={() => props.callchangeStatus()}>
          Yes
        </Button>
      </Modal.Footer>
      </Modal>
  )
}

export default AlertModal