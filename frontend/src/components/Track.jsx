import React from "react";
import { useNavigate } from "react-router-dom";

const Track = (props) => {
  const navigate = useNavigate();
  let task_max = 0;
  let task_done = 0;
  // TODO: Hae taskit backendistä ja laske progress
  return (
    <>
      <div className="card card-bordered">
        <div className="card-body">
          <h3>{props.data.name}</h3>
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
