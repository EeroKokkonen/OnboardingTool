import SelectTheme from "./components/SelectTheme.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <SelectTheme theme="bumblebee" />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
