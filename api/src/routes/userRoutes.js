const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth.js');

const userRouter = new express.Router();


userRouter.get('/', (req, res) => {
    res.json({ message: 'hello world' })
})

userRouter.post('/register', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.json(user)

    } catch (error) {
        res.json(error.message)
    }
})

userRouter.post('/login', async (req, res) => {
    try {
        const loggedUser = await User.findOne({ email: req.body.email });

        if (!loggedUser) {
            res.json({ error: "User with this email does not exist." });
        }

        const isMatchPassword = await bcrypt.compare(req.body.password, loggedUser.password)

        if (!isMatchPassword) {
            res.json({ error: "Wrong password. Please try again!" })
        }

        const token = await jwt.sign({ _id: loggedUser._id, role: loggedUser.role }, 'mysecret', { expiresIn: '1d' })


        const { password, ...others } = loggedUser._doc


        res.cookie("access_token", token, {
            httpOnly: true,
            // strict: 'same-site'
        }).json({ ...others, token });
    } catch (error) {
        res.json(error.message)
    }
})

userRouter.get('/logout', auth, async (req, res) => {
    res.clearCookie("access_token").json({ message: 'Successfully logged out.' });
})

module.exports = userRouter