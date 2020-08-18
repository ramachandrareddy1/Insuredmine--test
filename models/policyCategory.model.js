const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const policyCategorySchema= new Schema({
    category_name:String,
    firstname:String,// foreign key
});

module.exports=mongoose.model('policyCategory',policyCategorySchema);