import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Gifs from "../Gifs/Gifs";

const Saved = ({ onLoadGifs, allGifs, savedGifIds }) => {
  const [savedGifs, setSavedGifs] = useState([]);

  const StyledDiv = styled.div`
    color: #a39ae0;
    cursor: pointer;

    &:hover {
      font-weight: 500;
    }
  `;

  useEffect(() => {
    const filteredSavedGifs = [];
    console.log(savedGifs);
    for (const gif of allGifs) {
      if (gif.saved) {
        filteredSavedGifs.push(gif);
      }
    }
    console.log(filteredSavedGifs);
    // onLoadGifs(filteredSavedGifs);
  }, [savedGifs, onLoadGifs, allGifs]);

  return <StyledDiv>Saved</StyledDiv>;
};

export default Saved;
