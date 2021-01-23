const mongoose = require('mongoose');

const collegeSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        registrationNo: { type: String, required: true } 
    },
    {timestamps: true}
);

module.exports = mongoose.model('College', collegeSchema, 'colleges');