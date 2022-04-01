const mongoose = require('mongoose');

const Employee = mongoose.model('Employee',{
    ename:{
        type:String,
        required :true 
    },
    eid:{
        type:Number,
        required :true 
    },
    esalary:{
        type:Number,
        required :true 
    },
    email:{
        type:String,
        required :true 
    }
})
module.exports = {Employee}