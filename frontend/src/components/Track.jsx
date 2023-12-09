import { useNavigate } from "react-router-dom";
import { getTasksByTrackId } from "../api/tasks";
import { useEffect, useState } from "react";
import TrackProgress from "./TrackProgress";

const Track = (props) => {
  const navigate = useNavigate();
  const storageData = JSON.parse(localStorage.getItem("userData")) || null;
  const [taskDone, setTaskDone] = useState(0);
  const [trackData, setTrackData] = useState([]);

  useEffect(() => {
    if (storageData && storageData.userId && storageData.token) {
      getTasksByTrackId(storageData.token, props.data.id).then((res) => {
        if (res !== null && res.length >= 0) {
          setTrackData(res);
          for (let i in res) {
            if (res[i].is_done) {
              setTaskDone(taskDone + 1);
            }
          }
        }
      });
    }
  }, []);

  return (
    <>
      <div className="card card-bordered">
        <div className="card-body">
          <h3>{props.data.name}</h3>
          <div className="card-actions">
            <TrackProgress data={trackData} />
            <button
              className="btn  btn-primary"
              onClick={() => navigate(`/track/${props.data.id}`)}
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
