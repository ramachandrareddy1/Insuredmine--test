let methods = {};
const path = require('path');
const fs = require('fs');
const csv = require('fast-csv');
const XLSX = require('xlsx');
const UPLOAD_PATH = path.join(__dirname, '../uploads');

methods.imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(csv|xlsx)$/)) {
        return cb('Only csv/xlsx files are allowed!', false);
    }
    cb(null, true);
}
methods.fileNameHandler = (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
}
methods.destination = (req, file, cb) => {
    cb(null, UPLOAD_PATH)
}
methods.readCsvData = (fileName) => {
    let returnLit = [];
    return new Promise((resolve, reject) => {
        try {
            fs.createReadStream(path.resolve(UPLOAD_PATH,fileName))
                .pipe(csv.parse({
                    headers: true
                }))
                .on('error', error => {console.log(error);reject(error)})
                .on('data', row => returnLit.push(row))
                .on('end', rowCount =>resolve(returnLit) );
        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
};
methods.readExcelData=(fileName)=>{
    return new Promise((resolve,reject)=>{
        try{
            const workbook = XLSX.readFile(path.resolve(UPLOAD_PATH,fileName));
            const sheet_name_list = workbook.SheetNames;
            resolve(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
        }catch(err){
            console.log(err);
            reject(err);
        }
    })
}

module.exports = methods;