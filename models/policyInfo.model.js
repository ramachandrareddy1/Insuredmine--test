const mongoose= require('mongoose');
const { Double } = require('bson');
const Schema=mongoose.Schema;
const policyInfoSchema= new Schema({
    firstname:String,// foreign key
    policy_number:String,
    policy_start_date:Date,
    policy_end_date:Date,
    policy_mode:Number,
    producer:String,
    premium_amount:Number,
    csr:String,
    account_name:String

});

module.exports=mongoose.model('policyinfo',policyInfoSchema);