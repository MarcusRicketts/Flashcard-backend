const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async ()=>{
    try{
       await mongoose.connect(db, {
        useNewUrlParser: true, 
        useCreateIndex:true,
        useUnifiedTopology: true
       });
       console.log('We are connected!')
    }catch(err){
        console.log(`Could not connect to MongoDB. ERROR: ${err}`);
        process.exit(1);
    }
};
   


module.exports = connectDB;