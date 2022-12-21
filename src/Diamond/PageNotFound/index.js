import styled from '@emotion/styled';
import React from 'react'


const P = styled.h6`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 50px;
    color:red;
    transform: translate(-50%, -50%);
`
const PageNotFound = () => {
  return (
    <>
    <P>Page Not Found</P>
    </>
  )
}

export default PageNotFound;