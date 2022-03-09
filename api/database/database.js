const mongoose = require('mongoose')


const DBConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => console.log(err))
} 


module.exports = DBConnect