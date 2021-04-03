import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Saved from "../Saved/Saved";
import Search from "../Search/Search";
import GifList from "./GifList";

const Gifs = () => {
  const [gifs, setGifs] = useState([]);
  const [savedGifs, setSavedGifs] = useState([]);
  const [savedGifIds, setSavedGifIds] = useState([]);
  const [allClicked, setAllClicked] = useState(true);

  const StyledDiv = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 320px;
    top: 0;
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
            console.log("saving as true for", gifObj.id);
            flagged.push({ ...gifObj, saved: true });
          } else {
            flagged.push({ ...gifObj, saved: false });
          }
        });
        setGifs(flagged);
        setSavedGifIds(sortedSavedGifIds);
      });
  }, []);

  const resetToAll = () => {
    setAllClicked(true);
  };

  const filterSavedHandler = () => {
    const filterSaved = [];
    for (const gif of gifs) {
      if (gif.saved) filterSaved.push(gif);
    }
    setAllClicked(false);
    setSavedGifs(filterSaved);
  };

  return (
    <div>
      <section>
        <StyledDiv>
          <Search allGifs={gifs} savedGifIds={savedGifIds} />
          <div style={{ cursor: "pointer" }} onClick={resetToAll}>
            All
          </div>
          <div style={{ cursor: "pointer" }} onClick={filterSavedHandler}>
            Saved
          </div>
        </StyledDiv>
        <GifList gifs={allClicked ? gifs : savedGifs} />
      </section>
    </div>
  );
};

export default Gifs;
