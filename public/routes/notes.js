const express = require('express')
const router = express.Router()
const fs = require('fs')
const ranId = require('../helper/ranId')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Get route for fetching notes *
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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

module.exports = router