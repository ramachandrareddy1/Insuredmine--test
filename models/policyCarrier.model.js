const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const policCarrierSchema= new Schema({
    company_name:String,
    firstname:String,// foreign key
});

module.exports=mongoose.model('policyCarrier',policCarrierSchema);