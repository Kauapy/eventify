import "./App.css";
import Login from "./componentes/LoginPage/Login.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Login></Login>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login"/>
          <Route path="/register"/>
          <Route path="/home"/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;