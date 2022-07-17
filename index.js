require('dotenv').config()
const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()



// app.get('/body', (req, res) => {
//     res.status(200).json({message: "hello"})
// })

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))
    } catch (e) {
        console.log("PIZDEC")
    }
}

start()
