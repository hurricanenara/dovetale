import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GifList from "./GifList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Gifs = () => {
  const [gifs, setGifs] = useState([]);
  const [savedGifs, setSavedGifs] = useState([]);
  const [savedGifIds, setSavedGifIds] = useState([]);
  const [clickedState, setClickedState] = useState("all");
  const [searchedGifs, setSearchedGifs] = useState([]);
  const [searched, setSearched] = useState("");
  const searchInput = React.useRef(null);

  const StyledDiv = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 320px;
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
    width: 100%;
  `;

  const bsearch = (nums, target) => {
    let lo = 0,
      hi = nums.length - 1;
    while (lo < hi) {
      let mid = lo + Math.floor((hi - lo + 1) / 2);
      if (target < nums[mid]) {
        hi = mid - 1;
      } else {
        lo = mid;
      }
    }
    return nums[lo] === target ? lo : -1;
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch(
      `http://localhost:3000/gifs?` +
        new URLSearchParams({
          access_token: token,
        })
    )
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        let sortedSavedGifIds = resData.saved.sort((a, b) => a - b);
        let gifs = resData.data;
        const flagged = [];
        gifs.forEach((gifObj) => {
          if (bsearch(sortedSavedGifIds, gifObj.id) >= 0) {
            flagged.push({ ...gifObj, saved: true });
          } else {
            flagged.push({ ...gifObj, saved: false });
          }
        });
        setGifs(flagged);
        setSavedGifIds(sortedSavedGifIds);
        window.localStorage.setItem(
          "savedIds",
          JSON.stringify(sortedSavedGifIds)
        );
      });
  }, []);

  useEffect(() => {
    searchInput.current.focus();
  }, [searched]);

  const searchedGifsHandler = (e) => {
    setSearched(e.target.value);
    const searchedGifs = [];
    for (const gif of gifs) {
      if (gif.title.includes(searched)) {
        searchedGifs.push(gif);
      }
    }
    setClickedState("searched");
    setSearchedGifs(searchedGifs);
  };

  const resetToAll = () => {
    const savedGifIds = JSON.parse(window.localStorage.getItem("savedIds"));
    let sortedSavedGifIds = savedGifIds.sort((a, b) => a - b);

    const flagged = [];
    gifs.forEach((gifObj) => {
      if (bsearch(sortedSavedGifIds, gifObj.id) >= 0) {
        flagged.push({ ...gifObj, saved: true });
      } else {
        flagged.push({ ...gifObj, saved: false });
      }
    });
    setGifs(flagged);
    setSavedGifIds(sortedSavedGifIds);
    setClickedState("all");
  };

  const filterSavedHandler = () => {
    const savedGifIds = JSON.parse(window.localStorage.getItem("savedIds"));
    let sortedSavedGifIds = savedGifIds.sort((a, b) => a - b);
    const flagged = [];
    gifs.forEach((gifObj) => {
      if (bsearch(sortedSavedGifIds, gifObj.id) >= 0) {
        flagged.push({ ...gifObj, saved: true });
      } else {
        flagged.push({ ...gifObj, saved: false });
      }
    });
    setGifs(flagged);
    setSavedGifIds(sortedSavedGifIds);
    const filterSaved = [];
    for (const gif of flagged) {
      if (gif.saved) filterSaved.push(gif);
    }
    setClickedState("saved");
    setSavedGifs(filterSaved);
  };

  const clickedStateHander = (state) => {
    if (state === "all") {
      return [...gifs];
    } else if (state === "saved") {
      return savedGifs;
    } else if ("searched") {
      return searchedGifs;
    }
  };

  const newlyAddedHandler = (ids) => {};

  return (
    <div>
      <section>
        <StyledDiv>
          <SearchWrapper>
            <FontAwesomeIcon
              style={{ paddingLeft: "6%", color: "#c9c9c9" }}
              icon={faSearch}
            />
            <Input
              ref={searchInput}
              type="search"
              value={searched}
              onChange={searchedGifsHandler}
            />
          </SearchWrapper>
          <div style={{ cursor: "pointer" }} onClick={resetToAll}>
            All
          </div>
          <div style={{ width: "10px" }}></div>
          <div style={{ cursor: "pointer" }} onClick={filterSavedHandler}>
            Saved
          </div>
        </StyledDiv>
        <GifList gifs={clickedStateHander(clickedState)} />
      </section>
    </div>
  );
};

export default Gifs;
