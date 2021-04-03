import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const StyledDiv = styled.div`
  position: absolute;
  padding: 8px;
  display: flex;
  padding-bottom: 3px;
  top: 0;
  font-size: 30px;
  z-index: 10;
  color: rgba(255, 255, 255, 0.37);
  cursor: pointer;

  &:hover {
    color: #ff5252;
  }
`;

const Save = ({ id, isSaved }) => {
  const [saved, setSaved] = useState(isSaved);

  const saveGifHandler = (gifId, saved) => {
    const token = window.localStorage.getItem("token");
    const params = {
      gif_id: gifId,
    };
    fetch(`http://localhost:3000/saved-list`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json", "X-Authorization": token },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (saved) {
          setSaved(false);
        } else {
          setSaved(true);
        }
        console.log("saved", gifId);
      });
  };

  const symbol = saved ? (
    <FontAwesomeIcon icon={faHeart} />
  ) : (
    <FontAwesomeIcon icon={farHeart} />
  );
  return (
    <StyledDiv onClick={() => saveGifHandler(id, saved)}>{symbol}</StyledDiv>
  );
};

export default Save;
