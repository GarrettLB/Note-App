const router = require('express').Router();
const fs = require('fs')

router.delete('/:id', function (req, res) {
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

module.exports = router