require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT)
    } catch (e) {
        console.log(e)
    }
}

start().then(() => {
    console.log(`SERVER STARTED ON PORT ${PORT}`)
})

