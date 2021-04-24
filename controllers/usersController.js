const User = require('../models/User');

exports.add_user = async function (req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).cookie('role', user.role).cookie('token', token).send();
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.login_user = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }
        const token = await user.generateAuthToken();
        res.cookie('role', user.role).cookie('token', token).send();
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.logout_user = async function (req, res) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}