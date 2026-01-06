import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CiGlobe } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import "../styles/CertificatePage.css";
import QRCodeStyling from "qr-code-styling";

const CertificatePage = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const certRef = useRef();
  const qrContainerRef = useRef(null);
  const qrInstanceRef = useRef(null);

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

  const handlePrint = () => window.print();

const handleDownloadPdf = async () => {
  if (!certificate) return;

  const canvas = await html2canvas(certRef.current, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#f4f8fb",
  });

  const imgData = canvas.toDataURL("image/png", 1.0);
  const pdf = new jsPDF("landscape", "mm", "a4");

  pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
  pdf.save(`certificate-${certificate.name}.pdf`);
};
  // Initialize or update styled QR code
  useEffect(() => {
    if (!certificate) return;
    const dataUrl = `https://certificate-system-pi.vercel.app/view/${certificate._id}`;

    if (!qrInstanceRef.current) {
      qrInstanceRef.current = new QRCodeStyling({
          width: 130,
          height: 125,
        type: "svg",
        data: dataUrl,
        dotsOptions: { type: "square", color: "#040404ff" },
        cornersSquareOptions: { type: "square", color: "#010101ff" },
        cornersDotOptions: { type: "square", color: "#000000ff" },
        backgroundOptions: { color: "#ffffff" },
      });
      if (qrContainerRef.current) {
        qrInstanceRef.current.append(qrContainerRef.current);
      }
    } else {
      qrInstanceRef.current.update({ data: dataUrl });
    }
  }, [certificate]);

  if (!certificate) return <p style={{ textAlign: "center" }}>Loading…</p>;

  return (
    <div className="cert-container">
      <div className="cert-wrapper">
        <div className="cert-card" ref={certRef}>
          <div className="containerTop">
           {/* TOP HEADER + LOGOS */}
          <div className="header-section">
            <div className="cert-header">
                <img src="/logo1.png" alt="logo1" className="cert-logo" />
                <div className="line"></div>
                <img src="/logo3.png" alt="logo2" className="cert-logo" />
                <div className="line"></div>
 <img src={`/${certificate.selectedLogo || 'logo2.png'}`} alt="selected logo" className="cert-logo" />
            </div>
            <div className="header-color">
                <h1 className="main-title">الشهادة الصحية الموحدة</h1>
            </div>
          </div>

          {/* LEFT IMAGE + QR + RIGHT INFO */}
          <div className="cert-top-section">

            {/* LEFT SIDE PHOTO + QR */}
            <div className="cert-left">
              <div className="cert-photo-box">
                {certificate.photoUrl && (
                  <img className="cert-photo" src={certificate.photoUrl} alt="person" />
                )}
              </div>

              <div className="cert-qr-box">
                <div ref={qrContainerRef} />
              </div>
            </div>

            {/* RIGHT INFORMATION GRID */}
            <div className="cert-right">
              <h2 className="cert-name">{certificate.name}</h2>

              <div className="cert-info-grid">
                
                <div className="info-row">
                  <span>رقم الهوية:</span>
                  <p>{certificate.nationalId}</p>
                </div>

                <div className="info-row">
                  <span>الجنسية:</span>
                  <p>{certificate.nationality}</p>
                </div>

                <div className="info-row">
                  <span>رقم الشهادة الصحية:</span>
                  <p>{certificate.healthCertificateNumber}</p>
                </div>

                <div className="info-row">
                  <span>المهنة:</span>
                  <p>{certificate.job}</p>
                </div>

                <div className="info-row">
                  <span>تاريخ إصدار الشهادة الصحية:</span>
                  <p>{certificate.healthCertIssueDate ? new Date(certificate.healthCertIssueDate).toLocaleDateString("en-GB") : "-"}</p>
                </div>

                <div className="info-row">
                  <span>تاريخ نهاية الشهادة الصحية:</span>
                  <p>{certificate.healthCertExpiryDate ? new Date(certificate.healthCertExpiryDate).toLocaleDateString("en-GB") : "-"}</p>
                </div>

                <div className="info-row">
                  <span>نوع البرنامج التثقيفي:</span>
                  <p>{certificate.educationalProgram}</p>
                </div>

                <div className="info-row">
                  <span>تاريخ انتهاء البرنامج التثقيفي:</span>
                  <p>{certificate.educationalProgramEndDate ? new Date(certificate.educationalProgramEndDate).toLocaleDateString("en-GB") : "-"}</p>
                </div>

              </div>
            </div>
          </div>
            <div className="links">
                <div>www.balady.env.sa<span className="circle"><CiGlobe/></span></div>
                <div>saudimomra<span className="circle"><FaFacebookF/></span> <span className="circle"> <FaYoutube /> </span> <span className="circle"> <FaTwitter /> </span></div>

                <span>
                    <div className="title"><span className="title2"> مركز العناية بالعملاء  </span><span className="num">199040</span><span className="circle2"><FaPhone /></span></div>
                <span>
                    <div>Balady_cs<span className="circle"><FaTwitter /></span></div>
                </span>
                </span>
            </div>
          </div>
          
          {/* FOOTER SECTION */}
          <div className="cert-footer">
          </div>
        </div>

        {/* BUTTONS */}
        <div className="cert-actions">
          <button onClick={handlePrint}>🖨 طباعة</button>
          <button onClick={handleDownloadPdf}>📄 تحميل PDF</button>
        </div>

      </div>
    </div>
  );
};

export default CertificatePage;
