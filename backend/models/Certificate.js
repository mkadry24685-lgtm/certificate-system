const mongoose = require('mongoose');


const CertificateSchema = new mongoose.Schema({
uuid: { type: String, required: true, unique: true },
name: String,
amana: String,
baladiya: String,
nationalId: String,
healthCertificateNumber: String,
job: String,
nationality: String,
gender: String,
healthCertIssueDate: Date,
healthCertExpiryDate: Date,
healthCertIssueDateHijri: String,
healthCertExpiryDateHijri: String,
educationalProgram: String,
educationalProgramEndDate: Date,
licenseNumber: String,
establishmentName: String,
establishmentNumber: String,
photoBuffer: Buffer,
photoUrl: String,
photoPublicId: String,
selectedLogo: { 
  type: String, 
  default: 'logos/الرياض.png',
  enum: [
    'logos/الرياض.png',
    'logos/جده.png',
    'logos/الباحه.png',
    'logos/القصيم.png',
    'logos/امانة الاحساء.png',
    'logos/امانة الجوف.png',
    'logos/تبوك.png',
    'logos/طائف.png',
    'logos/مدينة منوره.png',
    'logos/منطقه الشرقيه.png',
    'logos/البطين.png',
    'logos/الحائل.png',
    'logos/الخبراء.png',
    'logos/النبهانية.png',
    'logos/امانة_العاصمة_المقدسة.png',
    'logos/امانة_عاصمة_المقدسة.png',
    'logos/امانة_عسير.png',
    'logos/امانة_منطقه_الحدود_الشمالية.png',
    'logos/بلديه_محافظه_البكيرية.png',
    'logos/بلديه_مخواة.png',
    'logos/جازان.png',
    'logos/حفر_الباطن.png',
    'logos/عسير.png',
    'logos/نجران.png'
  ] 
},
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Certificate', CertificateSchema);