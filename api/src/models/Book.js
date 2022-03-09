const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    author: { type: String, required: true },
    category: { type: String, required: true},
    price: { type: Number, required: true } 
})


const Book = mongoose.model("Book", bookSchema)

module.exports = Book;