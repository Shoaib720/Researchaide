const express = require('express');
const multer = require('multer');
const path = require('path');
const papersController = require('../controllers/papersController');
const router = express.Router();
const AuthenticateJWT = require('../middlewares/jwt-authentication');
const SUAuth = require('../middlewares/super-user-auth');
const AdminAuth = require('../middlewares/admin-auth');
const SPOCAuth = require('../middlewares/spoc-auth');
const StudentAuth = require('../middlewares/student-auth');

const MIME_TYPE_MAP = {
  'application/pdf': 'pdf',
  'application/msword' : 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'docx'
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid MIME type");
    if(isValid){
      error = null
    }
    cb(error, './uploads');
  },
  filename: (req, file, cb) => {
    const name = req.body.uploadedBy.split('@')[0];
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '_' + Date.now() + '.' + ext);
  }
});

const maxSize = 10 * 1024 * 1024;

const upload = multer({storage: multerStorage, limits: { fileSize: maxSize }});

router.post('/upload', AuthenticateJWT, upload.single('file'), papersController.upload);
// router.post('/upload', upload.single('file'), papersController.upload);

router.get('/', papersController.getAllPapers);

router.get('/counts', AuthenticateJWT, AdminAuth, papersController.getCounts);
// router.get('/counts', papersController.getCounts);

router.get('/latestVerified', papersController.getLatestVerifiedPapers);

router.get('/:id', papersController.getByPaperId);

router.get('/keywords/:keywords', papersController.getByKeywords);

router.get('/area/:area', papersController.getByAreaOfResearch);

router.get('/college/:collegeId', AuthenticateJWT, papersController.getByCollegeId);

router.get('/uploadedBy/:email', AuthenticateJWT, StudentAuth, papersController.getByUploaderEmail);

router.get('/unverifiedByCollege/:collegeId', AuthenticateJWT, SPOCAuth, papersController.getUnverifiedPapersByCollegeId);
// router.get('/unverifiedByCollege/:collegeId', papersController.getUnverifiedPapersByCollegeId);



router.put('/updateStatus/:id', AuthenticateJWT, SPOCAuth, papersController.updateStatus);
// router.put('/updateStatus/:id', papersController.updateStatus);

router.delete('/:id', AuthenticateJWT, StudentAuth, papersController.deleteById);

router.use('/*', (req, res, next) => {
  res.status(404).json({
      error: "ROUTE_NOT_FOUND",
  });
});

module.exports = router;