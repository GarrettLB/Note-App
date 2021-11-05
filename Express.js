const express = require('express')
const path = require('path')
const db = require("./db/db.json")

const app = express()
const PORT = 3001

app.use(express.static('public'))

// * Middleware *
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Homepage *
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

// * Notes page *
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

// * Route for fetching notes *
app.get('/api/notes', (req, res) => {
    res.json(db)
})

app.post('/api/notes', (req, res) => {
    console.log(`A ${req.method} request was received`)

    console.log(req.body)
    const {title, text} = req.body

    console.log(title, text)
})

app.listen(PORT, () => {
    console.log("Listening at port 3001!")
})