const mongoose = require('mongoose');
const Validator = require('mongoose-unique-validator');

const superUserSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {timestamps: true}
);

superUserSchema.plugin(Validator);

module.exports = mongoose.model('SuperUser', superUserSchema, 'super-users');