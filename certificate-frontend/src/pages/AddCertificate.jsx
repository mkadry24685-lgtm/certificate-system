import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddCertificate.css";

function AddCertificate() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    amana: "",
    baladiya: "",
    nationalId: "",
    healthCertificateNumber: "",
    gender: "",
    nationality: "",
    job: "",
    healthCertIssueDate: "",
    healthCertExpiryDate: "",
    healthCertIssueDateHijri: "",
    healthCertExpiryDateHijri: "",
    educationalProgram: "",
    educationalProgramEndDate: "",
    licenseNumber: "",
    establishmentName: "",
    establishmentNumber: "",
    selectedLogo: "logos/الرياض.png",
  });

  const [photo, setPhoto] = useState(null);

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
      formData.append("baladiya", form.baladiya);
      formData.append("nationalId", form.nationalId);
      formData.append("healthCertificateNumber", form.healthCertificateNumber);
      formData.append("gender", form.gender);
      formData.append("nationality", form.nationality);
      formData.append("job", form.job);
      formData.append("healthCertIssueDate", form.healthCertIssueDate);
      formData.append("healthCertExpiryDate", form.healthCertExpiryDate);
      formData.append("healthCertIssueDateHijri", form.healthCertIssueDateHijri);
      formData.append("healthCertExpiryDateHijri", form.healthCertExpiryDateHijri);
      formData.append("educationalProgram", form.educationalProgram);
      formData.append("educationalProgramEndDate", form.educationalProgramEndDate);
      formData.append("licenseNumber", form.licenseNumber);
      formData.append("establishmentName", form.establishmentName);
      formData.append("establishmentNumber", form.establishmentNumber);
      formData.append("selectedLogo", form.selectedLogo);
      
      if (photo) {
        formData.append("photo", photo);
      }

      const res = await axios.post(
        "https://certificate-system-backend.vercel.app/api/certificates",
        formData,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );

      alert("تم إضافة الشهادة بنجاح");
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("فيه خطأ أثناء حفظ الشهادة");
    }
  };

  return (
    <div className="add-certificate-container">
      <div className="add-certificate-header">
        <h2>إضافة شهادة صحية جديدة</h2>
      </div>

      <form className="add-certificate-form" onSubmit={handleSubmit}>

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
          <label>البلدية</label>
          <input type="text" name="baladiya" value={form.baladiya} onChange={handleChange} placeholder="أدخل اسم البلدية" />
        </div>

        <div>
          <label>رقم الهوية *</label>
          <input type="text" name="nationalId" value={form.nationalId} onChange={handleChange} placeholder="أدخل رقم الهوية" required />
        </div>
        <div>
          <label>الجنس</label>
          <input type="text" name="gender" value={form.gender} onChange={handleChange} placeholder="ذكر / أنثى" />
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
          <label>تاريخ إصدار الشهادة الصحية (هجري)</label>
          <input type="text" name="healthCertIssueDateHijri" value={form.healthCertIssueDateHijri} onChange={handleChange} placeholder="مثال: 1447-05-01" />
        </div>

        <div>
          <label>تاريخ انتهاء الشهادة الصحية *</label>
          <input type="date" name="healthCertExpiryDate" value={form.healthCertExpiryDate} onChange={handleChange} required />
        </div>

        <div>
          <label>تاريخ انتهاء الشهادة الصحية (هجري)</label>
          <input type="text" name="healthCertExpiryDateHijri" value={form.healthCertExpiryDateHijri} onChange={handleChange} placeholder="مثال: 1448-05-01" />
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
          <label>رقم الرخصة</label>
          <input type="text" name="licenseNumber" value={form.licenseNumber} onChange={handleChange} placeholder="أدخل رقم الرخصة" />
        </div>

        <div>
          <label>اسم المنشأة</label>
          <input type="text" name="establishmentName" value={form.establishmentName} onChange={handleChange} placeholder="أدخل اسم المنشأة" />
        </div>

        <div>
          <label>رقم المنشأة</label>
          <input type="text" name="establishmentNumber" value={form.establishmentNumber} onChange={handleChange} placeholder="أدخل رقم المنشأة" />
        </div>

        <div>
          <label>صورة الشخص *</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setPhoto(e.target.files[0])} 
            required 
          />
        </div>

        <button type="submit" className="add-certificate-btn">✓ حفظ الشهادة</button>
      </form>
    </div>
  );
}

export default AddCertificate;
