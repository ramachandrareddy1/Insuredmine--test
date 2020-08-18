let methods = {};
const path = require('path');
const {
    readCsvData,
    readExcelData
} = require('../utils/file_handler');

const {insertMany,find,aggregate,insert}= require('../utils/db_handler')

methods.uploadData = async (req, res) => {
    try {
        let fileData = [];
        if (path.extname(req.file.filename) == '.csv') {
            fileData = await readCsvData(req.file.filename);
        } else {
            fileData = await readExcelData(req.file.filename);
        }
        let insertResp= await Promise.all([
            insertMany('agent',fileData),
            insertMany('policyCarrier',fileData),
            insertMany('policyCategory',fileData),
            insertMany('policyinfo',fileData),
            insertMany('user',fileData)
        ])
       res.send({status:true,message:'Request processed successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'Server side error',
            error: err
        });
    }
}

methods.getPolicyInfo=async(req,res)=>{
    try{
       let userName= req.params.userName;
       let policyData=await find('policyinfo',{firstname:userName});
       if(!policyData || !policyData.length)
          return res.send({status:true,message:'No Data found',data:[]});
          res.send({status:true,message:'Request Processed successfully',data:policyData});
    }catch(err){
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'Server side error',
            error: err
        });
    }
}

methods.aggregatePolicyInfo=async(req,res)=>{
    try{

        let query= {
            $lookup:
              {
                from: "policyinfos",
                localField: "firstname",
                foreignField: "firstname",
                as: "policy_info"
              }
         }
        let aggregateResp=await aggregate('user',query);
         res.send({status:true,message:'Request Processed successfully',data:aggregateResp})
    }catch(err){
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'Server side error',
            error: err
        });
    }
}
/**
 * {req}: message,day,time 
 */
methods.storeData=async(req,res)=>{
    try{
        let storeDataResp=await insert('store',req.body);
          res.send({status:true,message:'Request Processed successfully'});
    }catch(err){
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'Server side error',
            error: err
        });
    }
}
module.exports = methods;