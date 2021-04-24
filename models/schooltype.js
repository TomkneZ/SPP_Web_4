var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SchoolTypeSchema = new Schema({
    name: { type: String, required: true }   
});

module.exports = mongoose.model('SchoolType', SchoolTypeSchema);