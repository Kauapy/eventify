import "./App.css";
import Login from "./componentes/LoginPage/Login.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./componentes/Home/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Login></Login>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login"/>
          <Route path="/register" element={<Navigate to="/Register"></Navigate>}/>
          <Route path="/home" element={<Home></Home>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;