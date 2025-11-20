import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Page/homepage";
import MachinePage from "./Page/MachinePage";
import Slidebar from "./components/Slidebar";
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="app-layout">
      <Slidebar/>
      <main className="app-main">
        <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage/>}/>
          {/* trang máy, nhận param :machineId */}
          <Route path="/machine/:machineId" element={<MachinePage />} />
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
