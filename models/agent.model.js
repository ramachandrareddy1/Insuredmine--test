const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const agentSchema= new Schema({
    agent:String,
    firstname:String,// foreign key
});

module.exports=mongoose.model('agent',agentSchema);