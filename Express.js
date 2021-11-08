const express = require('express')
const fs = require('fs')
const path = require('path')
const db = require("./db/db.json")

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.static('public'))

// * Middleware *
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function ranId() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

// * Notes page *
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

// * Get route for fetching notes *
app.get('/api/notes', (req, res) => {
    console.log(`A ${req.method} request was received`)
    
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
            const parse = JSON.parse(data)
            res.json(parse)
        }
    })
})

// * Post route for new notes
app.post('/api/notes', (req, res) => {
    console.log(`A ${req.method} request was received`)

    const {title, text} = req.body
    const Id = ranId()

    const newNote = {
        title,
        text,
        id: Id
    }

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const existingNotes = JSON.parse(data);
          existingNotes.push(newNote)
  
          fs.writeFile('./db/db.json', JSON.stringify(existingNotes, null, 2), (error) => {
                if (error) {
                    console.error(error)
                } else { 
                    console.log('Your new note was received and appended')
                    res.send("Your new note was received and appended")
                } 
            });
        }
    }); 
})

app.delete('/api/notes/:id', function (req, res) {
    console.log(`A ${req.method} request was received`)

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
            const parse = JSON.parse(data)
            const removedNotes = parse.filter((note) => { return note.id !== req.params.id })

            fs.writeFile('./db/db.json', JSON.stringify(removedNotes, null, 2), (error) => {
                if (error) {
                    console.error(error)
                } else { 
                    console.log('Your note was deleted')
                    res.send("Your note was deleted")
                } 
            });
        }
    })
})

// * Homepage *
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(PORT, () => {
    console.log("Listening at port 3001!")
})