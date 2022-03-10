const express = require('express');
const auth = require('../middlewares/auth.js');
const Book = require('../models/Book.js')
const path = require('path')
const fs = require('fs')

const bookRouter = new express.Router()
const multer = require('multer');
const { fsync } = require('fs/promises');

const storage = multer.diskStorage({
    destination: path.join(path.join(__dirname, '../../../front/public/books')),
    filename: function (req, file, cb) {
        let original = file.originalname;
        let sada = new Date();
        let datePart = '';
        datePart += sada.getFullYear().toString();
        datePart += (sada.getMonth() + 1).toString();
        datePart += sada.getHours().toString();
        datePart += sada.getTime();
        let filename = datePart + '-' + original;
        cb(null, filename)
    },
})



const upload = multer({
    storage: storage,
    limits: {
        files: 1,
        fileSize: 5000000 // 1mb
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|jfif)/)) {
            return cb(new Error('Please upload valid image format.'));
        }
        cb(null, true);
    },
})


bookRouter.get('/', async (req, res) => {
    const books = await Book.find({});

    res.json(books);

})

bookRouter.post('/create', auth, upload.single('avatar'), async (req, res) => {
    try {
        const book = new Book({
            name: req.body.name,
            author: req.body.author,
            category: req.body.category,
            price: req.body.price,
            avatar: req.file.filename,
        });
        await book.save();
        res.json(book)

    } catch (error) {
        res.json({ error: error.message })
    }
})

bookRouter.put('/edit/:id', auth ,upload.single('avatar'), async (req, res) => {
    try {
        if (req.file) {
            let oldBook = await Book.findById(req.params.id);

            fs.unlink(path.join(__dirname, `../../../front/public/books/${oldBook.avatar}`), (err) => {
                if (err) {
                    res.json({ err })
                }
            })
        }

        const book = await Book.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            author: req.body.author,
            price: req.body.price,
            category: req.body.category,
            avatar: req.file ? req.file.filename : req.body.avatar
        }, { new: true });


        res.json(book)
    } catch (error) {
        res.json({ error: error.message })
    }
})

bookRouter.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.json(book)

    } catch (error) {
        res.json(error.message)
    }

})


bookRouter.delete('/:id', auth, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)

        if (book.avatar) {
            fs.unlink(path.join(__dirname, `../../../front/public/books/${book.avatar}`), (err) => {
                if (err) {
                    res.json({ err })
                }
            })
        }


        await book.delete();
        res.json({ message: "Book deleted.", book })
    } catch (error) {
        res.json(error.message)
    }

})



module.exports = bookRouter