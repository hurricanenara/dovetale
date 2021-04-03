import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const StyledDiv = styled.div`
  position: absolute;
  padding: 8px;
  padding-left: 12px;
  display: flex;
  padding-bottom: 3px;
  top: 0;
  font-size: 28px;
  z-index: 10;
  color: rgba(255, 255, 255, 0.37);
  cursor: pointer;

  &:hover {
    color: rgba(255, 168, 168, 0.79);
  }
`;

const Save = ({ id, isSaved }) => {
  const [saved, setSaved] = useState(isSaved);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [heart, setHeart] = useState(<FontAwesomeIcon icon={farHeart} />);

  const saveGifHandler = (gifId, saved) => {
    if (!saved) {
      add(gifId);
    } else {
      remove(gifId);
    }
  };

  const add = (gifId) => {
    const params = {
      gif_id: gifId,
    };
    fetch(`http://localhost:3000/saved-list`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        saved ? setSaved(false) : setSaved(true);
      });
  };

  const remove = (gifId) => {
    fetch(`http://localhost:3000/saved-list/${gifId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        saved ? setSaved(false) : setSaved(true);
      });
  };

  const handleHover = (status) => {
    if (status) {
      console.log("hovered", status);
      setHeart(() => {
        // debugger;
        <FontAwesomeIcon icon={faHeartBroken} />;
        console.log(heart);
      });
    }
  };

  const symbol = saved ? <FontAwesomeIcon icon={faHeart} /> : heart;
  return (
    <StyledDiv
      onMouseEnter={() => handleHover(saved)}
      onClick={() => saveGifHandler(id, saved)}>
      {symbol}
    </StyledDiv>
  );
};

export default Save;
