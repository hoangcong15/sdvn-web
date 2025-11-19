import "./MachinePage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// nếu dùng chung base với Slidebar, có thể import từ 1 file config riêng
const API_BASE = "http://127.0.0.1:3000"; // hoặc IP backend của bạn

function MachinePage() {
  const { machineId } = useParams(); // 👈 lấy param từ URL
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);

  // ví dụ: gọi API lấy detail máy (tuỳ bạn có route nào)
  useEffect(() => {
    // nếu chưa có API detail, tạm thời chỉ set object demo
    async function fetchMachine() {
      try {
        // TODO: sửa URL này thành API thật của bạn, ví dụ /machine-detail/:id
        // const res = await fetch(`${API_BASE}/machine-detail/${machineId}`);
        // const data = await res.json();
        // setMachine(data);
        setMachine({ id: machineId, name: `Máy ${machineId}` });
      } catch (err) {
        console.error("Lỗi lấy thông tin máy:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMachine();
  }, [machineId]);

  if (loading) {
    return <div>Đang tải thông tin máy...</div>;
  }

  if (!machine) {
    return <div>Không tìm thấy thông tin máy #{machineId}</div>;
  }

  return (
    <div>
      <h1>Thông tin máy #{machineId}</h1>
      <p>Tên máy: {machine.name}</p>

      {/* sau này bạn thêm bảng thông số, chart, log… ở đây */}
    </div>
  );
}

export default MachinePage;
