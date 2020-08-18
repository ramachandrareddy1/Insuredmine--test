const router=require('express').Router();
const multer = require('multer');
const mainCtrl= require('../controllers/main.ctrl');
const {imageFilter,fileNameHandler,destination}= require('../utils/file_handler');

//file upload config
let storage = multer.diskStorage({ destination:destination ,filename:fileNameHandler, fileFilter: imageFilter })
const upload = multer({ storage: storage });

//routes
router.post('/uploadData',upload.single('file'),mainCtrl.uploadData);
router.get('/policyInfo/:userName',mainCtrl.getPolicyInfo);
router.get('/policy/aggregate',mainCtrl.aggregatePolicyInfo);
router.post('/storeData',mainCtrl.storeData);//to store date time and message


module.exports=router;