const mongoose = require("mongoose")
const schema = mongoose.Schema;
const jobsSchema = new schema({
    jobname:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    timing:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }


})

module.exports = mongoose.model('Registerjob' ,jobsSchema)