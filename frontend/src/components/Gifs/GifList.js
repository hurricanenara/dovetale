import React, { useState, useEffect } from "react";
// import classes from "./GifList.module.css";
import styled from "styled-components";
import GifCard from "./GifCard";

const StyledDiv = styled.div`
  color: #afbac5;
  font-size: 18px;
  position: relative;
`;

const StyledSpan = styled.span`
  position: absolute;
`;

const GifList = (props) => {
  return (
    <StyledDiv>
      <h1>Gif List</h1>
      {props.gifs.slice(0, 3).map((gif) => {
        return <GifCard gif={gif} key={gif.id} />;
      })}
    </StyledDiv>
  );
};

export default GifList;
