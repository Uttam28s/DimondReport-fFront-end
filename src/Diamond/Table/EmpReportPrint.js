import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import styled from "styled-components";

const Td = styled.td`
  font-size: 1.0em;
  text-align: center;
  color: black;
  border: 1px solid lightgray;
`;

const Tr = styled.tr`
  text-align: center;
  border: 1px solid lightgray;
  height: 50px

`
const Th = styled.th`
    fontSize: 1.5em ;
    border : 1px solid lightgray
`

export default function PrintComponenEmployee(props) {
    let componentRef = useRef();
    console.log("🚀 ~ file: EmpReportPrint.js:27 ~ PrintComponenEmployee ~ props.totalPcs", props.totalPcs)
    return (
        <>
            <div id="print_component">
                {/* button to trigger printing of target component */}
                <div style={{ margin : "50px", paddingBottom: "51px" }}>
                <ReactToPrint
                    trigger={() => <Button>Print pdf    </Button>}
                    content={() => componentRef}
                />
                </div>

                {/* component to be printed */}

                <div style={{ display: "none" }}>
                    <ComponentToPrint ref={(el) => (componentRef = el)} diamondTypeList={props.diamondTypeList} EmployeeName={ props.EmployeeName } totalPcs={props.totalPcs} price={props.price} totalSalary={props.totalSalary} patlaPcs={props.patlaPcs} extraJadaPcs={props.extraJadaPcs} zadaPcs={props.zadaPcs} print={true}  from={props.from} to={props.to} />
                </div>
            </div>
        </>
    );
}
class ComponentToPrint extends React.Component {
    render() {
        const { price,totalPcs, totalSalary, print,EmployeeName,from , to,diamondTypeList } = this.props
        
        return (
            <>

                <div>
                {
                    print ? (
                    <div>
                        <hr />
                        <h4>Company Name : </h4>
                        <h4>Employee Name : {EmployeeName} </h4>
                        <h4>From Date : {from} </h4>
                        <h4>To Date : {to} </h4>

                    <hr />
                    </div>
                    )
                    : ""
                }
                    <table style={{ margin: "50px" ,}} >
                        <Tr>
                            <Th style={{ width: "35%" }}>Type   </Th>
                            <Th style={{ width: "20%" }}>Pcs   </Th>
                            <Th style={{ width: "20%" }}>Price   </Th>
                        </Tr>
                        {diamondTypeList.map((ele) => {
                            return(
                        <Tr>
                            <Td >{ele} Pcs.  </Td>
                            <Td>{totalPcs[`${ele}pcs`]}</Td>
                            <Td> {price[`${ele}Price`]}</Td>
                        </Tr>

                            )
                        })}
                        <Tr>
                            <Td>Total Price </Td>
                            <Td></Td>
                            <Td> {totalSalary}</Td>
                        </Tr>
                    </table>
                </div>

            </>
        )
    }
}

export { ComponentToPrint }