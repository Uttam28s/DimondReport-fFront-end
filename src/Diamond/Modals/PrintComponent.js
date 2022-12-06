import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import styled from "styled-components";

const H2 = styled.h2`
    text-align: center;
    color : black;
    background-color : lightblue
`

export default function PrintComponent(props) {
    let componentRef = useRef();
    return (
        <>
            <div id="print_component">
                <ReactToPrint
                    trigger={() => <Button>Print pdf</Button>}
                    content={() => componentRef}
                />
                <div style={{ display: "none", margin: "20px" }}>
                    <ComponentToPrint ref={(el) => (componentRef = el)} data={props.report} EmployeeName={props.EmployeeName} />
                </div>
            </div>
        </>
    );
}

// component to be printed
const MonthName = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
}

class ComponentToPrint extends React.Component {
    render() {
        return (
            <div>
            <hr />
                <div>
                    <H2 >Monthly Report </H2>
                </div>
                <hr />
                <h4>Employee Name : {this.props.EmployeeName} </h4>
                <hr />
                <h4>Month : {MonthName[this.props.data.month]}</h4>
                <h4>Upad :  {this.props.data.upad}</h4>
                <h4>This Month Earned : {this.props.data.total} </h4>
                {this.props.data.jama ? <h4> Previous Month Jama: {this.props.data.jama}</h4> : ''}
            </div>
        );
    }
}

