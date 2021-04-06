import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Saved = ({ onLoadGifs, allGifs }) => {
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
    for (const gif of allGifs) {
      if (gif.saved) filteredSavedGifs.push(gif);
    }
  }, [savedGifs, onLoadGifs, allGifs]);

  return <StyledDiv>Saved</StyledDiv>;
};

export default Saved;
