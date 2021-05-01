const { response } = require('express')
const Employee = require('../models/Emoployee')

//show the list of Employees

const index = (req, res, next) => {
    Employee.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured!'
            })
        })
}

const show = (req, res, next) => {
    let employeeId = req.body.employeeId
    Employee.findById(employeeId)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
}

// add new employee
const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    })
    employee.save()
        .then(response => {
            res.json({
                message: 'Employee Added Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
}

//update an employee
const update = (req, res, next) => {
    let employeeId = req.body.employeeId

    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    }
    Employee.findByIdAndUpdate(employeeId, { $set: updatedData })
        .then(() => {
            res.json({
                message: 'Employee Update Successfully'
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
}

//delete an employee

const destory = (req, res, next) => {
    let employeeId = req.body.employeeId

    Employee.findByIdAndRemove(employeeId)
        .then(() => {
            req.json({
                message: 'Employeee Delete Successfully'
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
}

module.exports = { index, show, store, update, destory }