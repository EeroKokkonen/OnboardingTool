import { useNavigate } from "react-router-dom";
import { getTasksByTrackId } from "../api/tasks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const TrackPage = () => {
  const [trackData, setTrackData] = useState([]);
  const navigate = useNavigate();
  let { id } = useParams();
  const storageData = JSON.parse(localStorage.getItem("userData")) || null;

  useEffect(() => {
    if (storageData && storageData.userId && storageData.token) {
      getTasksByTrackId(storageData.token, id).then((res) => {
        setTrackData(res);
      });
    }
  }, []);
  let badge = null;
  return (
    <div className="flex flex-col items-center  container mx-auto mt-6">
      <div className="prose mb-6">
        <h1>Products refunding track</h1>
      </div>
      {trackData.map((e) => {
        if (e.is_done) {
          badge = <div className="badge badge-success my-0">Completed</div>;
        } else {
          badge = <div className="badge badge-error my-0">Not completed</div>;
        }

        return (
          <div
            className="prose card w-96 bg-base-100 shadow-xl my-4"
            key={e.name}
          >
            <div className="card-body">
              <h2 className="my-0">{e.name}</h2>
              {badge}
              <div className="card-actions justify-end mt-0">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/task/${e.id}`)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackPage;
