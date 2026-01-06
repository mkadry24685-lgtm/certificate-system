import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditCertificate.css";

function EditCertificate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    amana: "",
    nationalId: "",
    healthCertificateNumber: "",
    nationality: "",
    job: "",
    healthCertIssueDate: "",
    healthCertExpiryDate: "",
    educationalProgram: "",
    educationalProgramEndDate: "",
    selectedLogo: "logos/الرياض.png",
  });

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  // خريطة ربط الأمانة باللوجو
  const amanaLogoMap = {
    "الرياض": "logos/الرياض.png",
    "جدة": "logos/جده.png",
    "الباحة": "logos/الباحه.png",
    "القصيم": "logos/القصيم.png",
    "أمانة الأحساء": "logos/امانة الاحساء.png",
    "أمانة الجوف": "logos/امانة الجوف.png",
    "تبوك": "logos/تبوك.png",
    "الطائف": "logos/طائف.png",
    "المدينة المنورة": "logos/مدينة منوره.png",
    "المنطقة الشرقية": "logos/منطقه الشرقيه.png",
    "البطين": "logos/البطين.png",
    "الحائل": "logos/الحائل.png",
    "الخبراء": "logos/الخبراء.png",
    "النبهانية": "logos/النبهانية.png",
    "أمانة العاصمة المقدسة": "logos/امانة_العاصمة_المقدسة.png",
    "أمانة عاصمة المقدسة": "logos/امانة_عاصمة_المقدسة.png",
    "أمانة عسير": "logos/امانة_عسير.png",
    "أمانة منطقة الحدود الشمالية": "logos/امانة_منطقه_الحدود_الشمالية.png",
    "بلدية محافظة البكيرية": "logos/بلديه_محافظه_البكيرية.png",
    "بلدية مخواة": "logos/بلديه_مخواة.png",
    "جازان": "logos/جازان.png",
    "حفر الباطن": "logos/حفر_الباطن.png",
    "عسير": "logos/عسير.png",
    "نجران": "logos/نجران.png"
  };

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await axios.get(`https://certificate-system-backend.vercel.app/api/certificates/${id}`);
        const cert = res.data;
        
        setForm({
          name: cert.name || "",
          amana: cert.amana || "",
          nationalId: cert.nationalId || "",
          healthCertificateNumber: cert.healthCertificateNumber || "",
          nationality: cert.nationality || "",
          job: cert.job || "",
          healthCertIssueDate: cert.healthCertIssueDate ? cert.healthCertIssueDate.split('T')[0] : "",
          healthCertExpiryDate: cert.healthCertExpiryDate ? cert.healthCertExpiryDate.split('T')[0] : "",
          educationalProgram: cert.educationalProgram || "",
          educationalProgramEndDate: cert.educationalProgramEndDate ? cert.educationalProgramEndDate.split('T')[0] : "",
          selectedLogo: cert.selectedLogo || "logos/الرياض.png",
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        alert("حدث خطأ أثناء تحميل البيانات");
        navigate("/dashboard");
      }
    };
    fetchCertificate();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAmanaChange = (e) => {
    const selectedAmana = e.target.value;
    const correspondingLogo = amanaLogoMap[selectedAmana] || "logos/الرياض.png";
    setForm({ 
      ...form, 
      amana: selectedAmana,
      selectedLogo: correspondingLogo 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("amana", form.amana);
      formData.append("nationalId", form.nationalId);
      formData.append("healthCertificateNumber", form.healthCertificateNumber);
      formData.append("nationality", form.nationality);
      formData.append("job", form.job);
      formData.append("healthCertIssueDate", form.healthCertIssueDate);
      formData.append("healthCertExpiryDate", form.healthCertExpiryDate);
      formData.append("educationalProgram", form.educationalProgram);
      formData.append("educationalProgramEndDate", form.educationalProgramEndDate);
      formData.append("selectedLogo", form.selectedLogo);
      
      if (photo) {
        formData.append("photo", photo);
      }

      await axios.put(
        `https://certificate-system-backend.vercel.app/api/certificates/${id}`,
        formData,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );

      alert("تم تعديل الشهادة بنجاح");
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("حدث خطأ أثناء التعديل");
    }
  };

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>جاري التحميل...</div>;
  }

  return (
    <div className="edit-certificate-container">
      <div className="edit-certificate-header">
        <h2>تعديل الشهادة الصحية</h2>
      </div>

      <form className="edit-certificate-form" onSubmit={handleSubmit}>

        <div>
          <label>اسم الشخص *</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="أدخل الاسم الكامل" required />
        </div>

        <div>
          <label>الأمانة / المنطقة *</label>
          <select name="amana" value={form.amana} onChange={handleAmanaChange} required>
            <option value="">اختر الأمانة أو المنطقة</option>
            <option value="الرياض">الرياض</option>
            <option value="جدة">جدة</option>
            <option value="الباحة">الباحة</option>
            <option value="القصيم">القصيم</option>
            <option value="أمانة الأحساء">أمانة الأحساء</option>
            <option value="أمانة الجوف">أمانة الجوف</option>
            <option value="تبوك">تبوك</option>
            <option value="الطائف">الطائف</option>
            <option value="المدينة المنورة">المدينة المنورة</option>
            <option value="المنطقة الشرقية">المنطقة الشرقية</option>
            <option value="البطين">البطين</option>
            <option value="الحائل">الحائل</option>
            <option value="الخبراء">الخبراء</option>
            <option value="النبهانية">النبهانية</option>
            <option value="أمانة العاصمة المقدسة">أمانة العاصمة المقدسة</option>
            <option value="أمانة عاصمة المقدسة">أمانة عاصمة المقدسة</option>
            <option value="أمانة عسير">أمانة عسير</option>
            <option value="أمانة منطقة الحدود الشمالية">أمانة منطقة الحدود الشمالية</option>
            <option value="بلدية محافظة البكيرية">بلدية محافظة البكيرية</option>
            <option value="بلدية مخواة">بلدية مخواة</option>
            <option value="جازان">جازان</option>
            <option value="حفر الباطن">حفر الباطن</option>
            <option value="عسير">عسير</option>
            <option value="نجران">نجران</option>
          </select>
          {form.amana && form.selectedLogo && (
            <img 
              src={`/${form.selectedLogo}`} 
              alt="لوجو الأمانة" 
              style={{width: '100px', height: '100px', objectFit: 'contain', marginTop: '10px', border: '1px solid #ddd', padding: '5px', borderRadius: '4px', backgroundColor: 'white'}}
            />
          )}
        </div>

        <div>
          <label>رقم الهوية *</label>
          <input type="text" name="nationalId" value={form.nationalId} onChange={handleChange} placeholder="أدخل رقم الهوية" required />
        </div>

        <div>
          <label>رقم الشهادة الصحية *</label>
          <input type="text" name="healthCertificateNumber" value={form.healthCertificateNumber} onChange={handleChange} placeholder="أدخل رقم الشهادة الصحية" required />
        </div>

        <div>
          <label>الجنسية *</label>
          <input type="text" name="nationality" value={form.nationality} onChange={handleChange} placeholder="أدخل الجنسية" required />
        </div>

        <div>
          <label>المهنة *</label>
          <input type="text" name="job" value={form.job} onChange={handleChange} placeholder="أدخل المهنة" required />
        </div>

        <div>
          <label>تاريخ إصدار الشهادة الصحية *</label>
          <input type="date" name="healthCertIssueDate" value={form.healthCertIssueDate} onChange={handleChange} required />
        </div>

        <div>
          <label>تاريخ انتهاء الشهادة الصحية *</label>
          <input type="date" name="healthCertExpiryDate" value={form.healthCertExpiryDate} onChange={handleChange} required />
        </div>

        <div>
          <label>نوع البرنامج التثقيفي *</label>
          <input type="text" name="educationalProgram" value={form.educationalProgram} onChange={handleChange} placeholder="أدخل نوع البرنامج التثقيفي" required />
        </div>

        <div>
          <label>تاريخ انتهاء البرنامج التثقيفي *</label>
          <input type="date" name="educationalProgramEndDate" value={form.educationalProgramEndDate} onChange={handleChange} required />
        </div>

        <div>
          <label>صورة الشخص (اختياري)</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setPhoto(e.target.files[0])} 
          />
        </div>

        <div className="edit-certificate-btn-group">
          <button type="submit" className="edit-certificate-btn edit-certificate-submit">✓ حفظ التعديلات</button>
          <button type="button" onClick={() => navigate("/dashboard")} className="edit-certificate-btn edit-certificate-cancel">
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCertificate;
