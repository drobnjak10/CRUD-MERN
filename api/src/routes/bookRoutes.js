const express = require('express');
const auth = require('../middlewares/auth.js');
const Book = require('../models/Book.js')

const bookRouter = new express.Router()


bookRouter.get('/', async (req,res) => {
    const books = await Book.find({});

    if(books.length <= 0) {
        res.json({error: "There is no books."})
    } 
    res.json(books)
})

bookRouter.post('/create', async(req,res) => {
    console.log(req.body)
    try {
        const book = new Book(req.body);
        await book.save();
        res.json(book)

    } catch (error) {
        res.json({error: error.message})
    }
})

bookRouter.put('/edit/:id', async(req,res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});

        res.json(book)
    } catch (error) {
        res.json(error.message)
    }
})

bookRouter.get('/:id', async(req,res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.json(book)
        
    } catch (error) {
        res.json(error.message)
    }
    
})


bookRouter.delete('/:id', async(req,res) => {
    try {
        const book = await Book.findById(req.params.id)
        await book.delete();
        res.json({message: "Book deleted.", book})
    } catch (error) {
        res.json(error.message)
    }
    
})



module.exports = bookRouter