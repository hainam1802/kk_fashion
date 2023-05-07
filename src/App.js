import { Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./containers/DefaultLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<DefaultLayout />} />
    </Routes>
  );
};

export default App;
