const express = require('express')
const notes = require('../routes/notes')
const del = require('../routes/delete')

const app = express()
app.use('/notes', notes)
app.use('/notes', del)

module.exports = app