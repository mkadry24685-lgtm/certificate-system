import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/CertificateView.css";

const CertificateView = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://certificate-system-backend.vercel.app/api/certificates/${id}`);
        setCertificate(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  if (!certificate) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>جاري تحميل الشهادة...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="certificate-view-container">
      <div className="certificate-view-card">

        <div className="certificate-view-title-group">
          <h2 className="certificate-view-title-ar">شهادة صحية</h2>
        </div>

        <div className="certificate-view-photo-container" style={{ margin: "0 auto 16px" }}>
          {certificate.photoUrl ? (
            <img
              src={certificate.photoUrl}
              alt="Photo"
              className="certificate-view-photo"
            />
          ) : (
            <div className="photo-placeholder">لا توجد صورة</div>
          )}
        </div>

        <div className="certificate-view-info-grid">

          <div className="certificate-view-info-row">
            <span className="certificate-view-label">الأمانة</span>
            <div className="input-box">{certificate.amana || '-'}</div>
          </div>
          <div className="certificate-view-info-row">
            <span className="certificate-view-label">البلدية</span>
            <div className="input-box">{certificate.baladiya || '-'}</div>
          </div>
          <div className="certificate-view-info-row">
            <span className="certificate-view-label">الاسم</span>
            <div className="input-box">{certificate.name || '-'}</div>
          </div>
          <div className="certificate-view-info-row">
            <span className="certificate-view-label">رقم الهوية</span>
            <div className="input-box">{certificate.nationalId || '-'}</div>
          </div>
          <div className="certificate-view-info-row">
            <span className="certificate-view-label">الجنس</span>
            <div className="input-box">{certificate.gender || '-'}</div>
          </div>

          <div className="certificate-view-info-row">
            <span className="certificate-view-label">الجنسية</span>
            <div className="input-box">{certificate.nationality || '-'}</div>
          </div>
          <div className="certificate-view-info-row">
            <span className="certificate-view-label">المهنة</span>
            <div className="input-box">{certificate.job || '-'}</div>
          </div>
          <div className="certificate-view-info-row">
            <span className="certificate-view-label">رقم الشهادة الصحية</span>
            <div className="input-box">{certificate.healthCertificateNumber || '-'}</div>
          </div>


          <div className="certificate-view-info-row">
            <span className="certificate-view-label">تاريخ إصدار الشهادة الصحية (هجري)</span>
            <div className="input-box">{certificate.healthCertIssueDateHijri || '-'}</div>
          </div>

          <div className="certificate-view-info-row">
            <span className="certificate-view-label">تاريخ إصدار الشهادة الصحية (ميلادي)</span>
            <div className="input-box">
              {certificate.healthCertIssueDate
                ? new Date(certificate.healthCertIssueDate).toLocaleDateString('en-GB')
                : '-'}
            </div>
          </div>
          <div className="certificate-view-info-row">
            <span className="certificate-view-label">تاريخ نهاية الشهادة الصحية (هجري)</span>
            <div className="input-box">{certificate.healthCertExpiryDateHijri || '-'}</div>
          </div>

          <div className="certificate-view-info-row">
            <span className="certificate-view-label">تاريخ نهاية الشهادة الصحية (ميلادي)</span>
            <div className="input-box">
              {certificate.healthCertExpiryDate
                ? new Date(certificate.healthCertExpiryDate).toLocaleDateString('en-GB')
                : '-'}
            </div>
          </div>
          <div className="certificate-view-info-row">
            <span className="certificate-view-label">نوع البرنامج التثقيفي</span>
            <div className="input-box">{certificate.educationalProgram || '-'}</div>
          </div>

          <div className="certificate-view-info-row">
            <span className="certificate-view-label">تاريخ انتهاء البرنامج التثقيفي</span>
            <div className="input-box">
              {certificate.educationalProgramEndDate
                ? new Date(certificate.educationalProgramEndDate).toLocaleDateString('en-GB')
                : '-'}
            </div>
          </div>
          <div className="certificate-view-info-row">
            <span className="certificate-view-label">رقم الرخصة</span>
            <div className="input-box">{certificate.licenseNumber || '-'}</div>
          </div>

          <div className="certificate-view-info-row">
            <span className="certificate-view-label">اسم المنشأة</span>
            <div className="input-box">{certificate.establishmentName || '-'}</div>
          </div>
          <div className="certificate-view-info-row">
            <span className="certificate-view-label">رقم المنشأة</span>
            <div className="input-box">{certificate.establishmentNumber || '-'}</div>
          </div>
        </div>

        <div className="certificate-view-footer">
          <p className="certificate-view-cert-id">© 2025 وزارة البلديات والإسكان</p>
          <p className="certificate-view-timestamp">{certificate.uuid || ''}</p>
        </div>
      </div>
      </div>
    </>
  );
};

export default CertificateView;
