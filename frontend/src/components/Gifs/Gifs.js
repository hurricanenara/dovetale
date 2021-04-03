import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Saved from "../Saved/Saved";
import Search from "../Search/Search";
import GifList from "./GifList";

const Gifs = () => {
  const [gifs, setGifs] = useState([]);

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
        // console.log(sortedSavedGifIds);
        setGifs(flagged);
        // console.log(flagged);
      });
  }, []);

  const filteredGifHandler = (filteredGifs) => {
    setGifs(filteredGifs);
  };

  const filterSavedHandler = (savedGifs) => {
    setGifs(savedGifs);
  };

  return (
    <div>
      <section>
        <StyledDiv>
          <Search onLoadGifs={filteredGifHandler} />
          <div style={{ color: "purple" }}>All</div>
          <Saved onLoadGifs={filterSavedHandler} />
        </StyledDiv>
        <GifList gifs={gifs} />
      </section>
    </div>
  );
};

export default Gifs;
