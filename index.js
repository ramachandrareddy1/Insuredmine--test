const express= require('express');
const app=express();
const port=process.env.port||8080;
const mainRouter= require('./routes/main.route');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true,useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('DB Connected successfully')
});

require('./models/agent.model');
require('./models/policyCarrier.model');
require('./models/policyCategory.model');
require('./models/policyInfo.model');
require('./models/user.model');
require('./models/storedata.model');

app.use('/',mainRouter);


app.listen(port,(err)=>{
    if(err) console.log('Error',err);
    else console.log('Server running on the port',port);
})