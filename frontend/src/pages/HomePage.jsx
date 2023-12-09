import React, { useState, useEffect, useContext } from "react";
import { getUserById } from "../api/users";
import { getTracksByUserId } from "../api/tracks";
import TrackList from "../components/TrackList";
import { AuthContext } from "../components/auth-context";

const placeholder = {
  companyName: "Company",
};

const HomePage = () => {
  const auth = useContext(AuthContext);
  const storageData = JSON.parse(localStorage.getItem("userData")) || null;
  const [userName, setUserName] = useState(null);
  const [jobRole, setJobRole] = useState(null);
  const [trackData, setTrackData] = useState(null);

  useEffect(() => {
    if (storageData && storageData.userId && storageData.token) {
      getTracksByUserId(storageData.token, storageData.userId)
        .then((res) => {
          if (res.name && res.name === "TokenExpiredError") {
            auth.logout();
            throw "tokenExpired";
          } else {
            setTrackData(res);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getUserById(storageData.userId)
        .then((res) => {
          if (res[0] === undefined) {
            throw "emptyResponse";
          } else {
            setUserName(res[0].name);
            setJobRole(res[0].job_role);
          }
        })
        .catch((error) => {
          console.error(error);
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
