import styled from "styled-components"


export const SecondaryButton = (props) => {
    return  (<button type="button" style={{ width: "fit-content" }} className="btn btn-secondary funcbtn" onClick={props.onClick}>{props.title}</button>)

}