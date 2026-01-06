const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'certificates',
    format: async (req, file) => 'jpg',
    public_id: (req, file) => {
      return Date.now() + '-' + Math.round(Math.random() * 1e9);
    },
  },
});

const upload = multer({ storage });


function authMiddleware(req,res,next){
const auth = req.headers.authorization;
if (!auth) return res.status(401).json({ message: 'No token' });
const token = auth.split(' ')[1];
try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
req.adminId = payload.id;
next();
} catch (err) {
return res.status(401).json({ message: 'Invalid token' });
}
}

// create certificate (accepts multipart form-data if photo uploaded)
router.post('/certificates', authMiddleware, upload.single('photo'), async (req,res)=>{
try{
const body = req.body;
const uuid = require('crypto').randomBytes(8).toString('hex');
let photoUrl = '';
let photoBuffer = null;
let photoPublicId = '';

if(req.file){
// multer-storage-cloudinary exposes the hosted URL at req.file.path and public_id at req.file.filename
photoUrl = req.file.path;
photoPublicId = req.file.filename;
// في الواقع، سنحفظ الـ Buffer من الصورة المرفوعة
// لكن Cloudinary لا يوفر access مباشر للـ buffer
// لذلك سنحفظ URL فقط مع حفظ metadata
}

const data = {
uuid,
name: body.name,
amana: body.amana,
baladiya: body.baladiya,
nationalId: body.nationalId,
healthCertificateNumber: body.healthCertificateNumber,
job: body.job,
nationality: body.nationality,
gender: body.gender,
healthCertIssueDate: body.healthCertIssueDate || null,
healthCertExpiryDate: body.healthCertExpiryDate || null,
healthCertIssueDateHijri: body.healthCertIssueDateHijri || null,
healthCertExpiryDateHijri: body.healthCertExpiryDateHijri || null,
educationalProgram: body.educationalProgram,
educationalProgramEndDate: body.educationalProgramEndDate || null,
licenseNumber: body.licenseNumber,
establishmentName: body.establishmentName,
establishmentNumber: body.establishmentNumber,
selectedLogo: body.selectedLogo || 'logos/الرياض.png',
photoUrl,
photoBuffer,
photoPublicId
};
const cert = new Certificate(data);
await cert.save();
res.json({ success: true, id: cert._id, uuid: cert.uuid });
}catch(err){
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


// dashboard list
router.get('/certificates', authMiddleware, async (req,res)=>{
const list = await Certificate.find().sort({ createdAt: -1 }).limit(500);
res.json(list);
});


// public get by uuid or id
router.get('/certificates/:id', async (req,res)=>{
const id = req.params.id;
let doc = await Certificate.findOne({ uuid: id });
if (!doc) doc = await Certificate.findById(id);
if (!doc) return res.status(404).json({ message: 'Not found' });
// optionally modify photoUrl to be absolute
const host = req.get('host');
const proto = req.protocol;
if(doc.photoUrl && doc.photoUrl.startsWith('/uploads')){
doc.photoUrl = proto + '://' + host + doc.photoUrl;
}
res.json(doc);
});

// update certificate
router.put('/certificates/:id', authMiddleware, upload.single('photo'), async (req,res)=>{
try{
const id = req.params.id;
const body = req.body;
const cert = await Certificate.findById(id);
if (!cert) return res.status(404).json({ message: 'Not found' });

// update fields
cert.name = body.name || cert.name;
cert.amana = body.amana || cert.amana;
cert.baladiya = body.baladiya || cert.baladiya;
cert.nationalId = body.nationalId || cert.nationalId;
cert.healthCertificateNumber = body.healthCertificateNumber || cert.healthCertificateNumber;
cert.job = body.job || cert.job;
cert.nationality = body.nationality || cert.nationality;
cert.gender = body.gender || cert.gender;
cert.healthCertIssueDate = body.healthCertIssueDate || cert.healthCertIssueDate;
cert.healthCertExpiryDate = body.healthCertExpiryDate || cert.healthCertExpiryDate;
cert.healthCertIssueDateHijri = body.healthCertIssueDateHijri || cert.healthCertIssueDateHijri;
cert.healthCertExpiryDateHijri = body.healthCertExpiryDateHijri || cert.healthCertExpiryDateHijri;
cert.educationalProgram = body.educationalProgram || cert.educationalProgram;
cert.educationalProgramEndDate = body.educationalProgramEndDate || cert.educationalProgramEndDate;
cert.licenseNumber = body.licenseNumber || cert.licenseNumber;
cert.establishmentName = body.establishmentName || cert.establishmentName;
cert.establishmentNumber = body.establishmentNumber || cert.establishmentNumber;
cert.selectedLogo = body.selectedLogo || cert.selectedLogo;

// if new photo uploaded
if(req.file){
  // delete old photo from Cloudinary if exists
  if(cert.photoPublicId){
    try{
      await cloudinary.uploader.destroy(cert.photoPublicId);
    }catch(err){
      console.log('Error deleting old photo:', err);
    }
  }
  cert.photoUrl = req.file.path;
  cert.photoPublicId = req.file.filename;
}

await cert.save();
res.json({ success: true, certificate: cert });
}catch(err){
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});

// delete certificate
router.delete('/certificates/:id', authMiddleware, async (req,res)=>{
try{
const id = req.params.id;
const cert = await Certificate.findById(id);
if (!cert) return res.status(404).json({ message: 'Not found' });

// delete photo from Cloudinary if exists
if(cert.photoPublicId){
  try{
    await cloudinary.uploader.destroy(cert.photoPublicId);
  }catch(err){
    console.log('Error deleting photo:', err);
  }
}

await Certificate.findByIdAndDelete(id);
res.json({ success: true, message: 'Deleted' });
}catch(err){
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


module.exports = router;