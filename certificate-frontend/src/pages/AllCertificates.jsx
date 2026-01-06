import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllCertificates = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/certificates");
        setCertificates(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>All Certificates</h1>

      {certificates.length === 0 ? (
        <p>No certificates added yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
          }}
        >
          <thead>
            <tr style={{ background: "#eee", textAlign: "left" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Student</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Course</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>View</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((c) => (
              <tr key={c._id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{c.studentName}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{c.courseName}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{c.date}</td>

                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <Link
                    to={`/certificate/${c._id}`}
                    style={{
                      padding: "6px 12px",
                      background: "#333",
                      color: "#fff",
                      textDecoration: "none",
                      borderRadius: "5px",
                    }}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllCertificates;
