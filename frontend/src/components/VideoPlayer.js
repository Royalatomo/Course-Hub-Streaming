import React, { useState } from "react";
import "./video.scss";

function VideoPlayer({ playingLecture }) {
  const [player, setPlayer] = useState("youtube");

  return (
    <>
      <select name="" id="change-server" onChange={(e) => setPlayer(e.currentTarget.value)}>
        <option value="youtube">Youtube</option>
        <option value="doodstream">Doodstream</option>
        <option value="streamtape">StreamTape</option>
      </select>

      <div className="frame-container">
        <iframe
          title="Video"
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          src={playingLecture?.links?playingLecture.links[player]:""}
        ></iframe>
      </div>
    </>
  );
}

export default VideoPlayer;
