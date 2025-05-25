import "./App.css";
import input from "./componentes/Input/input";
import Header from "./componentes/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/register"/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;