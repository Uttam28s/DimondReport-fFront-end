import { DeleteOutlined, EditOutlined, Print } from "@mui/icons-material";
import { Button } from "antd";

export const SecondaryButton = (props) => {
  return (
    <button
      type="button"
      style={{ width: "fit-content" }}
      className="btn btn-secondary funcbtn"
      onClick={props.onClick}
      onTouchMove={props.onHover}
    >
      {props.title}
    </button>
  );
};


export const DeleteIconButton = ({  handleClick, disabled }) => {
  return (
    <Button danger disabled={disabled} className={` d-flex align-content-center mx-1 border-0 hover:!text-black `} onClick={() => handleClick()}><DeleteOutlined /></Button>
  )
}
export const EditIconButton = ({ handleClick }) => {
  return (
    <Button className='border-0 bg-gray-200  d-flex align-content-center hover:!text-black' onClick={() => handleClick()}><EditOutlined /></Button>
  )
}

export const PrintIconButton = ({ handleClick }) => {
  return (
    <Button className='border-0 bg-blue-500 text-black   d-flex align-content-center' onClick={() => handleClick()}><Print /></Button>
  )
}