import React from "react";

const TrackProgress = (props) => {
  let doneCounter = 0;
  props.data.forEach((track) => {
    if (track.is_done) doneCounter++;
  });

  const percentage = (doneCounter / props.data.length) * 100;
  return (
    <>
      <progress
        className="progress progress-success"
        value={doneCounter}
        max={props.data.length}
      ></progress>
      <p>{percentage}%</p>
    </>
  );
};
export default TrackProgress;
