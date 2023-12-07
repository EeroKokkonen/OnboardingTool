import React from "react";
import Track from "./Track";

const TrackList = (props) => {
  if (props.data) {
    return (
      <>
        {props.data.map((track) => (
          <Track data={track} key={track.name} />
        ))}
      </>
    );
  }
  return "Something went wrong";
};
export default TrackList;
