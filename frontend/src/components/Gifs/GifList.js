import React, { useState, useEffect } from "react";
// import classes from "./GifList.module.css";
import styled, { createGlobalStyle } from "styled-components";
import LazyImage from "../UI/LazyImage/LazyImage";
import Save from "../UI/Save/Save";
import GifCard from "./GifCard";

const Global = createGlobalStyle`
  body {
    margin-top: 64px;
    padding: 0;
    box-sizing: border-box;
    text-align: center;
  }
`;

const StyledDiv = styled.div`
  color: #afbac5;
  font-size: 18px;
  position: relative;
`;

const Grid = styled.div`
  position: relative;
  display: grid;
  padding: 16px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledSpan = styled.span`
  position: absolute;
`;

const GifList = (props) => {
  return (
    <div>
      <Global />
      <Grid>
        {props.gifs.map((gif) => {
          // return <GifCard gif={gif} key={gif.id} />
          return (
            <StyledDiv key={gif.id}>
              <Save id={gif.id} isSaved={false} />
              <LazyImage src={gif.url} alt={gif.title} />
            </StyledDiv>
          );
        })}
      </Grid>
    </div>
  );
};

export default GifList;
