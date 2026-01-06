import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // لو مفيش توكن → نرجّعه على اللوجين
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchCertificates();
  }, []);

  // دالة تجيب الشهادات
  const fetchCertificates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/certificates", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCertificates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الشهادة؟")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/certificates/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("تم حذف الشهادة بنجاح");
      fetchCertificates(); // refresh list
    } catch (err) {
      console.log(err);
      alert("حدث خطأ أثناء الحذف");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>لوحة التحكم</h2>
        <button onClick={() => navigate("/add-certificate")} className="dashboard-add-btn">
          + إضافة شهادة
        </button>
        <button onClick={logout} className="dashboard-logout-btn">تسجيل خروج</button>
      </div>

      <div className="dashboard-list">
        {certificates.length === 0 ? (
          <p className="dashboard-empty">لا توجد شهادات حتى الآن.</p>
        ) : (
          certificates.map((c) => (
            <div key={c._id} className="dashboard-card">
              <h3>{c.name}</h3>
              <p><span className="dashboard-card-strong">رقم الهوية:</span> {c.nationalId}</p>
              <p><span className="dashboard-card-strong">الجنسية:</span> {c.nationality}</p>
              <div className="dashboard-btn-group">
                <button 
                  className="dashboard-view-btn"
                  onClick={() => navigate(`/certificate/${c._id}`)}
                >
                  عرض الشهادة
                </button>
                <button 
                  className="dashboard-edit-btn"
                  onClick={() => navigate(`/edit-certificate/${c._id}`)}
                >
                  ✏️ تعديل
                </button>
                <button 
                  className="dashboard-delete-btn"
                  onClick={() => handleDelete(c._id)}
                >
                  🗑️ حذف
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
