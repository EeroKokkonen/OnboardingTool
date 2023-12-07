import React from "react";
import { useNavigate } from "react-router-dom";

const Track = (props) => {
  const navigate = useNavigate();
  let task_max = 0;
  let task_done = 0;

  props.data.task_data.forEach((task_data) => {
    task_max += 1;
    if (task_data.done) {
      task_done += 1;
    }
  });
  return (
    <>
      <div className="card card-bordered">
        <div className="card-body">
          <h3>{props.data.track_label}</h3>
          <p>{props.data.track_desc}</p>
          <div className="card-actions">
            <progress
              className="progress"
              value={task_done}
              max={task_max}
            ></progress>
            <button
              className="btn  btn-primary"
              onClick={() => navigate(`/trackpage/${props.data.key}`)}
            >
              Open
            </button>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
};
export default Track;
