import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import LazyImage from "../UI/LazyImage/LazyImage";
import Save from "../UI/Save/Save";

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
  margin-left: 10px;
  display: grid;
  padding: 16px;
  grid-template-columns: repeat(auto-fit, 205px);
  grid-gap: 16px;
`;

const GifList = ({ gifs }) => {
  const nothing = !gifs.length ? (
    <div>
      <Global />
      <div>Nothing to see here. Heart some gifs!</div>
    </div>
  ) : null;
  return (
    <div>
      {nothing}
      <Global />
      <Grid>
        {gifs.map((gif) => {
          return (
            <StyledDiv key={gif.id}>
              <Save id={gif.id} isSaved={gif.saved} />
              <LazyImage src={gif.url} alt={gif.title} />
            </StyledDiv>
          );
        })}
      </Grid>
    </div>
  );
};

export default GifList;
