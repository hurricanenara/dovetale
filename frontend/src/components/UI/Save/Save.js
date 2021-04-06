import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const StyledDiv = styled.div`
  position: absolute;
  padding: 8px;
  padding-left: 12px;
  display: flex;
  padding-bottom: 3px;
  top: 0;
  font-size: 24px;
  z-index: 10;
  color: rgba(201, 201, 201, 0.4);
  cursor: pointer;

  &:hover {
    color: rgba(255, 168, 168, 0.79);
  }
`;

const Save = ({ id, isSaved }) => {
  const [saved, setSaved] = useState(isSaved);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const saveGifHandler = (gifId, saved) => {
    !saved ? add(gifId) : remove(gifId);
  };

  const savedIdsSnapshot = () => {
    return JSON.parse(window.localStorage.getItem("savedIds"));
  };

  const updateSavedIdSnapshot = (currentSnapshot, gifId, behavior) => {
    if (behavior === "add") {
      currentSnapshot.push(gifId);
    } else {
      currentSnapshot.splice(currentSnapshot.indexOf(gifId), 1);
    }
    window.localStorage.setItem("savedIds", JSON.stringify(currentSnapshot));
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
      .then(() => {
        setSaved(true);
        const savedIds = savedIdsSnapshot();
        updateSavedIdSnapshot(savedIds, gifId, "add");
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
      .then(() => {
        setSaved(false);
        const savedIds = savedIdsSnapshot();
        updateSavedIdSnapshot(savedIds, gifId, "remove");
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
