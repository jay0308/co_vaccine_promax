let jwt = require('jsonwebtoken');
const responseBaseClass = require("../BaseClasses/GenericResponse");
const appConstants = require("./constants").appConstants;

const validate = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['auth'];
    console.log("Validating token")
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        jwt.verify(token, process.env.API_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("Validating",err)
                let gr = new responseBaseClass.GenericResponse(`${"error"}`, appConstants.NOT_VALID_TOKEN, 403);
                res.status(403).send(gr.response())
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        let gr = new responseBaseClass.GenericResponse(`${"error"}`, appConstants.TOKEN_MISSING, 403);
        res.status(403).send(gr.response())
        console.log("FUC")
    }
}

module.exports = {
    validate: validate
}