const express = require('express')
const router = express.Router()

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
router.post('/api/employee', (req, _) => {
    const emp = new Employee({
        name: req.body.name,
        id: req.body.id,
        salary: req.body.salary,
        email: req.body.email,
    })
    try {
        emp.save((res, data) => {
            res.statusCode(200).json({
                message: 'Employee Added Successfully',
                data: data,
            })
        })
    } catch (err) {
        res.json(`Employee Data Not Added`)
    }
})

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
router.put('/api/employee/:id', (req, res) => {
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
