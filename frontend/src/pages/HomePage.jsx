import React, { useState, useEffect, useContext } from "react";
import { getUserById } from "../api/users";
import { getTracksByUserId } from "../api/tracks";
import TrackList from "../components/TrackList";
import { AuthContext } from "../components/auth-context";

/* example data. not final format, replace with fetch */
const test_data = [
  {
    key: "0",
    first_name: "John",
    surname: "Doe",
    role: "Cashier",
    track_data: [
      {
        key: "0A",
        track_label: "track 01",
        track_desc: "Description of the track",
        task_data: [
          {
            key: "0AA",
            task_label: "Task 01",
            task_desc: "Description of the task",
            done: true,
          },
          {
            key: "0AB",
            task_label: "Task 02",
            task_desc: "Description of the task",
            done: false,
          },
          {
            key: "0AC",
            task_label: "Task 03",
            task_desc: "Description of the task",
            done: false,
          },
        ],
      },
      {
        key: "0B",
        track_label: "track 02",
        track_desc: "Description of the track",
        task_data: [
          {
            key: "0BA",
            task_label: "Task 01",
            task_desc: "Description of the task",
            done: true,
          },
          {
            key: "0BB",
            task_label: "Task 02",
            task_desc: "Description of the task",
            done: true,
          },
          {
            key: "0BAC",
            task_label: "Task 03",
            task_desc: "Description of the task",
            done: false,
          },
        ],
      },
      {
        key: "0C",
        track_label: "track 03",
        track_desc: "Description of the track",
        task_data: [
          {
            key: "0CA",
            task_label: "Task 01",
            task_desc: "Description of the task",
            done: false,
          },
          {
            key: "0CB",
            task_label: "Task 02",
            task_desc: "Description of the task",
            done: false,
          },
          {
            key: "0CC",
            task_label: "Task 03",
            task_desc: "Description of the task",
            done: false,
          },
        ],
      },
    ],
  },
];

const placeholder = {
  role: "worker",
  companyName: "Company",
  trackData: test_data[0].track_data,
};

const HomePage = () => {
  const auth = useContext(AuthContext);
  const storageData = JSON.parse(localStorage.getItem("userData")) || null;
  const [userName, setUserName] = useState(null);
  const [jobRole, setJobRole] = useState(null);
  const [trackData, setTrackData] = useState(null);

  useEffect(() => {
    if (storageData && storageData.userId && storageData.token) {
      getTracksByUserId(storageData.token, storageData.userId).then((res) => {
        setTrackData(res);
        console.log(res);
      });
      getUserById(storageData.userId).then((res) => {
        setUserName(res[0].name);
        setJobRole(res[0].job_role)
      });
    }
  }, []);
  const content = (
    <>
      <div className="card card-body">
        <div></div>
        <div className="">
          <div className="card card-bordered">
            <div className="card-body">
              <h1>Welcome to {placeholder.companyName} onboarding tool</h1>
              <p style={{ textTransform: "capitalize" }}>{userName}</p>
              <p style={{ textTransform: "capitalize" }}>{jobRole}</p>
              <br></br>
              <div className="">
                <TrackList data={trackData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const contentNoAuth = (
    <div className="card card-body">
      <div>
        <h1>Please Login to continue</h1>
      </div>
    </div>
  );

  return (
    <>
      {auth.isLoggedIn && content}
      {!auth.isLoggedIn && contentNoAuth}
    </>
  );
};
export default HomePage;
