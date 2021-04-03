import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Save from "../UI/Save/Save";

const StyledDiv = styled.div`
  border: 1px solid grey;
  padding: 24px;
  font-size: 18px;
  position: relative;
`;

const StyledSpan = styled.span`
  position: absolute;
  left: 1.5rem;
  bottom: -0.05rem;
`;

const GifCard = (props) => {
  const { gif } = props;
  return (
    <StyledDiv key={gif.id}>
      <img src={gif.url} />
      <Save />
      <StyledSpan>{gif.title}</StyledSpan>
    </StyledDiv>
  );
};

export default GifCard;
