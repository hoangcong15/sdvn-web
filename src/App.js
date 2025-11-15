import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Page/homepage";
import Slidebar from "./components/Slidebar";
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="app-layout">
      <Slidebar/>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
