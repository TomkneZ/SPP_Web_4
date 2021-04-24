const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
    
const UserSchema = mongoose.Schema({
    login: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 7 },
    role: { type: String, required: true },
    tokens: [{ token: { type: String, required: true } }]
})

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const hashesNumber = 8;
        user.password = await bcrypt.hash(user.password, hashesNumber);
    }
    next();
})

UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    return user;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;