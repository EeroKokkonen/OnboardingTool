import React from "react";
import Track from "./Track";

const TrackList = (props) => {
  return (
    <>
      {props.data.map((track) => (
        <Track data={track} key={track.key} />
      ))}
    </>
  );
};
export default TrackList;
