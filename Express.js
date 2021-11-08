const express = require('express')
const path = require('path')
const api = require('./public/routes/index.js')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('/api', api)

// * Notes page *
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/notes.html'))
})

// * Homepage *
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/index.html'))
})

app.listen(PORT, () => {
    console.log("Listening at port 3001!")
})