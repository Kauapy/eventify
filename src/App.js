import "./App.css";
import Login from "./componentes/LoginPage/Login.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./componentes/Home/Home.jsx";
import Register from "./componentes/Register/Register.jsx";
import AdminDashboard from "./componentes/Home/AdminDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login></Login>}/>
          <Route path="/register" element={<Register></Register>}/>
          <Route path="/home" element={<Home></Home>}/>
          <Route path="/admin" element={<AdminDashboard></AdminDashboard>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;