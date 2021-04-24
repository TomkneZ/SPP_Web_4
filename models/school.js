var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SchoolSchema = new Schema({
    name: { type: String, required: true },    
    is_active: { type: Boolean, required: true },
    school_type: { type: Schema.ObjectId, ref: 'SchoolType', required: true },
    students: [{ type: Schema.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('School', SchoolSchema);