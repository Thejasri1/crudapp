const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
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

const isValidEmail = (email) => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

//post employee details
router.post('/api/employee', (req, res) => {
    if (isValidEmail(req.body.email)) {
        const emp = new Employee({
            name: req.body.name,
            id: req.body.id,
            salary: req.body.salary,
            email: req.body.email,
        })

        try {
            emp.save(emp).then((data) => {
                res.send(data)
                res.send('Emp Added')
            })
        } catch (err) {
            res.json(`Employee Data Not Added`)
        }
    } else {
        res.json('email is not valid')
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
    if (isValidEmail(req.body.email)) {
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
    } else {
        res.json('Email is not valid!')
    }
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
