const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const { Employee } = require('../models/employee')

router.get('/api/employees', (_, res) => {
    Employee.find({}, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.json(`Employee Details Not Found`)
        }
    })
})
//post employee details
router.use(express.json())
router.post(
  '/api/employee',body('email').isEmail().withMessage('Email is not valid')
  ,body('name').exists({ checkFalsy : true }).withMessage('Name should not be null')
  ,body('id').exists({ checkFalsy : true }).withMessage('Employee id is not null')
  ,body('salary').exists({checkFalsy : true}).isInt().withMessage('salary must be in numbers')
  .custom((salary)=>{
    if(salary>=10000000){
        return Promise.reject('salary is too high');
    }
    
  }),

async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
           
    }
    const userExist = await Employee.findOne({ email: req.body.email })
        if (userExist) {
            res.json('Email is already exist')
        } 
    Employee.create({
      name: req.body.name,
      id: req.body.id,
      salary:req.body.salary,
      email:req.body.email
    }).then(user => res.json(user)).catch(()=>res.json('Employee not added'));
    },
);

//get single employee
router.get('/api/employee/:id', (req, res) => {
    Employee.findById(req.params.id, (err, data) => {
        if (!err) {
            res.status(200).json({
                message: 'Employee data fetched successfully',
                data: data,
            })
        } else {
            res.json(`The Employee Not Found`)
        }
    })
})
//update employee
router.put('/api/employee/:id', async (req, res) => {
    const userExist = await Employee.findOne({ email: req.body.email })
        if (userExist) {
            res.json('Email is already exist')
        } 
        const emp = {
            name: req.body.name,
            id: req.body.id,
            salary: req.body.salary,
            email: req.body.email,
        }
        Employee.findByIdAndUpdate(
            req.params.id,
            { $set: emp },
            { new: true },
            (err, data) => {
                if (!err) {
                    res.status(200).json({
                        message: 'Employee updated successfully',
                        data: data,
                    })
                    } else {
                        res.json(`The Employee details not updated.`)
                    }
                }
            )
       
})
//delete Employee
router.delete('/api/employee/:id', (req, res) => {
    Employee.findByIdAndDelete(req.params.id, (err, data) => {
        if (!err) {
            res.status(200).json({
                message: 'Employee Deleted Successfully',
                data: data,
            })
        } else {
            res.json(`The Employee Not Found`)
        }
    })
})

module.exports = router
