const express = require('express');
const DBConnect = require('./database/database');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const userRouter = require('./src/routes/userRoutes');
const bookRouter = require('./src/routes/bookRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);

DBConnect()

app.listen(PORT, () => console.log('Server is up to the port:', PORT))