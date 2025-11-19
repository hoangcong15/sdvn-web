import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../img/images.png";
import "./Slidebar.css";

const API_BASE = "http://10.73.132.104:3000"

export default function Slidebar(){
    const localtion = useLocation();     //
    const navigate = useNavigate();
    const [lines, setLines] = useState([]);     //lưu trạng thái sau khi truyền biến vào
    const [hoveredLine, setHoveredLine] = useState(null);
    const [machines, setMachines] = useState([]);
    const [loadingMachine, setLoadingmachine] = useState(false);

    //Lấy danh sách Line từ backend (bảng productionLine)
    useEffect(()=>{
        const fetchLines = async ()=>{
            try{
                const res = await fetch(`${API_BASE}/productionline`);
                const data = await res.json();
                // giả sử API trả: [{ id, name }, ...] (name = "550B", "960B"...)
                setLines(data);
            } catch (err){
                console.error("Lỗi lấy danh sách Line:", err);
            }
        }
        fetchLines();

    },[]);

    //Khi hover 1 line → gọi API lấy máy theo LineID
    const handleLineMouseEnter = async (line) =>{
        setHoveredLine(line);
        setLoadingmachine(true);

        try{
            const res = await fetch(`${API_BASE}/machine?lineId=${line.id}`);
            const data = await res.json();
            // giả sử trả về [{id, machine_name}, ...]
            setMachines(data);

        } catch(err){
            console.error("Lỗi lấy danh sách máy:", err);
            setMachines([]);

        }
        finally{
            setLoadingmachine(false);
        }
    };


    //Khi rời khỏi cả slidebar + popup -> ẩn group
    const handleLineMouseLeaveSliderbarArea = () => {
        setHoveredLine(null);
        setMachines([]);
    };

    //helper kiểm tra  route hiện tại

    const isActive = (path) => localtion.pathname === path;

    return(
        <div className="sidebar-wrapper" onMouseDown={handleLineMouseLeaveSliderbarArea}>
            <aside className="sidebar">
                {/* Logo + text */}
                <div className="sidebar-header">
                    <img src={logo} alt="logo SDVN" className="sidebar-logo"/>
                    <span className="sidebar-title">IoT Xưởng Cao Áp</span>
                </div>

                {/* Nut Home */}
                <nav className="sidebar-nav">
                    <Link to="/" className={`nav-button ${isActive("/") ? "nav-button-active" : ""}`}>
                    🏠 Home
                    </Link>

                    {/* Các Line sản xuất */}
                    <div className="sidebar-lines-label">Line sản xuất</div>
                    {lines.map((line)=>(
                        <button key={line.id} className="line-button" onMouseEnter={() => handleLineMouseEnter(line)}>{line.name}</button>
                    ))}
                </nav>
            </aside>
            {/* Popup máy */}
            {hoveredLine &&(
                <div className="machines-popup">
                    <div className="machines-popup-header">
                        <h3>{hoveredLine.name}</h3>
                    </div>
                    <div className="machines-popup-body">
                        {loadingMachine ?(
                            <p>Loading...</p>

                        ): machines.length === 0 ?(
                            <p>No Machines</p>
                        ):(
                            // <ul>
                            //     {machines.map((m) =>(
                            //         <li key={m.id}>
                            //             {m.machine_name || m.name || `Máy ${m.id}`}
                            //         </li>
                            //     ))}
                            // </ul>
                            <div className="machine-list">
                               {machines.map((m) => (
                                   <button
                                       key={m.id}
                                       className="machine-button"
                                       onClick={() => navigate(`/machine/${m.id}`)}>
                                       {m.machine_name || m.name || `Máy ${m.id}`}
                                   </button>
                               ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>

    );

}