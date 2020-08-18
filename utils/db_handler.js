let methods={};
const mongoose= require('mongoose');

methods.insertMany=(modelName,data)=>{
    const model = mongoose.model( modelName);
    return model.insertMany(data);
}

methods.insert=(modelName,data)=>{
    const model = mongoose.model(modelName);
    let newData=new model(data);
    return newData.save();
}

methods.find=(modelName,query)=>{
    const model = mongoose.model( modelName);
    return model.find(query);
}
methods.aggregate=(modelName,query)=>{
    const model= mongoose.model(modelName);
    return model.aggregate([query]);
}

module.exports = methods;