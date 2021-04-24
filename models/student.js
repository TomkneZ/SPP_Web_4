var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    registration_date: { type: Date, default: Date.now, required: true },
    is_account_active: { type: Boolean, required: true },
    school: { type: Schema.ObjectId, ref: 'School' }
});

module.exports = mongoose.model('Student', StudentSchema);