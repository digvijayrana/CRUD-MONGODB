const express = require('express')
const PORT = process.env.PORT || 3001
const morgan = require('morgan')
const mongoose = require('mongoose')

const EmployeeRoute = require('./routes/employees')

mongoose.connect('mongodb://localhost:27017/CurdDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', (err) => {
    console.log('Database Connection Established')
})

const app = express()
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/employee', EmployeeRoute)

app.get('/', (req, res) => {
    res.send("Curd Operation With Mongo!!")
})

app.listen(PORT, () => {
    console.log(`Server is Running PORT ${PORT}`)
});