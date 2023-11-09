import React from "react";
import TrackList from "../components/TrackList";
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
const data = test_data[0];
const HomePage = () => {
  return (
    <>
      <div className="card card-body">
        <div>
          <h1>Welcome Company onboarding tool, {data.first_name}</h1>
        </div>
        <div className="drawer divider divider-horizontal">
          <div className="card card-bordered">
            <div className="card-body"></div>
            <h1>User Info</h1>
            <p>
              Name: {data.first_name} {data.surname}
            </p>
            <p>Role: {data.role}</p>
          </div>
        </div>
        <TrackList data={data.track_data} />
      </div>
    </>
  );
};
export default HomePage;
