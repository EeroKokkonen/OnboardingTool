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
    <div className="bg-base-200 h-screen flex justify-center min-h-screen h-fit">
      <div className="card card-body max-w-4xl">
          <div className="card card-bordered bg-base-100">
            <div className="card-body shadow-lg">
              <h1 className="text-3xl font-bold mb-6">Welcome to {placeholder.companyName} onboarding tool</h1>
              <p className="text-2xl" style={{ textTransform: "capitalize" }}>{userName}</p>
              <p className="text-sm font-bold" style={{ textTransform: "capitalize" }}>{jobRole}</p>
              <br></br>
              <div className="">
                <TrackList data={trackData} />
              </div>
            </div>
          </div>
      </div>
    </div>
  );

  const contentNoAuth = (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-4xl font-bold">Please Login to continue</h1>
        </div>
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
