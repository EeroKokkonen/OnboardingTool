import SelectTheme from "./components/SelectTheme.jsx";
import HomePage from "./pages/HomePage.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import Navbar from "./components/Navbar.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <SelectTheme theme="bumblebee" />
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="task/:id" element={<TaskPage />} />
      </Routes>
    </>
  );
}

export default App;
