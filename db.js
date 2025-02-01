require('dotenv').config();
const mongoose = require('mongoose');

module.exports = () => {
    try{
        mongoose.connect(process.env.DB);
        console.log(`database connected successfully`);
    }catch(e){
        console.log('Error occured in db connection');
    }
}