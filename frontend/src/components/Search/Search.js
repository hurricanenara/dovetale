import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Saved from "../Saved/Saved";

const SearchDiv = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 350px;
  top: 0;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 21px 16px;
  box-sizing: border-box;
  border: 1px solid #c9c9c9;
  border-radius: 2px;
  width: 100%;

  &:hover {
    border: 1px solid #5c6ac4;
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  padding: 5px;
  margin-left: 6px;
`;

const Search = (props) => {
  const { onLoadGifs } = props;
  const [searched, setSearched] = useState("");

  useEffect(() => {}, [searched, onLoadGifs]);

  return (
    <div>
      <SearchWrapper>
        <FontAwesomeIcon
          style={{ paddingLeft: "6%", color: "#c9c9c9" }}
          icon={faSearch}
        />
        <Input
          type="search"
          value={searched}
          onChange={(event) => setSearched(event.target.value)}
        />
      </SearchWrapper>
      {/* <Saved /> */}
    </div>
  );
};

export default Search;
