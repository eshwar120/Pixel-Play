const jwt = require('jsonwebtoken');

const authMiddeware = (req, res, next) => {
    try {
        const authToken = req.headers.authorization.split(" ")[1];
        // console.log(true, authToken)
        const verifiedToken = jwt.verify(authToken, process.env.ACCESS_TOKEN_KEY);
        console.log(true, verifiedToken)
        req.userId = verifiedToken.userID;
        next()
    }
    catch(err) {
        // console.log(err)
        res.status(401).json({ 
            "message": "Authentication failed" ,
            "logOut" : true
        })
    }

}

module.exports = authMiddeware;