const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = await User.findOne({ 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }
}
module.exports = auth;