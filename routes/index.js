const express = require('express');
const router = express.Router();

const {Employee} = require('../models/employee');

router.get('/api/employees',(req,res)=>{
    Employee.find({},(err,data)=>{
        if(!err){
            res.send(data);
        }
        else{
            console.log(err);
        }
    });
})

//post employee details 
router.post('/api/employee/add',(req,res)=>{
    const emp = new Employee({
        ename:req.body.ename,
        eid:req.body.eid,
        esalary:req.body.esalary,
        email:req.body.email
    });
    emp.save((res,data)=>{
        res.statusCode(200).json({code:200,message:'Employee Added Successfully',addEmployee:data})
    });
})
//get single employee 
router.get('/api/employee/:id',(req,res)=>{
   
    Employee.findById(req.params.id,(err,data)=>{
        if(!err){
            (res.send(data));
        }
        else{
            console.log(err);
        }
    });
})
//update employee 
router.put('/api/employee/edit/:id',(req,res)=>{
    const emp = {
        ename:req.body.ename,
        eid:req.body.eid,
        esalary:req.body.esalary,
        email:req.body.email
    };
    Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err,data)=>{
        if(!err){
            res.status(200).json({code:200,message:'Employee updated successfully',updateEmployee:data})
        }
        else{
            console.log(err);
        }
    });
});
//delete Employee 
router.delete('/api/employee/delete/:id',(req,res)=>{
    Employee.findByIdAndDelete(req.params.id,(err,data)=>{
        if(!err){
            res.status(200).json({code:200,message:'Employee Deleted Successfully',
        deleteEmployee:data});
        }
    });
})
//error page 
router.get('/api/error',(req,res)=>{
    res.send("Oops..........No Response .............")
})
module.exports = router;
