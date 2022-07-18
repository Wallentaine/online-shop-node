require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

//app.use('/api', router)

app.get('/body', (req, res) => {
    res.status(200).json({message: "ya dolbaeb"})
})

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

