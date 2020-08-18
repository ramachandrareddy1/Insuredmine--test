const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const storeDataSchema= new Schema({
    message:String,
    day:Date,
    time:String
});

module.exports=mongoose.model('store',storeDataSchema);