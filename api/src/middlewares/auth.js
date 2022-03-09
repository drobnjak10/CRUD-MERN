const jwt = require('jsonwebtoken')

const auth = async (req,res,next) => {
    const token = req.headers.cookie;
    
    if(token) {
        const accessToken = token.split('=')[1]
        await jwt.verify(accessToken, 'mysecret', (err,res) => {
            if(err) {
                console.log(err)
                res.json(err)
                return
            }
            req.user = res;
            next()
            
        })
    } else {
        return res.json({error: "You must be authenticated."})
    }
}

const verifyAuthRole = async (req,res,next) => {
    auth(res,res,() => {
        if(req.user._id === req.params.id || req.user.role === 'admin') {
            next()
        } else {
            res.json({error:"You are not allowed to do that!"})
        }
    })
}

module.exports = auth