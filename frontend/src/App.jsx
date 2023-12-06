import React, { useState, useCallback, useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContext } from "./components/auth-context";
import SelectTheme from "./components/SelectTheme.jsx";
import HomePage from "./pages/HomePage.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import TrackPage from "./pages/TrackPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Authenticate from "./pages/Authenticate.jsx";

const queryClient = new QueryClient();

let logoutTimer;

function App() {
  const [token, setToken] = useState(false);
  const [userId, setuser] = useState(false);
  const [name, setname] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(false);
  const navigate = useNavigate();

  const login = useCallback((uid, token, name) => {
    setToken(token);
    setuser(uid);
    setname(name);
    const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token,
        name,
        expiration: tokenExpirationDate.toISOString(),
      }),
    );
    navigate('/');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  const logout = useCallback(() => {
    setToken(null);
    setuser(null);
    setname('');
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);


    let routes;

    if (token) {
      routes = (
        <React.Fragment>
          <Route exact path="/" element={<HomePage />} />
          <Route path="track/:id" element={ <TrackPage/> } />
          <Route path="task/:id" element={<TaskPage />} />
        </React.Fragment>
      );
    }
    else {
      routes = (
        <React.Fragment>
          <Route exact path="/auth" element={<Authenticate />} />
          <Route exact path="/" element={<HomePage />} />
          <Route path="track/:id" element={ <TrackPage/> } />
          <Route path="task/:id" element={<TaskPage />} />
        </React.Fragment>
      );
    }

  return (
     <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        login,
        logout,
        name,
      }}
      >
    <QueryClientProvider client={queryClient}>
      <SelectTheme theme="bumblebee" />
      <Navbar logout={logout}/>
      <Routes>
        {routes}
      </Routes>
    </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
