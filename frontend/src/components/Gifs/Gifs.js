import React, { useState, useEffect } from "react";
import GifList from "./GifList";

const Gifs = () => {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/gifs`)
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData.data);
        setGifs(resData.data);
      });
  }, []);

  return (
    <div>
      <section>
        <GifList gifs={gifs} />
      </section>
    </div>
  );
};

export default Gifs;
