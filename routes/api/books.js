
const express = require('express');
const router = express.Router();

// Load Book model
const Book = require('../../models/Book');

//Load Genre model
const Genre = require('../../models/Genre')


// Validation
const { inputvalidate } = require('../../validation/inputvalidate') 


// tests books route
router.get('/test', (req, res) => res.send('Book Route Testing!'));

// Get all genre
router.get('/genre', (req, res) => {
    Genre.find()
         .then(genre => res.json(genre))
         .catch(err => res.status(404).json({ nogenrefound: 'No Genre Found'}));
})


// Get all books
router.get('/', (req, res) => {
    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status(404).json({ nobooksfound: 'No Books Found'}));
});

// Get single book by id
router.get('/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(book => res.json(book))
        .catch(err => res.status(404).json({ nobookfound: 'No Book Found'}))
});

// add/save book
router.post('/', (req, res) => {

    const data = req.body;

    const { value, error } = inputvalidate(data);
    const valid = error == null; 

    if(!valid){
        res.status(400).json({ error : 'Enter a valid name'});
    }
    else{
        const g = Genre.findOne({
            genre: value.genre
        }).then( result => {
            if(!result){
                const genre = new Genre({genre: value.genre});
                genre.save();
            }
        });

        const book = new Book({
            title: value.title,
            author: value.author,
            genre: value.genre
        });

        const result = book.save();
        res.json(result);
    }
});

// update book
router.put('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
        .then(book => res.json({ msg: 'Updated successfully'}))
        .catch(err => res.status(400).json({ error: 'Unable to update the Database'}));
});

// delete book by id
router.delete('/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id, req.body)
        .then(book => res.json({ mgs: 'Book entry deleted successfully'}))
        .catch(err => res.status(404).json({ error: 'No such a book'}));
});

module.exports = router;